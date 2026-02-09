'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type AvailabilityState = {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function getAvailability(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: { availability: true }
    });
    return profile?.availability || { days: [], startHour: 9, endHour: 17 };
  } catch (error) {
    console.error("Error fetching availability:", error);
    return null;
  }
}

export async function updateAvailability(userId: string, availabilityData: any) {
  try {
    // Validate basics
    if (!availabilityData.days || typeof availabilityData.startHour !== 'number' || typeof availabilityData.endHour !== 'number') {
        return { success: false, error: "Invalid data format" };
    }

    await prisma.profile.update({
      where: { id: userId },
      data: {
        availability: availabilityData
      }
    });

    revalidatePath('/dashboard/expert/availability');
    return { success: true, message: "Availability updated" };
  } catch (error) {
    console.error("Error updating availability:", error);
    return { success: false, error: "Failed to update availability" };
  }
}
