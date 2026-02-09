import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name || user?.email || "Client";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, {displayName}.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-600 text-white border-0 shadow-lg shadow-blue-500/20 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Search size={100} />
            </div>
            <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-100">Find an Expert</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-blue-100 mb-6 text-sm">Browse our network of professionals to help you succeed.</p>
                <Link href="/browse">
                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                        Browse Experts
                    </Button>
                </Link>
            </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                  Upcoming Sessions
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <Calendar size={16} />
                  </div>
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0</div>
              <p className="text-xs text-slate-500 mt-1">No upcoming sessions</p>
            </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-slate-500 flex justify-between items-center">
                  Total Hours
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <Clock size={16} />
                  </div>
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0h</div>
              <p className="text-xs text-green-600 mt-1">Track your learning time</p>
            </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Placeholder */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-slate-400">
         Empty State: Recent Activity
      </Card>
    </div>
  );
}
