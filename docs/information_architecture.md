# HeyStack - Information Architecture

**Last Updated:** 2024-11-27  
**Version:** 1.0  
**Status:** MVP Planning

---

## Document Purpose

This document defines the complete information architecture for HeyStack, including:
- Site structure and navigation hierarchy
- Page layouts and their purposes
- Feature placement across all pages
- URL structure
- Navigation patterns

---

## Navigation Philosophy

HeyStack uses a **two-layer navigation system**:

**Layer 1 (Discovery/Marketplace):** Full-width pages for browsing, discovering, and managing your presence
**Layer 2 (Project Workspace):** Sidebar navigation for collaborating within a specific project

The two layers feel distinct but maintain consistent top navigation patterns.

---

## Layout Types

### Layout 1: Marketing Layout (Logged Out)
**Context:** Pre-authentication pages  
**Purpose:** Explain product value and convert visitors

**Structure:**
```
┌─ Top Nav (Marketing) ─────────────────────────────┐
│ [Logo] Features How It Works About [Login] [Sign Up] │
└───────────────────────────────────────────────────┘
│                                                    │
│         Full-width marketing content               │
│                                                    │
```

**Navigation Items:**
- Logo → Home
- Features
- How It Works
- About
- Login (button)
- Sign Up (primary button)

**Pages:**
- `/` - Landing page
- `/features` - Feature overview
- `/how-it-works` - Platform explanation
- `/about` - About the team/mission
- `/login` - Login form
- `/signup` - Sign up with role selection

---

### Layout 2: Discovery Layout (Layer 1)
**Context:** Post-login, marketplace/discovery context  
**Purpose:** Browse projects, browse talent, manage your profile, overview your projects

**Structure:**
```
┌─ Top Nav (Discovery) ─────────────────────────────────┐
│ [Logo] Dashboard Browse Projects Browse Talent        │
│        [+ Create Project] | [🔔] [👤]                  │
└───────────────────────────────────────────────────────┘
│                                                        │
│              Full-width content area                   │
│                                                        │
```

**Top Navigation Items:**
- **Logo** → Dashboard
- **Dashboard** → Your projects overview
- **Browse Projects** → Discover projects to join
- **Browse Talent** → Find students (recruiters/project creators)
- **[+ Create Project]** → Create new project (primary button)
- **[🔔]** → Notifications dropdown
- **[👤]** → Profile menu dropdown

**Profile Menu Dropdown:**
- View Profile
- Edit Profile
- Settings
- Help & Support
- Logout

---

### Layout 3: Project Workspace Layout (Layer 2)
**Context:** Inside a specific project  
**Purpose:** Collaborate with team on project-specific work

**Structure:**
```
┌─ Top Nav (Project) ───────────────────────────────────┐
│ [Logo] [Project Name ▼] | [🔔] [👤]                   │
└───────────────────────────────────────────────────────┘
│ Sidebar │ Main Content Area                           │
│         │                                              │
│ [Proj▼] │                                              │
│         │                                              │
│ Home    │                                              │
│ Members │                                              │
│ Chat    │                                              │
│ Mindmap │                                              │
│ Files   │                                              │
│ ...     │                                              │
│ Settings│                                              │
└─────────┴──────────────────────────────────────────────┘
```

**Top Navigation Items:**
- **Logo** → Back to Dashboard (escape hatch)
- **[Project Name ▼]** → Project switcher dropdown
- **[🔔]** → Notifications
- **[👤]** → Profile menu

**Project Switcher Dropdown:**
- Search projects...
- ✓ Current Project Name
- Your Other Projects...
- ─────────────
- + Create New Project
- ← Back to Dashboard

**Sidebar Navigation (Grouped):**

**Core:**
- 🏠 Home
- 👥 Members (with count badge)

**Communication:**
- 💬 Chat
- 📋 Feedback Threads

**Collaboration:**
- 🧠 Mind Map
- 🎨 Whiteboard
- 📁 Files

**Planning:**
- 📅 Calendar
- ⏱️ Timeline
- ✅ To-Do

**Admin:**
- ⚙️ Settings (owner only)

**MVP Note:** Items marked with 💬 show "Coming Soon" badge

---

## Complete Sitemap

### Public (Logged Out)

