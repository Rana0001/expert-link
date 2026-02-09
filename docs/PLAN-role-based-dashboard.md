# Plan: Role-Based Dashboard Implementation

I will implement a distinct dashboard experience for **Experts** and **Clients**, ensuring each role has its own dedicated workspace while sharing common UI elements like the Sidebar.

## User Review Required

> [!IMPORTANT]
> **URL Structure Change**:
> The `app/dashboard` page will now serve as a **Router**.
>
> - Experts will be redirected to `/dashboard/expert`
> - Clients will be redirected to `/dashboard/client`
>
> This ensures strictly separate views and easier maintenance.

## Proposed Changes

### 1. Dashboard Routing & Layout

Reorganize `app/dashboard/` to support distinct paths.

#### [NEW] `app/dashboard/expert/page.tsx`

- Move the current `app/dashboard/page.tsx` content here.
- This will be the new home for Expert stats (Revenue, Hours, etc.).

#### [NEW] `app/dashboard/client/page.tsx`

- Create a new "Client Overview" page.
- Initial Content:
  - "Find an Expert" CTA
  - "Upcoming Sessions" placeholder
  - "Recent Activity" placeholder

#### [MODIFY] `app/dashboard/page.tsx`

- Change logic to purely handle redirection.
- `if (role === 'client') redirect('/dashboard/client')`
- `else redirect('/dashboard/expert')`

#### [MODIFY] `components/dashboard/Sidebar.tsx`

- Update to accept `user` or `role` prop (or fetch user client-side if needed, but passing prop is cleaner to avoid waterfall).
- **Navigation Logic**:
  - **Expert Links**: Overview (`/dashboard/expert`), Services, Availability, Profile.
  - **Client Links**: Overview (`/dashboard/client`), Browse Experts (`/browse`), My Bookings, Settings.

#### [MODIFY] `app/dashboard/layout.tsx`

- Update to fetch the user/role and pass it to the `Sidebar`.

---

## Verification Plan

### Automated Tests

- None strictly required for this structural change, as it relies on Auth state.

### Manual Verification

1.  **Test Expert Login**:
    - Log in as an Expert user.
    - Visit `/dashboard`.
    - Verify redirection to `/dashboard/expert`.
    - detailed check: Verify Sidebar shows "Services", "Availability".

2.  **Test Client Login**:
    - Log in as a Client user (or sign up a new user, default role check).
    - Visit `/dashboard`.
    - Verify redirection to `/dashboard/client`.
    - detailed check: Verify Sidebar shows "Browse Experts" instead of "Availability".
