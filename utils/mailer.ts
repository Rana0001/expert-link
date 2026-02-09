export type TemplateType = 'welcome' | 'otp' | 'confirmation' | 'password-reset' | 'contact';

interface MailerOptions {
  type: TemplateType;
  to: string;
  data: Record<string, any>;
}

const MAILER_API_URL = "https://custom-mailer-lime.vercel.app/api/send-email";

/**
 * Send an email using the custom mailer service.
 * @param type The template type to use matches custom mailer templates.
 * @param to recipient email address
 * @param data dynamic data to inject into the template
 */
export async function sendEmail({ type, to, data }: MailerOptions): Promise<boolean> {
  try {
    const response = await fetch(MAILER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        to,
        data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Mailer Service Error:", errorData);
      return false;
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Failed to send email via custom mailer:", error);
    return false;
  }
}