```
/
├─ /features
├─ /how-it-works
├─ /about
├─ /login
└─ /signup
    ├─ /signup/student
    └─ /signup/recruiter
```

### Discovery (Layer 1 - Logged In)

```
/dashboard
├─ Overview of your projects (Vercel-style cards)
├─ Projects you own
├─ Projects you're part of
└─ Pending applications

/browse
├─ /browse/projects
│   ├─ List/grid of all projects
│   ├─ Filters and search
│   └─ /browse/projects/[id] → Project detail page
│
└─ /browse/talent
    ├─ Directory of students
    ├─ Filters and search
    └─ /browse/talent/[userId] → Student profile

/profile
├─ /profile (your own profile - redirects to edit)
├─ /profile/edit
└─ /profile/[userId] (view other user's profile)

/projects
└─ /projects/create (create new project form)

/applications
└─ /applications (manage your applications - future)

/notifications
└─ /notifications (notification center - future)

/settings
└─ /settings (account settings)
```

### Project Workspace (Layer 2 - Logged In)

```
/project/[projectId]
├─ /project/[projectId] (home/overview)
├─ /project/[projectId]/members
│
├─ Communication
├─ /project/[projectId]/chat
├─ /project/[projectId]/feedback
│
├─ Collaboration
├─ /project/[projectId]/mindmap
├─ /project/[projectId]/whiteboard
├─ /project/[projectId]/files
│
├─ Planning
├─ /project/[projectId]/calendar
├─ /project/[projectId]/timeline
├─ /project/[projectId]/todo
│
└─ Admin
    └─ /project/[projectId]/settings (owner only)
```

---

## Page Specifications

### Marketing Pages

#### `/` - Landing Page
**Layout:** Marketing  
**Purpose:** Convert visitors to sign up

**Sections:**
- Hero section (value proposition, dual CTAs)
- How it works (3-step process)
- Featured projects (public preview)
- Benefits for students
- Benefits for project leaders
- Social proof / testimonials
- Final CTA section

**CTAs:**
- "Find Projects" → `/signup/student`
- "Post a Project" → `/signup/recruiter`

---

#### `/signup` - Sign Up Flow
**Layout:** Marketing (minimal nav)  
**Purpose:** Create account with role selection

**Steps:**
1. Role selection (Student or Recruiter)
2. Email + password
3. Email verification
4. Profile setup wizard (different per role)

---

### Discovery Pages (Layer 1)

#### `/dashboard` - Your Dashboard
**Layout:** Discovery  
**Purpose:** Central hub for user's project activity

**Content Sections:**
1. **Header**
   - Welcome message
   - Quick stats (projects, applications)
   - [+ Create Project] button

2. **Projects You Own** (if any)
   - Vercel-style project cards
   - Shows: title, member count, last activity
   - Click → `/project/[id]`

3. **Projects You're Part Of** (if any)
   - Same card style
   - Shows role badge

4. **Pending Applications** (if any)
   - List of applications with status
   - Quick actions

5. **Recommended Projects** (future)
   - Algorithm-based suggestions

**Empty States:**
- No projects yet → Big CTA to create or browse
- No applications → Prompt to browse projects

---

#### `/browse/projects` - Browse Projects
**Layout:** Discovery  
**Purpose:** Discover projects to join

**Content Structure:**
```
┌─ Filters Sidebar (left) ──────────────────────────────┐
│ Skills                                                 │
│ ☐ React                                               │
│ ☐ Python                                              │
│ ☐ Design                                              │
│                                                        │
│ Project Type                                           │
│ ☐ Research                                            │
│ ☐ Startup                                             │
│ ☐ Competition                                         │
│                                                        │
│ Time Commitment                                        │
│ Compensation                                           │
│ Duration                                               │
└────────────────────────────────────────────────────────┘

┌─ Main Area ───────────────────────────────────────────┐
│ Search: [____________] [Sort by ▼]  [View: Grid/List] │
│                                                        │
│ ┌─ Project Card ──────────────────────────────┐      │
│ │ Project Title                                │      │
│ │ Short description...                         │      │
│ │ Skills: [React] [Design] [Python]           │      │
│ │ 10 hrs/week • 3 months • Unpaid             │      │
│ │                            [Apply] [Save]    │      │
│ └──────────────────────────────────────────────┘      │
│                                                        │
│ [More project cards...]                               │
└────────────────────────────────────────────────────────┘
```

