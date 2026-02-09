import { createClient } from "@/utils/supabase/server";
import { getServices } from "./actions";
import { ServicesClient } from "./services-client"; // We'll create this next
import { redirect } from "next/navigation";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const services = await getServices(user.id);

  return (
    <div className="space-y-6">
       <ServicesClient initialServices={services} userId={user.id} />
    </div>
  );
}
