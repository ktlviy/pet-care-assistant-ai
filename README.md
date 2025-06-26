# 🐾 Pet Care Assistant AI

A modern, AI-powered pet care assistant web app built with **Next.js**, **React**, **Tailwind CSS**, **Prisma**, and **TanStack Query**. Get chat-based pet care advice, upload pet photos for AI analysis, and generate personalized care/treatment plans for your pets.

---

## Features

- **AI Chat for Pet Care**: Ask questions about your pet's health, care, or behavior and get instant, actionable advice from an OpenAI-powered assistant.
- **Photo Upload & AI Analysis**: Upload a photo of your pet. The AI will extract type, species, color, and age, and generate a personalized care plan.
- **Personalized Treatment Plans**: Each pet gets a detailed, step-by-step care plan, saved to your profile.
- **Pet Profiles**: View, manage, and revisit all your pets and their care plans.
- **Authentication**: Secure login and registration with NextAuth.js.
- **Modern UI/UX**: Clean, responsive design with custom components and Tailwind CSS.
- **Robust State Management**: Uses React context, hooks, and TanStack Query for scalable, maintainable state.

---

## Tech Stack

- **Frontend**: Next.js, React 19, Tailwind CSS, TypeScript
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **AI**: OpenAI GPT-4o (or gpt-4.1-nano) for chat and vision
- **State/Data**: TanStack Query, React Context
- **Auth**: NextAuth.js (email/password, ready for OAuth)
- **UI**: Custom component library (Button, Input, etc.), CVA, clsx

---

## Database Models (Prisma)

```prisma
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  password       String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  treatmentPlans TreatmentPlan[]
}

model TreatmentPlan {
  id        String   @id @default(cuid())
  petType   String
  color     String
  species   String
  age       String
  plan      String
  photoUrl  String @default("")
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Set Up Environment

DATABASE_URL=""

NEXTAUTH_SECRET=""

OPENAI_API_KEY=""

CLOUDINARY_CLOUD_NAME=""

CLOUDINARY_API_KEY=""

### 3. Database

```bash
npx prisma migrate dev --name init
```

### 4. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Project Structure

- `app/` — Main Next.js app, pages, components, context, hooks, services
- `app/components/` — UI and feature components (chat, pets, navbar, etc.)
- `app/context/` — Context providers (e.g., ChatProvider, ProviderMerger)
- `app/services/` — API and AI service logic
- `app/types/` — TypeScript types
- `prisma/` — Prisma schema and migrations

---

## Key Components

- **Chat UI**: Modern, mobile-friendly chat with file upload and AI streaming.
- **PhotoUpload**: Drag-and-drop or click to upload, with preview and removal.
- **ProviderMerger**: Utility to compose multiple React context providers cleanly.
- **Custom UI**: Button, Input, and other components use CVA and Tailwind for consistency.

---

## Customization & Extensibility

- Add more providers to `ProviderMerger` in `app/layout.tsx` for scalable context management.
- Extend the Prisma schema for more pet or user features.
- Swap OpenAI models or prompts in `app/services/openai.ts` and `app/constants/AI_PROMPTS.ts`.

---

## Credits

- [OpenAI](https://openai.com/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

---
