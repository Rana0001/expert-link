"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: values.password
    });

    setLoading(false);

    if (error) {
      toast.error("Error resetting password", {
        description: error.message
      });
      return;
    }

    setSuccess(true);
    toast.success("Password updated!", {
      description: "Your password has been reset successfully."
    });

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md animate-in zoom-in-95 duration-500">
          <Card className="p-8 text-center bg-white/80 backdrop-blur-xl border-white/20 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Password Reset!</h2>
              <p className="text-slate-500 mt-2">
                Your password has been updated successfully.
              </p>
            </div>
            <div className="text-sm bg-green-50 text-green-700 p-4 rounded-xl">
              Redirecting to login page...
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
          <p className="text-slate-500 mt-2">Enter your new password below.</p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-xl border-white/20 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </form>
          </Form>
        </Card>
        
        <p className="text-center text-sm text-slate-500">
          Remember your password? <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>

      </div>
    </div>
  );
}
