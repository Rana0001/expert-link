import { Sidebar } from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar user={user} />
      <main className="md:ml-64 pt-8 px-6 pb-12 w-full max-w-7xl mx-auto">
         <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
         </div>
      </main>
    </div>
  );
}