**Features:**
- Search by keyword
- Filter panel (collapsible on mobile)
- Sort options (newest, most relevant, ending soon)
- Grid/list view toggle
- Pagination or infinite scroll

**Card Click:** → `/browse/projects/[id]` (detail page)

---

#### `/browse/projects/[id]` - Project Detail
**Layout:** Discovery  
**Purpose:** View full project details before applying

**Content:**
- Project header (title, owner, posted date)
- Full description
- Required skills (with proficiency levels)
- Nice-to-have skills
- Time commitment details
- Duration and start date
- Compensation
- Team size needed
- Project type/category
- Application deadline (if any)
- About the project owner (mini profile)
- **Primary CTA:** [Apply to Project]
- **Secondary:** [Save] [Share]

**Apply Flow:**
- Click Apply → Modal/form
- Optional cover message (future MVP)
- Sends your profile to owner
- Confirmation message
- Updates application status in dashboard

---

#### `/browse/talent` - Browse Students
**Layout:** Discovery  
**Purpose:** Find students to recruit (for recruiters/project creators)

**Access:** Available to all logged-in users (students can also browse to find collaborators)

**Content Structure:**
```
┌─ Filters ─────────────────────────────────────────────┐
│ Similar to projects but for student attributes        │
│ - Major/Program                                        │
│ - Skills                                               │
│ - Graduation Year                                      │
│ - Availability (hrs/week)                             │
└────────────────────────────────────────────────────────┘

┌─ Student Cards ───────────────────────────────────────┐
│ ┌─ Student Card ──────────────────────────────┐      │
│ │ [Photo] Name                                │      │
│ │ Program • Graduation Year                   │      │
│ │ Skills: [React] [Python] [Leadership]      │      │
│ │ Available: 15 hrs/week                     │      │
│ │                    [View Profile] [Invite]  │      │
│ └──────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────┘
```

**Only shows students with "Open to opportunities" enabled**

---

#### `/profile/[userId]` - View Profile
**Layout:** Discovery  
**Purpose:** View detailed student or recruiter profile

**Student Profile Sections:**
1. **Hero Section**
   - Profile picture
   - Name
   - University logo
   - "Open to opportunities" indicator
   - Last active
   - Karma rating (future)
   - Primary actions: [Message] [Invite to Project]

2. **About**
   - Bio/introduction
   - Looking for (what kind of projects)

3. **Education**
   - University, program, year
   - Expected graduation

4. **Skills**
   - Hard skills (with endorsements count)
   - Soft skills
   - Tools/technologies

5. **Experience**
   - Past projects (on/off platform)
   - Work experience
   - Achievements

6. **Portfolio**
   - GitHub, LinkedIn, personal site links
   - Featured projects

7. **Availability**
   - Hours per week
   - Preferred project types

8. **Activity** (future)
   - Recent projects joined
   - Endorsements received

**Recruiter Profile:**
- Simpler version
- Organization/affiliation
- Projects posted
- About/bio

---

#### `/profile/edit` - Edit Your Profile
**Layout:** Discovery  
**Purpose:** Manage your professional profile

**Form Sections:**
- Basic Info (name, photo, bio)
- Education
- Skills (add/remove, with autocomplete)
- Experience (add/edit past projects)
- Portfolio links
- Availability settings
  - "Open to opportunities" toggle
  - Hours available per week
  - Preferred project types

**Actions:**
- Save changes
- Preview profile
- Cancel

---

#### `/projects/create` - Create Project
**Layout:** Discovery  
**Purpose:** Post a new project

**Form Sections:**
1. **Basic Information**
   - Project title*
   - Description*
   - Project type* (research, startup, competition, etc.)

2. **Requirements**
   - Required skills* (add multiple with proficiency)
   - Nice-to-have skills
   - Team size needed*

3. **Logistics**
   - Time commitment* (hrs/week)
   - Duration* (fixed term, ongoing)
   - Start date (optional)
   - Application deadline (optional)

4. **Compensation**
   - Type* (paid, unpaid, credit, equity)
   - Amount (if paid)

5. **Preview**
   - See how project will appear to students

