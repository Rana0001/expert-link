import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Fetch the website HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ExpertLink/1.0; +https://expertlink.com)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }

    const html = await response.text();

    // Extract Open Graph metadata using improved regex patterns
    const getMetaContent = (property: string): string | null => {
      // Try property="..." first
      let regex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i');
      let match = html.match(regex);
      if (match) return match[1];
      
      // Try content="..." property="..." (reversed order)
      regex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i');
      match = html.match(regex);
      return match ? match[1] : null;
    };

    const getMetaName = (name: string): string | null => {
      // Try name="..." first
      let regex = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i');
      let match = html.match(regex);
      if (match) return match[1];
      
      // Try content="..." name="..." (reversed order)
      regex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, 'i');
      match = html.match(regex);
      return match ? match[1] : null;
    };

    const getTitleContent = (): string | null => {
      const regex = /<title[^>]*>([^<]*)<\/title>/i;
      const match = html.match(regex);
      return match ? match[1].trim() : null;
    };

    const getLinkHref = (rel: string): string | null => {
      // Try rel="..." first
      let regex = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["']`, 'i');
      let match = html.match(regex);
      if (match) return match[1];
      
      // Try href="..." rel="..." (reversed order)
      regex = new RegExp(`<link[^>]*href=["']([^"']*)["'][^>]*rel=["']${rel}["']`, 'i');
      match = html.match(regex);
      return match ? match[1] : null;
    };

    // Extract metadata
    const title = getMetaContent('og:title') || getTitleContent();
    const description = getMetaContent('og:description') || getMetaName('description');
    const image = getMetaContent('og:image');
    const favicon = getLinkHref('icon') || getLinkHref('shortcut icon') || '/favicon.ico';

    // Resolve relative URLs
    const urlObj = new URL(url);
    const resolveUrl = (relativeUrl: string | null): string | null => {
      if (!relativeUrl) return null;
      try {
        return new URL(relativeUrl, urlObj.origin).href;
      } catch {
        return relativeUrl;
      }
    };

    return NextResponse.json({
      title,
      description,
      image: resolveUrl(image),
      favicon: resolveUrl(favicon),
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
