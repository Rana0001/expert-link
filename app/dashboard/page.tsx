import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, Users, ArrowUpRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

const STATS = [
  { label: "Total Revenue", value: "$4,250", icon: DollarSign, trend: "+12.5%", trendUp: true },
  { label: "Hours Booked", value: "32.5 hrs", icon: Clock, trend: "+4% this week", trendUp: true },
  { label: "Clients", value: "84", icon: Users, trend: "+2 new", trendUp: true },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name || user?.email || "Expert";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, {displayName}.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                  {stat.label}
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <stat.icon size={16} />
                  </div>
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1 flex items-center"> 
                 <ArrowUpRight size={12} className="mr-1" />
                 {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Activity Placeholder */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-slate-400">
         Empty State: Recent Bookings Table
      </Card>
    </div>
  );
}
