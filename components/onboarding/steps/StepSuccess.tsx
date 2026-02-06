"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

type StepSuccessProps = {
  data: {
    title: string;
    bio: string;
    timezone: string;
    website: string;
    services: Array<{ name: string; description: string; duration: number; price: number }>;
  };
};

export default function StepSuccess({ data }: StepSuccessProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const saveProfile = async () => {
    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Save profile
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          title: data.title,
          bio: data.bio,
          timezone: data.timezone,
          website: data.website,
          onboarding_completed: true,
        });

      if (profileError) throw new Error(`Profile save failed: ${profileError.message}`);

      // Save services
      if (data.services.length > 0) {
        const { error: servicesError } = await supabase
          .from("services")
          .insert(
            data.services.map((s) => ({
              expert_id: user.id,
              name: s.name,
              description: s.description,
              duration_minutes: s.duration,
              price: s.price,
            }))
          );

        if (servicesError) throw new Error(`Services save failed: ${servicesError.message}`);
      }

      toast.success("Profile created successfully!");
      setSaving(false);
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Failed to save profile", {
        description: errorMessage,
        style: {
          background: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#991b1b',
        },
      });
      setSaving(false);
    }
  };

  useEffect(() => {
    saveProfile();
  }, []);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
    router.refresh();
  };

  const handleRetry = () => {
    saveProfile();
  };

  // Show error state
  if (error && !saving) {
    return (
      <div className="text-center space-y-8 py-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={48} className="text-red-600" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Something went wrong</h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            We couldn't save your profile. Please try again.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-lg mx-auto">
            <p className="text-sm text-red-800 font-mono">{error}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleRetry}
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-14 text-lg px-8"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (saving) {
    return (
      <div className="text-center space-y-8 py-12">
        <Loader2 size={64} className="mx-auto text-blue-600 animate-spin" />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Setting up your profile...</h2>
          <p className="text-lg text-slate-600">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  // Show success state (only if no error)
  return (
    <div className="text-center space-y-8 py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">You're all set! 🎉</h1>
        <p className="text-xl text-slate-600 max-w-lg mx-auto">
          Your expert profile is live. Start accepting bookings now.
        </p>
      </div>

      <Button
        onClick={handleGoToDashboard}
        size="lg"
        className="w-full max-w-sm bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-14 text-lg"
      >
        Go to Dashboard →
      </Button>
    </div>
  );
}
