import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow unauthenticated access to public routes
  if (!user) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return supabaseResponse
  }

  // For authenticated users
  const role = user.user_metadata?.role;
  const isExpert = role === 'expert';
  const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding');
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // Check onboarding status for experts
  let onboardingCompleted = false;
  if (isExpert) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single();
    
    onboardingCompleted = profile?.onboarding_completed || false;
  }

  // Redirect incomplete experts to onboarding (except if already on onboarding)
  if (isExpert && !onboardingCompleted && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // Redirect completed experts away from onboarding
  if (isExpert && onboardingCompleted && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute) {
    if (isExpert && onboardingCompleted) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (isExpert && !onboardingCompleted) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    } else {
      // Client or other roles
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse
}
