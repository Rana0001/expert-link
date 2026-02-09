import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check user role from metadata
  const role = user.user_metadata?.role;

  if (role === "client") {
    redirect("/dashboard/client");
  } else {
    // Default to expert if role is missing or explicit 'expert'
    redirect("/dashboard/expert");
  }
}