**Actions:**
- Save as draft
- Publish project
- Cancel

---

### Project Workspace Pages (Layer 2)

#### `/project/[id]` - Project Home
**Layout:** Project Workspace  
**Purpose:** Project overview and quick access to key info

**Content:**
- Project header (title, description, status)
- Quick stats (team size, start date, duration)
- Team roster (with avatars)
- Recent activity feed (future)
- Quick actions:
  - [Invite Member] (owner)
  - [View All Members]
  - [Open Chat] (future)

**Owner-specific:**
- Edit project button
- Manage applications
- Project visibility toggle

---

#### `/project/[id]/members` - Team Management
**Layout:** Project Workspace  
**Purpose:** View and manage project team

**Content:**

**For All Members:**
- List of all team members
- Each member shows:
  - Profile picture
  - Name
  - Role (Owner, Member)
  - Skills
  - Link to profile

**Owner Additional Features:**
- [Add Member] button → Search modal
- Remove member button (per member)
- Change role dropdown (future)
- View pending invites

**Empty State:**
- Just you → Prompt to invite members

---

#### `/project/[id]/chat` - Group Chat
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Real-time team chat
- Thread conversations
- File/image sharing
- Voice notes
- Search in chat
- @mentions

---

#### `/project/[id]/mindmap` - Collaborative Mind Map
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Coogle-style mind mapping
- Real-time collaboration
- Voice editing
- AI agent to pull from chats
- Export options

---

#### `/project/[id]/whiteboard` - Whiteboard
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Digital whiteboard
- Drawing tools
- Sticky notes
- Especially for tablet users
- Real-time collaboration

---

#### `/project/[id]/files` - File Storage
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Shared file repository
- Folder organization
- File preview
- Version history
- Comments on files
- Feedback threads

---

#### `/project/[id]/calendar` - Project Calendar
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Shared team calendar
- Event scheduling
- Poll for meeting times (auto-adds to calendar)
- Integrations (Google Calendar)
- Milestone dates

---

#### `/project/[id]/timeline` - Project Timeline
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Visual project timeline
- Completed tasks history
- Upcoming deadlines
- Events and meetings
- AI-generated from completed tasks + calendar
- Edit by team leaders only
- Comments by members

---

#### `/project/[id]/todo` - To-Do List
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (MVP)

**Planned Features:**
- Team to-do list
- Chronological order
- Priority color tags
- Assign tasks to members
- Set deadlines (feeds into timeline)
- Self-reporting system
- Approval by admin before adding to timeline

---

#### `/project/[id]/feedback` - Feedback Threads
**Layout:** Project Workspace  
**Status:** 💬 Coming Soon (Post-MVP)

**Planned Features:**
- Thread-based feedback
- Attach to files/sections
- Voice memos in threads
- Link to specific lines/paragraphs
- Status tracking (open, resolved)

---

#### `/project/[id]/settings` - Project Settings
**Layout:** Project Workspace  
**Access:** Owner only  
**Status:** âœ… MVP

**Settings Sections:**
1. **General**
   - Edit project name
   - Edit description
   - Change project type
   - Project visibility

2. **Team**
   - Member roles management
   - Custom role creation (future)
   - Permissions (future)

3. **Notifications**
   - Email preferences for this project
   - What events trigger notifications

4. **Danger Zone**
   - Archive project
   - Delete project (with confirmation)

---

## MVP Feature Assignment

### MVP (Must Have)

**Discovery:**
- âœ… Landing page
- âœ… Sign up/login flow
- âœ… Dashboard with project cards
- âœ… Browse projects with filters
- âœ… Project detail page
- âœ… Apply to project
- âœ… Browse talent
- âœ… View student profile
- âœ… Edit your profile
- âœ… Create project

**Project Workspace:**
- âœ… Project home
- âœ… Members list
- âœ… Add/remove members (owner)
- âœ… Project settings (owner)
- âœ… Project switcher dropdown

**Communication:**
- âœ… Email notifications

### Post-MVP (Phase 2)

- ðŸ"„ In-platform notifications
- ðŸ"„ Application status tracking
- ðŸ"„ Saved projects/students
- ðŸ"„ Direct messaging
- ðŸ"„ Invite students to projects
- ðŸ"„ Admin dashboard
- ðŸ"„ Content moderation

