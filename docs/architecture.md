# HeyStack - Architecture Document

**Last Updated:** 2024-11-22  
**Status:** Initial Draft - Pre-MVP

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Tech Stack](#tech-stack)
3. [Application Architecture](#application-architecture)
4. [Route Structure](#route-structure)
5. [Authentication Flow](#authentication-flow)
6. [Data Flow](#data-flow)
7. [Key Design Decisions](#key-design-decisions)
8. [TODO: Pending Decisions](#todo-pending-decisions)

---

## System Overview

HeyStack is a two-sided marketplace platform connecting students with projects at Stockholm universities. The platform has two primary layers:

1. **Marketplace Layer** - Discovery and matching (students ↔ projects)
2. **Collaboration Layer** - Project workspaces for accepted members

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│              Next.js 14+ App Router (React)              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js API Routes                     │
│              (Server-side business logic)                │
└─────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Authentication     │    │      Database        │
│   [TODO: Service]    │    │  [TODO: Service]     │
└──────────────────────┘    └──────────────────────┘
```

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Form Handling:** React Hook Form + Zod (validation)

### Backend
- **API:** Next.js API Routes (serverless functions)
- **ORM:** Prisma (type-safe database queries)
- **Validation:** Zod

### Infrastructure
- **Hosting:** Vercel
- **Database:** [TODO: Decision pending - Supabase/Vercel Postgres/PlanetScale]
- **Authentication:** [TODO: Decision pending - Supabase Auth/Clerk/NextAuth]
- **File Storage:** [TODO: Future - for profile pictures, portfolios]
- **Email Service:** [TODO: Future - Resend/SendGrid for notifications]

### Development Tools
- **Package Manager:** npm/pnpm
- **Linting:** ESLint (Next.js default config)
- **Formatting:** Prettier
- **Version Control:** Git + GitHub
- **AI Development:** Claude Code / Agentic coding tools

---

## Application Architecture

### Architectural Patterns

1. **Server Components by Default**
   - Use React Server Components for data fetching
   - Client Components only when needed (interactivity, hooks)

2. **Route Groups for Organization**
   - Logical separation without affecting URLs
   - Different layouts for different user contexts

3. **Colocated Components**
   - Components live near where they're used
   - Shared components in `/components`

4. **Type Safety Throughout**
   - TypeScript for all code
   - Zod for runtime validation
   - Prisma for database type generation

---

## Route Structure

Using Next.js App Router with Route Groups for clean organization:

```
app/
├── layout.tsx                      # Root layout (wraps everything)
├── globals.css                     # Global styles, Tailwind imports
│
├── (marketing)/                    # Route group: logged-out experience
│   ├── layout.tsx                  # Marketing layout (navbar, footer)
│   ├── page.tsx                    # Landing page (/)
│   ├── projects/
│   │   └── page.tsx                # Public project listings (/projects)
│   └── signup/
│       └── page.tsx                # Sign up flow (/signup)
│
├── (platform)/                     # Route group: logged-in experience
│   ├── layout.tsx                  # Platform shell (main nav)
│   ├── dashboard/
│   │   └── page.tsx                # User's project overview (/dashboard)
│   ├── browse/
│   │   └── page.tsx                # Browse all projects (/browse)
│   ├── profile/
│   │   └── page.tsx                # Edit user profile (/profile)
│   │
│   └── project/
│       └── [projectId]/            # Dynamic route for each project
│           ├── layout.tsx          # Project workspace layout (sidebar)
│           ├── page.tsx            # Project home (/project/[id])
│           ├── members/
│           │   └── page.tsx        # Manage team (/project/[id]/members)
│           ├── chat/               # Future feature
│           │   └── page.tsx        # "Coming Soon" placeholder
│           └── mindmap/            # Future feature
│               └── page.tsx        # "Coming Soon" placeholder
│
└── api/                            # API routes (when needed)
    ├── projects/
    │   └── route.ts                # [TODO: Define endpoints]
    └── users/
        └── route.ts                # [TODO: Define endpoints]

components/
├── ui/                             # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   └── ...
├── project-card.tsx                # Shared: project display card
├── student-card.tsx                # Shared: student profile card
├── navigation/
│   ├── marketing-nav.tsx           # Marketing site navigation
│   ├── platform-nav.tsx            # Platform navigation
│   └── project-sidebar.tsx         # Project workspace sidebar
└── forms/
    ├── project-form.tsx            # Create/edit project
    └── profile-form.tsx            # Edit user profile

lib/
├── utils.ts                        # Utility functions
├── validations/                    # Zod schemas
│   ├── project.ts
│   └── user.ts
└── [TODO: Add database client, auth helpers]

types/
└── index.ts                        # Shared TypeScript types
```

### Route Group Explanation

- **(marketing)** - Public pages, no authentication required
  - Does NOT appear in URL
  - Has its own layout (marketing nav, footer)
  
- **(platform)** - Authenticated pages, main application
  - Does NOT appear in URL
  - Has its own layout (platform navigation)
  - [TODO: Add authentication guard in layout]

- **project/[projectId]** - Dynamic routes for individual projects
  - `[projectId]` is a dynamic segment
  - Has nested layout for project-specific navigation

---

## Authentication Flow

[TODO: Finalize authentication provider]

### Planned Flow:

```
1. User visits site → (marketing) layout
2. User clicks "Sign Up" → /signup
3. User enters university email → verification sent
4. User verifies email → account created
5. User redirected to /dashboard → (platform) layout
6. Protected routes check auth status in layout.tsx
```

### Authentication Guards

```typescript
// Pseudocode for (platform)/layout.tsx
export default async function PlatformLayout({ children }) {
  // [TODO: Check if user is authenticated]
  // if (!user) redirect('/login')
  
  return (
    <div>
      <PlatformNav />
      {children}
    </div>
  )
}
```

### User Roles
- **Student** - Can browse projects, apply, create projects
- **Recruiter** - Can post projects, browse student profiles
- **Hybrid** - [TODO: Discuss if users can have both roles]

---

## Data Flow

### Marketplace Flow (Discovery)

```
User Action: Browse Projects
    │
    ▼
┌────────────────────────────┐
│  /browse page (Server)     │
│  Fetch projects from DB    │
└────────────────────────────┘
    │
    ▼
┌────────────────────────────┐
│  Render ProjectCard        │
│  components (Client)       │
└────────────────────────────┘
    │
    ▼
User clicks "Apply"
    │
    ▼
┌────────────────────────────┐
│  POST /api/applications    │
│  Create application record │
└────────────────────────────┘
    │
    ▼
┌────────────────────────────┐
│  Send notification to      │
│  project owner (email)     │
└────────────────────────────┘
```

### Project Workspace Flow (Collaboration)

```
User Action: Click on owned/joined project
    │
    ▼
┌────────────────────────────┐
│  Navigate to               │
│  /project/[projectId]      │
└────────────────────────────┘
    │
    ▼
┌────────────────────────────┐
│  Project layout loads      │
│  - Fetch project data      │
│  - Check user permissions  │
└────────────────────────────┘
    │
    ▼
┌────────────────────────────┐
│  Render workspace          │
│  - Show project sidebar    │
│  - Display role-based UI   │
│  - Owner sees extra buttons│
└────────────────────────────┘
```

---

## Key Design Decisions

### 1. Next.js App Router (Not Pages Router)
**Decision:** Use App Router (app/ directory)  
**Rationale:**
- Modern, recommended by Next.js team
- Server Components by default (better performance)
- Simpler data fetching
- Better for SEO
- Route groups for organization

### 2. TypeScript (Not JavaScript)
**Decision:** Use TypeScript throughout  
**Rationale:**
- Catches errors early
- Better IDE support and autocomplete
- Essential for scaling team
- Works well with agentic coding
- Prisma generates types automatically

### 3. Route Groups for Layout Separation
**Decision:** Use (marketing), (platform) route groups  
**Rationale:**
- Clean separation of logged-out vs logged-in experiences
- Different layouts without URL pollution
- Easy to add authentication guards per section
- Scales well as app grows

### 4. Project Workspace as Nested Routes
**Decision:** `/project/[projectId]/*` for project-specific features  
**Rationale:**
- Natural URL structure
- Easy to add features incrementally
- Clear separation from marketplace
- Can show "coming soon" pages for future features
- Minimal layout shift between owner/participant views

### 5. Monorepo Structure (Single Next.js App)
**Decision:** Not splitting frontend/backend  
**Rationale:**
- Simpler deployment (one Vercel project)
- Shared types between client/server
- Faster development for MVP
- Can split later if needed

### 6. Component Library: shadcn/ui
**Decision:** Use shadcn/ui over Material-UI, Chakra, etc.  
**Rationale:**
- Copy-paste components (full control)
- Built on Radix UI (accessible)
- Works perfectly with Tailwind
- No runtime overhead
- Easy to customize

---

## TODO: Pending Decisions

### Critical (Needed for MVP)
- [ ] **Database Service** - Supabase vs Vercel Postgres vs PlanetScale
- [ ] **Authentication Provider** - Supabase Auth vs Clerk vs NextAuth
- [ ] **ORM Confirmation** - Prisma vs Drizzle (leaning Prisma)
- [ ] **Database Schema Design** - See DATABASE_SCHEMA.md (to be created)

### Important (Needed Soon)
- [ ] **File Upload Strategy** - For profile pictures, portfolios
  - Supabase Storage vs Uploadthing vs Cloudinary
- [ ] **Email Service** - For notifications
  - Resend vs SendGrid vs Postmark
- [ ] **API Structure** - REST vs Server Actions vs both
- [ ] **Error Handling Strategy** - Global error boundaries, logging

### Future Considerations
- [ ] **Real-time Features** - For chat, notifications
  - WebSockets vs Server-Sent Events vs Polling
- [ ] **Search Implementation** - Full-text search for projects/users
  - Database built-in vs Algolia vs Meilisearch
- [ ] **Analytics** - Track user behavior, platform metrics
- [ ] **Rate Limiting** - Prevent abuse of API endpoints
- [ ] **Caching Strategy** - Redis vs Vercel KV vs none

---

## Notes

- **MVP Focus:** Prioritize getting marketplace working with mock data first
- **Documentation:** Update this doc as decisions are made
- **Team Size:** Optimized for 3 co-founders, will need adjustment as team grows
- **Timeline:** See ROADMAP.md for milestones (to be created)

---

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
