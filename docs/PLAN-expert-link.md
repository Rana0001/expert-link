# PLAN-expert-link: ExpertLink Consultant Booking Platform

## 1. Overview

**ExpertLink** is a decentralized platform for booking consultant slots. This project aims to demonstrate "Senior" level React/Next.js skills by implementing a complex time-management system with timezone awareness, state persistence, and a smooth multi-step booking wizard.

**Goal**: Build a portfolio-worthy application that solves "Timezone Math" and "Multi-step Form State" elegantly.

## 2. Project Type

**WEB** (Next.js 16 + React)

## 3. Tech Stack

| Category             | Technology               | Rationale                                                                       |
| -------------------- | ------------------------ | ------------------------------------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router)  | Standard for modern React apps, leveraging Server Components where appropriate. |
| **Language**         | TypeScript               | Strict type safety for complex data structures (TimeSlots, ExpertAvailability). |
| **UI Library**       | Shadcn UI + Tailwind CSS | Professional, accessible, and fast UI development.                              |
| **State Management** | Zustand                  | Global state for the booking wizard, with `persist` middleware for resilience.  |
| **Date Logic**       | date-fns + date-fns-tz   | Robust handling of timezones (critical requirement).                            |
| **Forms**            | React Hook Form + Zod    | Type-safe form validation for the intake step.                                  |
| **Animation**        | Framer Motion            | Smooth transitions between wizard steps.                                        |

## 4. Architecture Strategy

**Selected Approach**: "Optimistic Client Store" + "Core Logic Module".

1.  **Frontend**: Uses a global `useBookingStore` (Zustand) to manage the wizard state (`step`, `selectedDate`, `selectedSlot`, `intakeData`). This ensures instant transitions and state recovery (via `localStorage`).
2.  **Core Logic**: A standalone, framework-agnostic module (`lib/core/scheduling`) handles the complex business logic:
    - `generateSlots(availability, date, timezone)`
    - `convertTimezone(date, sourceTz, targetTz)`
    - This module will be heavily unit-tested _independently_ of the UI.

## 5. File Structure

```
/
├── app/
│   ├── page.tsx (Marketplace)
│   ├── expert/[id]/page.tsx (Expert Profile & Booking Wizard)
│   └── layout.tsx
├── components/
│   ├── ui/ (Shadcn components)
│   ├── booking/
│   │   ├── WizardContainer.tsx
│   │   ├── Step1_Service.tsx
│   │   ├── Step2_Calendar.tsx (Timezone sensitive)
│   │   ├── Step3_Intake.tsx
│   │   └── Step4_Success.tsx
│   └── experts/
│       └── ExpertCard.tsx
├── lib/
│   ├── core/
│   │   └── scheduling.ts (The "Time Engine" - Pure function logic)
│   ├── store/
│   │   └── booking-store.ts (Zustand with persistence)
│   ├── mock/
│   │   ├── experts.ts (Mock data)
│   │   └── services.ts
│   └── types.ts
└── __tests__/
    └── scheduling.test.ts (Unit tests for core logic)
```

## 6. Task Breakdown

### P0: Foundation & Core Logic

#### Task 1: Project Initialization

- **Agent**: `app-builder` / `frontend-specialist`
- **Action**: Initialize Next.js app, setup Tailwind, Shadcn, and install dependencies (`date-fns`, `zustand`, `zod`).
- **Verification**: `npm run dev` loads the default Next.js page. Shadcn button component renders correctly.

#### Task 2: Core "Time Engine" Implementation (The Senior Feature)

- **Agent**: `backend-specialist` (or pure Logic focus)
- **Action**: Implement `lib/core/scheduling.ts`.
  - Define types: `Expert`, `Availability`, `TimeSlot`.
  - Implement `generateSlots(date, availability, timezone)`.
  - Implement timezone conversion utilities.
- **Verification**: Create `__tests__/scheduling.test.ts` and run `npm test` (or `vitest`) to prove it handles DST and timezone shifts correctly.

### P1: State & Mock Data

#### Task 3: Mock Data & Zustand Store

- **Agent**: `frontend-specialist`
- **Action**:
  - Create `lib/mock/experts.ts` with diverse availabilities.
  - Create `lib/store/booking-store.ts` using Zustand. Implement actions: `setService`, `setTimeSlot`, `nextStep`, `prevStep`. Enable persistence.
- **Verification**: Verify state persists across page reloads in a temporary test component.

### P2: UI Implementation

#### Task 4: UI Components & Market Page

- **Agent**: `frontend-specialist`
- **Action**:
  - Implement `ExpertCard` and the Home Page grid.
  - Setup the basic Shell for the `Expert Profile`.
- **Verification**: User can see a list of experts and click one to go to `/expert/[id]`.

#### Task 5: The Booking Wizard (Complex Interactive UI)

- **Agent**: `frontend-specialist`
- **Action**:
  - Implement `WizardContainer` with Framer Motion.
  - Implement Steps 1 (Service), 2 (Calendar/Timezone), 3 (Intake), 4 (Success).
  - **Crucial**: Wire up Step 2 to use `lib/core/scheduling` functions for dynamic slot generation based on the user's selected timezone.
- **Verification**: Full manual walkthrough. Change timezone -> Slots update. Refresh page -> Stay on same step.

## 7. Verification Plan (Phase X)

- [ ] **Automated Tests**: Run `npm test` for `scheduling.ts`.
- [ ] **Lint Check**: `npm run lint`.
- [ ] **Manual E2E**:
  1.  Select "New York" expert.
  2.  User updates their timezone to "London".
  3.  Verify 9 AM EST shows as 2 PM GMT.
  4.  Complete booking.
  5.  Check "Add to Calendar" link generation.

## User Review Required

> [!IMPORTANT]
>
> - **Mock Data Strategy**: We are resolving generic slots on the client side for this demo. In a real app, this would be a backend query.
> - **Timezones**: We assume the browser's local time is the default "User Timezone", but allow overrides.
