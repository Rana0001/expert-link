"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const profileSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  bio: z.string().min(10),
  timezone: z.string(),
});

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Dr. Sarah Chen",
      title: "Senior React Architect",
      bio: "Ex-Meta engineer specializing in performance and large-scale React patterns.",
      timezone: "America/New_York",
    },
  });

  const onSubmit = async (data: any) => {
      setIsSaving(true);
      // Simulate save
      await new Promise(r => setTimeout(r, 800));
      setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
       <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Profile Settings</h2>
        <p className="text-slate-500 mt-1">Manage your public expert profile details and regional settings.</p>
       </div>

       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
             <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
               <CardTitle className="text-base font-semibold text-slate-900">Basic Information</CardTitle>
               <CardDescription className="text-slate-500">How you appear to potential clients.</CardDescription>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Display Name</FormLabel>
                          <FormControl><Input {...field} className="border-slate-200 focus:border-slate-900 focus:ring-slate-900" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Professional Title</FormLabel>
                          <FormControl><Input {...field} className="border-slate-200 focus:border-slate-900 focus:ring-slate-900" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Bio</FormLabel>
                      <FormControl><Textarea {...field} className="min-h-[120px] resize-none border-slate-200 focus:border-slate-900 focus:ring-slate-900" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </CardContent>
           </Card>

           <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base font-semibold text-slate-900">Regional Settings</CardTitle>
                <CardDescription className="text-slate-500">Your availability will be converted from this timezone.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                 <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="max-w-md">
                      <FormLabel className="text-slate-700">Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-slate-200 focus:ring-slate-900">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (US)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Asia/Kathmandu">Kathmandu (NPT)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
           </Card>

           <div className="flex justify-end pt-4">
             <Button type="submit" disabled={isSaving} className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 min-w-[140px]">
               {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
             </Button>
           </div>
         </form>
       </Form>
    </div>
  );
}
