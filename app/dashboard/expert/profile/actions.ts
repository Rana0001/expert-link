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
