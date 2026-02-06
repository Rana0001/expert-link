"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Briefcase, ArrowRight, Loader2, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Define schema
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name is required"),
});

export default function SignUpPage() {
  const [role, setRole] = useState<'client' | 'expert' | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New success state
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", fullName: "" },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (!role) return;
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          role: role,
        },
      },
    });

    setLoading(false);

    if (error) {
       toast.error("Sign up failed", {
         description: error.message
       });
       return;
    }

    // Show Success State
    setSuccess(true);
    
    // Store redirect URL for after email confirmation
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    if (redirectTo) {
      sessionStorage.setItem('post_signup_redirect', redirectTo);
    }
    
    toast.success("Account created!", {
        description: "Please check your email to confirm."
    });
  }

  if (success) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
             <div className="w-full max-w-md animate-in zoom-in-95 duration-500">
                <Card className="p-8 text-center bg-white/80 backdrop-blur-xl border-white/20 shadow-xl space-y-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Mail size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                        <p className="text-slate-500 mt-2">
                            We've sent a confirmation link to <span className="font-semibold text-slate-900">{form.getValues("email")}</span>.
                        </p>
                    </div>
                    <div className="text-sm bg-blue-50 text-blue-700 p-4 rounded-xl">
                        Click the link in the email to activate your account and start your journey as a <span className="capitalize font-bold">{role}</span>.
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/login">Back to Login</Link>
                    </Button>
                </Card>
             </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create an Account</h1>
          <p className="text-slate-500 mt-2">Join ExpertLink to {role === 'expert' ? 'monetize your skills' : 'master new skills'}.</p>
        </div>

        {!role ? (
          /* Role Selection Step */
          <div className="grid grid-cols-2 gap-4">
             <Card 
               onClick={() => setRole('client')}
               className="p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-center space-y-4"
             >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                   <User size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">Client</h3>
                   <p className="text-xs text-slate-500 mt-1">I want to book experts.</p>
                </div>
             </Card>

             <Card 
               onClick={() => setRole('expert')}
               className="p-6 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group text-center space-y-4"
             >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                   <Briefcase size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">Expert</h3>
                   <p className="text-xs text-slate-500 mt-1">I want to offer services.</p>
                </div>
             </Card>
          </div>
        ) : (
          /* Form Step */
          <Card className="p-6 bg-white/80 backdrop-blur-xl border-white/20 shadow-xl">
             <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Sign up as {role === 'expert' ? 'Expert' : 'Client'}</h2>
                <Button variant="ghost" size="sm" onClick={() => setRole(null)} className="text-xs text-slate-400">Change</Button>
             </div>
             
             <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-slate-900 text-white" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
               </form>
             </Form>
          </Card>
        )}
        
        <p className="text-center text-sm text-slate-500">
           Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>

      </div>
    </div>
  );
}
