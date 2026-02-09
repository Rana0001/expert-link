## 🧠 Brainstorm: Role-Based Dashboard Architecture

### Context

We need to implement separate dashboard experiences for **Experts** and **Clients**. Currently, `app/dashboard` exists but seems tailored for experts. We need a strategy that scalable, maintains code reuse where appropriate, and provides a distinct UX for each role.

---

### Option A: Unified Route with Conditional Rendering

Keep a single `/dashboard` route. The page component checks the user's role and renders either `<ExpertDashboard />` or `<ClientDashboard />`.

**Structure:**

```
app/dashboard/page.tsx  (Role check -> Render Component)
components/dashboard/ExpertDashboard.tsx
components/dashboard/ClientDashboard.tsx
```

✅ **Pros:**

- **Simple URL:** Everyone goes to `/dashboard`.
- **Easy Shared Layout:** If both use the same sidebar/header, this is very easy to manage.

❌ **Cons:**

- **Code Coupling:** Harder to split code bundles (dynamic imports needed).
- **Complex Page Logic:** The `page.tsx` becomes a switch statement.
- **Middleware Complexity:** Permissions are handled inside the component rather than at the route level.

📊 **Effort:** Low

---

### Option B: Route Groups (Recommended)

Use Next.js Route Groups `(expert)` and `(client)` to separate logic while keeping the URL structure clean or distinct.

**Structure:**

```
app/dashboard/layout.tsx        (Common shell logic)
app/dashboard/(expert)/page.tsx (Expert view)
app/dashboard/(client)/page.tsx (Client view)
```

_Note: You'd likely need a middleware redirect to send `/dashboard` -> `/dashboard/expert` or `/dashboard/client` based on role._

✅ **Pros:**

- **Clean Separation:** Expert and Client code is physically separated.
- **Optimized Loading:** Each route only loads what it needs.
- **Scalable:** Easy to add distinct sub-pages for each role (e.g., `/dashboard/services` vs `/dashboard/bookings`).

❌ **Cons:**

- **Routing Logic:** Requires a redirect at `/dashboard` entry point.
- **File Structure:** Slightly deeper nesting.

📊 **Effort:** Medium

---

### Option C: Distinct Root Paths

Completely separate the apps at the top level: `/expert/...` and `/client/...`.

**Structure:**

```
app/expert/dashboard/page.tsx
app/client/dashboard/page.tsx
```

✅ **Pros:**

- **Maximum Isolation:** Zero risk of leaking expert features to clients.
- **Clear URLs:** `/expert/dashboard` is unambiguous.
- **Simple Middleware:** Easy to protect `/experts/*` routes effectively.

❌ **Cons:**

- **Inconsistent UX:** Harder to share "Dashboard" commonalities (Notifications, Settings).
- **Refactor Required:** Migrating existing `app/dashboard` might be more work.

📊 **Effort:** High

---

## 💡 Recommendation

**Option B (Route Groups)** is the modern Next.js way.
It allows us to share the `layout.tsx` (Sidebar, Header) if desired, but keep the page content completely separate.

**Proposed Next Steps:**

1.  Move current `app/dashboard/*` content into `app/dashboard/(expert)/`.
2.  Create `app/dashboard/(client)/`.
3.  Add a `middleware.ts` or root `page.tsx` to redirect based on `user_metadata.role`.

Which direction would you like to explore?
