# Plan: Integrate Custom Mail Service

I will integrate the custom mailer service (`https://custom-mailer-lime.vercel.app`) to send application emails, starting with a "Welcome" email after user signup.

## User Review Required

> [!IMPORTANT]
> **Supabase Auth vs. Custom Mailer**:
> This integration triggers emails **from your application code**.
>
> - It does **NOT** replace Supabase's built-in "Confirm your email" or "Reset Password" emails automatically.
> - To fully replace them, you would need to disable them in Supabase Dashboard and handle the flow manually (advanced).
> - **Current Scope**: I will implement a "Welcome" email sent _after_ signup.

## Proposed Changes

### 1. Mailer Utility

Create a strong type-safe utility to interact with your custom API.

#### [NEW] `utils/mailer.ts`

- **Base URL**: `https://custom-mailer-lime.vercel.app`
- **Function**: `sendEmail(type: TemplateType, to: string, data: any)`
- **Types**: Define `TemplateType` ('welcome' | 'otp' | 'confirmation' | ...)

### 2. Integration

Integrate the mailer into the Auth flow.

#### [MODIFY] `app/signup/page.tsx`

- Import `sendEmail`.
- Inside `onSubmit`, after `supabase.auth.signUp` returns success:
  - Call `sendEmail('welcome', values.email, { userName: values.fullName })`.
  - Handle errors gracefully (don't block signup success if email fails, just log it).

---

## Verification Plan

### Manual Verification

1.  **Sign Up Flow**:
    - Go to `/signup`.
    - Create a new account.
    - **Observe**: The "Success" UI should appear.
    - **Verify**: Check the console for "Email sent successfully" logs (or network request to `custom-mailer-lime.vercel.app`).
    - **Check Inbox**: Actual email should arrive to the provided address (if the mailer service is configured correctly with SMTP).
