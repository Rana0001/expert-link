"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast.error("Error sending reset email", {
        description: error.message
      });
      return;
    }

    setEmailSent(true);
    toast.success("Check your email!", {
      description: "We've sent you a password reset link."
    });
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md animate-in zoom-in-95 duration-500">
          <Card className="p-8 text-center bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <Mail size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Check your email</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                We've sent a password reset link to <span className="font-semibold text-slate-900 dark:text-white">{form.getValues("email")}</span>.
              </p>
            </div>
            <div className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-4 rounded-xl">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Back to Login</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Forgot Password?</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">No worries, we'll send you reset instructions.</p>
        </div>

        <Card className="p-6 bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </form>
          </Form>
        </Card>
        
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}
