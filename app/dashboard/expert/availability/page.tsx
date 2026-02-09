import { createClient } from "@/utils/supabase/server";
import { getAvailability } from "./actions";
import { AvailabilityClient } from "./availability-client"; 
import { redirect } from "next/navigation";

export default async function AvailabilityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get raw JSON availability
  const availabilityData = await getAvailability(user.id);
  
  // Normalize if null/migrating
  const availability = availabilityData && typeof availabilityData === 'object' && !Array.isArray(availabilityData) 
    ? availabilityData 
    : { days: [], startHour: 9, endHour: 17 };

  return (
    <div className="space-y-6">
       <AvailabilityClient initialAvailability={availability as any} userId={user.id} />
    </div>
  );
}
