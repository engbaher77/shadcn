https://www.youtube.com/watch?v=SjsQdfvxjL8&t=1166s



### Implementation Plan & Checkpoints

Here is a step-by-step breakdown of the implementation process.

---

__Checkpoint 1: Core Authentication Flow__

- __Goal:__ Allow users to log in and log out. Protect application routes.

- __Tasks:__

  1. Build the __Login Page UI__ using `shadcn/ui` components.
  2. Create an `AuthService` to handle the API call to your NestJS `/auth/login` endpoint.
  3. Implement logic to receive and store JWTs securely.
  4. Set up a __protected layout__ for the main application that only authenticated users can access.
  5. Implement the __logout__ functionality.

---

__Checkpoint 2: Multi-Business Context Switching__

- __Goal:__ Allow users who belong to multiple businesses to select which one they want to manage.

- __Tasks:__

  1. After login, decode the JWT to get the `businessIds` array.
  2. If the user has more than one business, display a __Business Selector UI__ (e.g., a dropdown in the navbar).
  3. Create the `BusinessContext` to store the `activeBusinessId` globally.
  4. Update the API service to send the `activeBusinessId` with every relevant request.

---

__Checkpoint 3: RBAC & ABAC (Role & Permission Handling)__

- __Goal:__ Control UI elements and user actions based on roles and fine-grained permissions.

- __Tasks:__

  1. Fetch the user's specific claims (permissions) for the selected business from a backend endpoint (e.g., `/auth/claims?businessId=...`).
  2. Store these claims in the `BusinessContext`.
  3. Create a custom hook `usePermission(resource: string, action: string)` that returns `true` or `false`.
  4. Refactor UI components to use this hook to conditionally render buttons, links, and form fields. For example, an "Edit" button would only be visible if `usePermission('settings', 'update')` is true.

---

__Checkpoint 4: Feature Implementation (Pages & Components)__

- __Goal:__ Build the core features of the application, respecting the established auth rules.

- __Tasks:__

  1. Build out the main application pages (e.g., Dashboard, Settings, Messages, Pages).
  2. Each page and component will use the `usePermission` hook to ensure users can only see and do what they are authorized for.
  3. Implement features like __Channel Scoping__ in the Messages view, likely as a set of filters.




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
