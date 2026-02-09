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
import { useActionState, useEffect, useState, useTransition } from "react";
import { updateProfile } from "./actions";
import { toast } from "sonner";

const profileSchema = z.object({
  full_name: z.string().min(2),
  title: z.string().min(2),
  website: z.string().optional().or(z.literal("")),
  bio: z.string().min(10),
  timezone: z.string(),
});

interface ProfileFormProps {
  user: any;
  initialProfile?: any;
}

export function ProfileForm({ user, initialProfile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: initialProfile?.full_name || user?.user_metadata?.full_name || "",
      title: initialProfile?.title || "",
      website: initialProfile?.website || "",
      bio: initialProfile?.bio || "",
      timezone: initialProfile?.timezone || "America/New_York",
    },
  });

  const onSubmit = (data: any) => {
     const formData = new FormData();
     Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
     });

     startTransition(async () => {
        const result = await updateProfile(user.id, {}, formData);
        if (result.success) {
            toast.success("Profile updated successfully");
        } else {
            toast.error(result.error || result.message || "Failed to update profile");
        }
     });
  };

  return (
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
                      name="full_name"
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Website URL</FormLabel>
                      <FormControl><Input {...field} placeholder="https://your-website.com" className="border-slate-200 focus:border-slate-900 focus:ring-slate-900" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
             <Button type="submit" disabled={isPending} className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 min-w-[140px]">
               {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
             </Button>
           </div>
         </form>
       </Form>
  );
}
