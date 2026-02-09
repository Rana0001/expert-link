'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  full_name: z.string().min(2),
  title: z.string().min(2),
  website: z.string().optional().or(z.literal("")),
  bio: z.string().min(10),
  timezone: z.string(),
});

export type ProfileState = {
  success?: boolean;
  error?: string;
  message?: string;
  data?: any;
}

export async function getProfile(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
    });
    return { success: true, data: profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}

import { createClient } from "@/utils/supabase/server";

export async function updateProfile(userId: string, prevState: ProfileState, formData: FormData): Promise<ProfileState> {
  const rawData = {
    full_name: formData.get('full_name'),
    title: formData.get('title'),
    website: formData.get('website'),
    bio: formData.get('bio'),
    timezone: formData.get('timezone'),
  };

  console.log("updateProfile rawData:", rawData);

  const validatedFields = profileSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error("updateProfile validation error:", validatedFields.error);
    return {
      success: false,
      error: "Invalid fields",
      message: "Please check your inputs."
    };
  }

  try {
    console.log("Updating profile for user:", userId);
    await prisma.profile.update({
      where: { id: userId },
      data: validatedFields.data,
    });

    revalidatePath('/dashboard/expert/profile');
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile." };
  }
}

export async function uploadAvatar(userId: string, formData: FormData): Promise<ProfileState> {
  const file = formData.get('avatar') as File;
  if (!file) {
    return { success: false, error: "No file uploaded" };
  }

  const supabase = await createClient();

  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('profile')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { success: false, error: uploadError.message || "Failed to upload image" };
    }

    // 2. Get Signed URL (valid for 10 years to mimic public access for private buckets)
    const { data: signedData, error: signError } = await supabase.storage
      .from('profile')
      .createSignedUrl(filePath, 315360000);

    if (signError) {
      console.error("Error creating signed URL:", signError);
      return { success: false, error: "Failed to generate image URL" };
    }

    const publicUrl = signedData.signedUrl;

    // 3. Update Auth Metadata (so it persists in session)
    const { error: authError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (authError) {
       console.error("Auth update error:", authError);
    }

    // 4. Update Prisma Profile
    await prisma.profile.update({
      where: { id: userId },
      data: { avatar_url: publicUrl }
    });

    revalidatePath('/dashboard/expert/profile');
    return { success: true, message: "Avatar updated successfully", data: { avatar_url: publicUrl } }; // accessing data.avatar_url on client
  } catch (error) {
    console.error("Error in uploadAvatar:", error);
    return { success: false, error: "Failed to update avatar" };
  }
}
