'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ServiceState = {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function getServices(userId: string) {
  try {
    const services = await prisma.service.findMany({
      where: { expert_id: userId },
      orderBy: { created_at: 'desc' }
    });
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function createService(userId: string, prevState: ServiceState, formData: FormData): Promise<ServiceState> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const duration = parseInt(formData.get('duration') as string);
  const price = parseFloat(formData.get('price') as string);

  if (!name || !duration || isNaN(price)) {
    return { success: false, error: "Invalid input" };
  }

  try {
    await prisma.service.create({
      data: {
        expert_id: userId,
        name,
        description,
        duration_minutes: duration,
        price,
      }
    });

    revalidatePath('/dashboard/expert/services');
    return { success: true, message: "Service created" };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: "Failed to create service" };
  }
}

export async function deleteService(serviceId: string, userId: string) {
  try {
    // Verify ownership
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.expert_id !== userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    revalidatePath('/dashboard/expert/services');
    return { success: true, message: "Service deleted" };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}
