"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);

    const { error, data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
       toast.error("Login failed", {
         description: error.message
       });
       setLoading(false);
       return;
    }

    toast.success("Welcome back!", {
        description: "Redirecting..."
    });

    // Get redirect URL from query params or determine based on role
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    
    // If there's a specific redirect, use it
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      // Otherwise, redirect based on role
      const userRole = data.user?.user_metadata?.role;
      if (userRole === 'expert') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
    
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your ExpertLink account.</p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-xl border-white/20 shadow-xl">
             <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
                        </div>
                        <FormControl><Input type="password" placeholder="••••••" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-slate-900 text-white" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
               </form>
             </Form>
        </Card>
        
        <p className="text-center text-sm text-slate-500">
           Don't have an account? <Link href="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
        </p>

      </div>
    </div>
  );
}
