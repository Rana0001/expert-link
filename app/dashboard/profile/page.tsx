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

const profileSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  bio: z.string().min(10),
  timezone: z.string(),
});

export default function ProfilePage() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Dr. Sarah Chen",
      title: "Senior React Architect",
      bio: "Ex-Meta engineer specializing in performance and large-scale React patterns.",
      timezone: "America/New_York",
    },
  });

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
        <p className="text-slate-500">Manage your public expert profile.</p>
       </div>

       <Form {...form}>
         <form className="space-y-6">
           <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl">
             <CardHeader>
               <CardTitle>Basic Information</CardTitle>
               <CardDescription>This is how clients will see you.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl><Input {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl><Input {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl><Textarea {...field} className="bg-white h-24" /></FormControl>
                    </FormItem>
                  )}
                />
             </CardContent>
           </Card>

           <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Your working hours will be based on this timezone.</CardDescription>
              </CardHeader>
              <CardContent>
                 <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (US)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Asia/Kathmandu">Kathmandu (NPT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </CardContent>
           </Card>

           <div className="flex justify-end">
             <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">
               Save Changes
             </Button>
           </div>
         </form>
       </Form>
    </div>
  );
}