### Future (Phase 3+)

- ðŸ"® Group chat
- ðŸ"® Mind map
- ðŸ"® Whiteboard
- ðŸ"® File sharing
- ðŸ"® Calendar
- ðŸ"® Timeline
- ðŸ"® To-do system
- ðŸ"® Feedback threads
- ðŸ"® Karma system
- ðŸ"® Project recommendations
- ðŸ"® Advanced analytics

---

## Navigation Flows

### Primary User Flows

**1. Student Finding and Joining Project:**
```
Login → Dashboard → Browse Projects → Filter/Search → 
View Project Detail → Apply → Wait for Acceptance → 
Project Appears in Dashboard → Click Project → 
Project Workspace (Home) → Collaborate
```

**2. Recruiter Posting Project:**
```
Login → Dashboard → Create Project → Fill Form → 
Publish → Dashboard (see posted project) → 
Wait for Applications → Review Applications → 
Accept Student → Student Added to Project Workspace
```

**3. Student Creating Project and Recruiting:**
```
Login → Dashboard → Create Project → Publish → 
Browse Talent → View Student Profiles → 
Invite to Project → Wait for Acceptance → 
Work Together in Project Workspace
```

**4. Working in Project Workspace:**
```
Dashboard → Click Project Card → Project Home → 
Use Sidebar to Navigate → Chat / Files / Timeline → 
Collaborate → Settings (if owner)
```

### Quick Actions

**From Anywhere:**
- Click Logo → Dashboard
- Notifications → See all activity
- Profile Menu → Edit profile, settings, logout

**From Project Workspace:**
- Project Switcher → Jump to another project
- Project Switcher → Back to Dashboard
- Project Switcher → Create new project

---

## Responsive Behavior

### Mobile Adaptations

**Discovery Layout:**
- Top nav collapses to hamburger menu
- Filter sidebar becomes bottom sheet/modal
- Cards stack vertically
- Search bar full-width

**Project Workspace:**
- Sidebar collapses to hamburger menu
- Project switcher in hamburger menu
- Top nav shows project name only
- Content area full-width

### Tablet
- Discovery: 2-column card grid
- Sidebar: Can stay visible (narrow)
- Optimized for whiteboard/mindmap features

### Desktop
- Full layout as designed
- Keyboard shortcuts enabled
- Multi-column layouts where appropriate

---

## URL Patterns

### Pattern Conventions

**Discovery (Layer 1):**
- `/[feature]` - Top-level features
- `/[feature]/[id]` - Detail pages
- `/[feature]/[action]` - Action pages

**Project Workspace (Layer 2):**
- `/project/[id]` - Project home
- `/project/[id]/[feature]` - Project features

### Examples
```
Good:
/dashboard
/browse/projects
/browse/projects/abc123
/profile/user456
/project/xyz789
/project/xyz789/members

Avoid:
/projects/browse (inconsistent)
/user/profile (redundant)
/project-members/xyz789 (flat structure)
```

---

## Access Control

### Public (No Auth Required)
- `/` - Landing
- `/features`
- `/how-it-works`
- `/about`
- `/login`
- `/signup`

### Authenticated (Any Role)
- All `/dashboard` routes
- All `/browse` routes
- All `/profile` routes
- `/projects/create`

### Project Member Only
- `/project/[id]/*` - Must be owner or member

### Project Owner Only
- `/project/[id]/settings`
- Add/remove member actions

### Admin Only (Future)
- `/admin/*`

---

## Open Questions

1. **Dashboard as landing?** Should logged-in users always land on dashboard, or remember last page?

2. **Browse Talent visibility:** Should all students see "Browse Talent" or only recruiters/project creators?

3. **Project visibility:** Should all projects be public in browse, or can owners make them "unlisted"?

4. **Application process:** Custom forms per project, or standardized?

5. **Role switching:** If someone is both student and recruiter, how does the UI adapt?

6. **Notifications:** Bell icon opens dropdown or goes to dedicated page?

---

## Next Steps

- [ ] Wireframe key pages (dashboard, browse, project home)
- [ ] Design navigation components (top nav, sidebar, dropdowns)
- [ ] Create component inventory
- [ ] Define data models for each page
- [ ] Build static mockup pages

---

