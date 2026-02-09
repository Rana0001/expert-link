'use server'

import { supabaseAdmin } from "@/utils/supabase/admin";
import { sendEmail } from "@/utils/mailer";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name is required"),
  role: z.enum(['client', 'expert']),
});

export type SignupState = {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function signupWithCustomConfirmation(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    fullName: formData.get('fullName'),
    role: formData.get('role'),
  };

  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields",
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Please check your inputs."
    };
  }

  const { email, password, fullName, role } = validatedFields.data;

  try {
    // 1. Generate Link
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (linkError) {
      console.error("Supabase Generate Link Error:", linkError);
      return { success: false, error: linkError.message };
    }

    const confirmationLink = linkData.properties.action_link;
    const userName = linkData.user.user_metadata.full_name || "User";

    // 2. Send Custom Email
    const emailSuccess = await sendEmail({
      type: 'confirmation',
      to: email,
      data: {
        userName,
        confirmationLink,
        appName: "ExpertLink",
      },
    });

    if (!emailSuccess) {
      // Rollback? Ideally yes, but for now we just error.
      // In a real app we might want to delete the user or retry.
      console.error("Failed to send custom confirmation email.");
      return { 
        success: true, // We still return success as user is created, but warn?
        message: "Account created, but email sending failed. Please check your inbox later or contact support." 
      };
    }

    // 3. Send Welcome Email (Optional - can be done here or in a separate step)
    // For now we stick to the plan: Confirmation email is the priority.
    
    return { success: true, message: "Confirmation email sent." };

  } catch (error: any) {
    console.error("Signup Action Error:", error);
    return { success: false, error: error.message || "Something went wrong." };
  }
}
