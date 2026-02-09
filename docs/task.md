# Task: Implement Role-Based Dashboard

- [/] Restructure Dashboard Directories <!-- id: 0 -->
  - [x] Create `app/dashboard/expert` directory <!-- id: 1 -->
    - [x] Create `app/dashboard/client` directory <!-- id: 2 -->
    - [x] Move existing dashboard page to `app/dashboard/expert/page.tsx` <!-- id: 3 -->
    - [x] Move `profile`, `services`, `availability` to `app/dashboard/expert/` <!-- id: 3.1 -->
- [/] Implement Client Dashboard <!-- id: 4 -->
  - [x] Create `app/dashboard/client/page.tsx` with initial capabilities <!-- id: 5 -->
- [/] Implement Routing Logic <!-- id: 6 -->
  - [x] Update `app/dashboard/page.tsx` to redirect based on role <!-- id: 7 -->
- [x] Update Sidebar Navigation <!-- id: 8 -->
  - [x] Refactor `Sidebar.tsx` to accept user/role prop <!-- id: 9 -->
  - [x] Define Expert vs Client navigation items <!-- id: 10 -->
  - [x] Update `app/dashboard/layout.tsx` to pass user data <!-- id: 11 -->
- [x] Verification <!-- id: 12 -->
  - [x] Verify Expert Login -> `/dashboard/expert` <!-- id: 13 -->
  - [x] Verify Client Login -> `/dashboard/client` <!-- id: 14 -->

# Task: Implement Custom Mailer Integration <!-- id: 15 -->

- [x] Create Mailer Utility <!-- id: 16 -->
  - [x] Create `utils/mailer.ts` with `sendEmail` function <!-- id: 17 -->
  - [x] Define types for email templates <!-- id: 18 -->
- [x] Integrate into Signup Flow <!-- id: 19 -->
  - [x] Import `sendEmail` in `app/signup/page.tsx` <!-- id: 20 -->
  - [x] Call `sendEmail('welcome', ...)` after successful signup <!-- id: 21 -->
  - [x] Verify email sending (check logs) <!-- id: 22 -->

# Task: Implement Custom Confirmation Flow <!-- id: 23 -->

- [x] Create Supabase Admin Client <!-- id: 24 -->
  - [x] Add `SUPABASE_SERVICE_ROLE_KEY` to env <!-- id: 25 -->
  - [x] Create `utils/supabase/admin.ts` <!-- id: 26 -->
- [x] Create Server Action <!-- id: 27 -->
  - [x] Create `app/signup/actions.ts` <!-- id: 28 -->
  - [x] Implement `signupWithCustomConfirmation` <!-- id: 29 -->
- [x] Update Signup Page <!-- id: 30 -->
  - [x] Replace `supabase.auth.signUp` with server action <!-- id: 31 -->
  - [x] Handle server action response <!-- id: 32 -->
