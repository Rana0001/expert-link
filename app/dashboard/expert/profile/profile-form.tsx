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
import { Loader2, Camera, Globe, User, Building, MapPin } from "lucide-react";
import { useActionState, useEffect, useState, useTransition, useRef } from "react";
import { updateProfile, uploadAvatar } from "./actions";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "@/components/dashboard/ImageCropper";

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
  const [isUploading, startUploadTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(initialProfile?.avatar_url || user?.user_metadata?.avatar_url);
  
  // Cropper State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

console.log("avatarUrl", avatarUrl);

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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result?.toString() || null);
      setIsCropperOpen(true);
    });
    reader.readAsDataURL(file);
    
    // Reset input value so same file can be selected again
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setIsCropperOpen(false);
    
    // Create a File from the Blob
    const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("avatar", file);

    startUploadTransition(async () => {
        // Optimistic update
        const objectUrl = URL.createObjectURL(croppedBlob);
        setAvatarUrl(objectUrl);

        const result = await uploadAvatar(user.id, formData);
        
        if (result.success) {
            toast.success("Avatar updated successfully");
            // Update with actual server URL if needed, though mostly signed URL is cleaner
            if (result.data && typeof result.data === 'object' && 'avatar_url' in result.data) {
                 setAvatarUrl(result.data.avatar_url);
            }
        } else {
            toast.error(result.error || "Failed to upload avatar");
            // Revert on failure (optional, but good UX)
            setAvatarUrl(initialProfile?.avatar_url || user?.user_metadata?.avatar_url);
        }
    });
  };

  const displayName = form.watch("full_name");

  return (
       <>
       <ImageCropper 
          isOpen={isCropperOpen} 
          onClose={() => setIsCropperOpen(false)} 
          imageSrc={imageSrc} 
          onCropComplete={handleCropComplete} 
       />
       
       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 pb-20 md:pb-0">
           
           {/* Section: Identity */}
           <Card className="bg-white border-0 md:border md:border-slate-200 shadow-none md:shadow-sm rounded-none md:rounded-xl overflow-hidden">
             <CardHeader className="bg-white md:bg-slate-50/50 border-b border-slate-100 pb-6 pt-6 px-4 md:px-8">
               <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-sm transition-opacity group-hover:opacity-90">
                      <AvatarImage src={avatarUrl} className="object-cover" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                        {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white w-6 h-6" />
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 bg-white border border-slate-200 p-1.5 rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors z-10">
                      {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-heading font-bold text-slate-900">Basic Information</CardTitle>
                    <CardDescription className="text-slate-500 mt-1">This is how clients will see you on the platform.</CardDescription>
                  </div>
               </div>
             </CardHeader>
             <CardContent className="p-4 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Display Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input {...field} className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all font-medium" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Professional Title</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input {...field} className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all" />
                            </div>
                          </FormControl>
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
                      <FormLabel className="text-slate-700 font-medium">Website URL</FormLabel>
                      <FormControl>
                         <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input {...field} placeholder="https://your-website.com" className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all" />
                         </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Bio</FormLabel>
                      <FormControl><Textarea {...field} className="min-h-[140px] resize-none bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all text-base leading-relaxed p-4" placeholder="Tell us about your expertise..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </CardContent>
           </Card>

           {/* Section: Regional */}
           <Card className="bg-white border-0 md:border md:border-slate-200 shadow-none md:shadow-sm rounded-none md:rounded-xl overflow-hidden">
              <CardHeader className="bg-white md:bg-slate-50/50 border-b border-slate-100 pb-4 px-4 md:px-8 pt-6 md:pt-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 md:hidden">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-heading font-semibold text-slate-900">Regional Settings</CardTitle>
                        <CardDescription className="text-slate-500">Your availability will be converted from this timezone.</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-8">
                 <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="max-w-md">
                      <FormLabel className="text-slate-700 font-medium">Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-blue-500/20 focus:border-blue-500">
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

           {/* Sticky Action Bar (Mobile) / Standard Footer (Desktop) */}
           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 md:static md:bg-transparent md:border-0 md:p-0 flex justify-end z-40">
             <div className="w-full md:w-auto">
                 <Button type="submit" disabled={isPending} className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-6 h-auto text-base min-w-[160px] shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-px">
                   {isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
                 </Button>
             </div>
           </div>
         </form>
       </Form>
       </>
  );
}
