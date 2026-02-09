import { createClient } from "@/utils/supabase/server";
import { getProfile } from "./actions";
import { ProfileForm } from "./profile-form";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await getProfile(user.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
       <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Profile Settings</h2>
        <p className="text-slate-500 mt-1">Manage your public expert profile details and regional settings.</p>
       </div>
       
       <ProfileForm user={user} initialProfile={profile} />
    </div>
  );
}
