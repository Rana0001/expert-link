# Plan: Custom Mailer for Signup Confirmation

The goal is to stop using Supabase's built-in confirmation email and instead send a custom confirmation link using the `custom-mail-service`.

## User Review Required

> [!IMPORTANT]
> **Prerequisites**:
>
> 1.  You must have `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local`.
> 2.  You must **disable the default "Confirm email" template** in Supabase Dashboard (Auth -> Email Templates) to prevent double emails. (I cannot do this for you).

## Proposed Changes

### 1. Supabase Admin Client

We need a client with `service_role` privileges to generate admin links.

#### [NEW] `utils/supabase/admin.ts`

- Create a client using `SUPABASE_SERVICE_ROLE_KEY`.

### 2. Server Action for Signup

Move signup logic to the server to securely use the admin client.

#### [NEW] `app/signup/actions.ts`

- **Function**: `signupWithCustomConfirmation(formData: FormData)`
- **Logic**:
  1.  Validate input (Zod).
  2.  Call `supabaseAdmin.auth.admin.generateLink({ type: 'signup', email, password, ... })`.
  3.  Use `action_link` from response.
  4.  Call `mailer.sendEmail('confirmation', email, { confirmationLink: action_link, userName })`.
  5.  Return success/error.

### 3. Update Signup Page

Connect the form to the new Server Action.

#### [MODIFY] `app/signup/page.tsx`

- Replace client-side `supabase.auth.signUp` with the new Server Action.
- Handle state (loading/success) based on the action result.

---

## Verification Plan

### Manual Verification

1.  **Environment Setup**: Ensure `.env.local` has `SUPABASE_SERVICE_ROLE_KEY`.
2.  **Signup Flow**:
    - Go to `/signup`.
    - Sign up with a _new_ email (e.g., `test+custom@example.com`).
    - **Observe**: No "Supabase" email should arrive (if disabled in dashboard).
    - **Observe**: A "Custom" confirmation email should arrive (via your custom mailer).
    - **Click Link**: Verify the link confirms usage and logs you in (or redirects to dashboard).
