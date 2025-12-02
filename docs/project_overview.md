# HeyStack - Project Overview (Updated)

**Last Updated:** 2024-11-22  
**Version:** 2.0 - Post Architecture Discussion

---

## Problem Statement

### For Students

#### The Individual Student
- **Discovery Gap:** Hard to discover what projects exist at the university
  - Not enough accessible channels to gain valuable extracurricular experience and development
- **Fragmentation:** No centralized place to find opportunities across different departments and faculties
  - Opportunities are scattered and require different application processes
- **Visibility Problem:** Difficult to showcase their skills and availability to project leaders
  - Hard to find collaborators outside social circles despite massive talent pool
  - No channels to tap into the broader student talent pool

#### For Groups of Students
- Difficult to find the right mix of skills and competencies
- Student-driven initiatives tend to be homogenous in terms of background
- Example: How does a KTH student-driven IT startup find the best student HR manager?

### For Project Leaders

(Professors, PhD students, Student entrepreneurs)

- **Recruitment Challenge:** Hard to find competent students with specific skills
  - Difficult to get the word out for a project and gain traction
- **No Efficient Browse:** No way to browse available students and their qualifications
  - No efficient way to browse and recruit potential student colleagues
- **Scattered Channels:** Recruiting happens through fragmented channels (emails, department boards, Discord, word-of-mouth)

---

## Solution

A two-sided marketplace platform connecting students with projects, specifically tailored for Stockholm universities, with integrated collaboration workspaces.

### Core Value Proposition

**For Students:**
- Unified hub to discover and apply to projects with one profile
- Ability to initiate projects and find collaborators
- Professional profile showcasing skills, experience, and availability
- Access to project workspaces for collaboration

**For Project Leaders:**
- Browse and recruit students based on hard and soft skills, experience, goals, and availability
- Post projects and manage applications in one place
- Access to project workspace for team management

### Key Differentiators

1. **Two-Way Discovery**
   - Not just job listings - active student profiles that recruiters can search and contact
   - Students can both apply to projects AND create their own

2. **Integrated Collaboration**
   - Once matched, teams get a dedicated project workspace
   - Seamless transition from discovery to collaboration
   - Future: Built-in tools (chat, mindmaps, task management)

3. **University-Focused**
   - Built specifically for academic project environment
   - University email verification ensures quality
   - Supports various project types (research, startups, competitions)

---

## Target Market

### Phase 1 (MVP)
**Primary:** Our engineering university (KTH)

**Strategy:**
- Partner with existing projects to use platform for recruiting
- Recruit students onto the platform (boots on the ground)
- Focus on proving core marketplace value

### Phase 2 (Expansion)
**Target:** Other Stockholm universities (business schools, design schools, arts schools)

**Value:**
- Create cross-disciplinary collaboration opportunities
- Engineering students meet business/design students
- Richer talent pool for all projects

### Phase 3 (Growth)
**Expansion:**
- Companies posting paid projects/internships
- Official university research project postings
- Premium features and monetization

**Geographic Strategy:**
- Maintain focus on Stockholm region (deep not wide)
- Not going global - own the local market

---

## Product Architecture

### Two-Layer System

#### Layer 1: Marketplace (Discovery & Matching)
**Outside Project Context - Main Platform Interface**

Students can:
- Browse and search for projects
- Manage their professional profile
- Apply to projects or express interest
- Create new projects and recruit collaborators
- Receive project recommendations
- Send/receive invitations

Project Leaders can:
- Post projects with detailed requirements
- Browse student profiles with advanced filters
- Review applications
- Invite specific students to projects
- Manage multiple project postings

#### Layer 2: Collaboration (Project Workspace)
**Inside Project Context - Project-Specific Interface**

Once a student joins a project (as owner or accepted member):
- Navigate to dedicated project workspace at `/project/[id]`
- Project-specific dashboard with navigation sidebar
- Consistent layout for both owners and participants
  - Owners see additional management controls (add/remove members, settings)
  - Participants see same structure without admin controls

**MVP Features:**
- Project overview/home
- Member management (owners only)
- Basic team roster view

**Future Features** (shown as "Coming Soon"):
- Group chat
- Collaborative mindmaps
- File sharing
- Task/milestone tracking
- Calendar integration

---

## Core Features

### Pre-Login (Marketing Site)

**Purpose:** Explain value and convert visitors

**Components:**
- Hero section explaining value for both students and project leaders
- Public project listings (overview cards, job-board style)
  - Blurred photos for privacy
  - Basic info visible without login
- Featured students or platform statistics
- Separate CTAs:
  - "Find Projects" (for students)
  - "Post a Project" / "Find Team Members" (for recruiters)
- Sign-up flow with role selection

---

### Post-Login: Student Experience

#### Dashboard (`/dashboard`)
**Purpose:** Central hub for student's project activity

**Features:**
- Vercel-style project overview showing:
  - Projects you own
  - Projects you're part of
  - Application status for pending projects
- Quick actions: Create project, Browse projects
- Personalized project recommendations (future)

#### Browse Projects (`/browse`)
**Format:** Job-board style with powerful filtering

**Key Information per Project:**
- Project title and description
- Required skills (tags with proficiency levels)
- Time commitment (hours/week)
- Duration
- Compensation (if any)
- Project type (research, startup, competition team, etc.)
- "Apply" or "Express Interest" button

**Filters:**
- Skills required
- Project type
- Time commitment
- Compensation
- Department/Faculty
- Duration

#### Student Profile (`/profile`)
**Format:** LinkedIn-style professional profile

**Sections:**
- Basic Information
  - Name, program, graduation year
  - Profile picture
  - Bio/About section
  
- Education Background
  - University, major, minor
  - Expected graduation
  
- Skills & Competencies
  - Hard skills (technical abilities)
  - Soft skills (communication, leadership, etc.)
  - Collaboration/workflow tools
  
- Experience
  - Past projects (on and off platform)
  - Relevant experience
  
- Portfolio
  - Links to GitHub, LinkedIn, personal website
  - Project showcases
  
- Availability
  - "Open to opportunities" toggle
  - Hours available per week
  - Preferred project types

**Visibility:**
- When "open to opportunities" is ON → profile appears in recruiter search
- When OFF → profile only visible through applications

---

### Post-Login: Recruiter Experience

#### Recruiter Dashboard (`/dashboard`)
**Purpose:** Manage posted projects and applications

**Features:**
- All posted projects with status
- Pending applications requiring review
- Analytics per project (views, applications)
- Quick action: Post new project

#### Post Project (`/recruiter/post`)
**Format:** Detailed form with required fields

**Information Collected:**
- Project basics (title, description)
- Required skills with proficiency levels
- Nice-to-have skills
- Time commitment expectations
- Duration (fixed term, ongoing, etc.)
- Compensation (paid, unpaid, credit, volunteer)
- Project type/category
- Application deadline (optional)
- Team size needed

#### Browse Students (`/recruiter/browse`)
**Format:** Filterable directory of student profiles

**Filters:**
- Major/education background
- Specific skills
- Year/graduation date
- Availability status (hours/week)
- Project type preferences

**Actions:**
- View full student profile
- Send project invitation
- Save/bookmark students

#### Application Management
**Per Project:**
- List of all applicants
- Applicant profiles and application details
- Actions: Accept, Reject, Request Interview
- Status tracking

---

### Project Workspace (`/project/[projectId]`)

#### Access Control
- **Owners:** Full access + management controls
- **Members:** Full access (read/collaborate)
- **Non-members:** No access (404 or permission denied)

#### Layout Structure
**Consistent for all members with role-based controls:**

**Sidebar Navigation:**
- Project Home
- Members (with badge showing count)
- Chat (coming soon)
- Mindmap (coming soon)
- Files (coming soon)
- Settings (owner only)

**Main Content Area:**
- Role-specific views
- Owners see additional action buttons (e.g., "Add Member", "Remove Member")
- Participants see same layout without admin actions

#### MVP Features

**Project Home (`/project/[id]`)**
- Project description and details
- Current team roster
- Project status/phase
- Recent activity (future)

**Members Management (`/project/[id]/members`)**
- List of all team members with roles
- Owner can:
  - Add new members (search and invite)
  - Remove members
  - Change member roles (future: admin, member, viewer)
- Participants can view team roster

#### Future Features (Placeholder Pages)
- **Chat:** Real-time team communication
- **Mindmap:** Collaborative idea mapping
- **Files:** Shared document repository
- **Tasks:** Project task management
- **Calendar:** Shared scheduling

---

## Application & Communication Flow

### Application Process (MVP)

**Student Applies:**
1. Student clicks "Apply" on project listing
2. Optional: Add cover message (future)
3. Application sends student's profile to project owner
4. Student receives confirmation

**Project Owner Reviews:**
1. Receives notification (email)
2. Reviews application in dashboard
3. Views student's full profile
4. Actions: Accept, Reject, or Request More Info

**Upon Acceptance:**
1. Student receives notification
2. Student added to project workspace
3. Project appears in student's dashboard
4. Student can access `/project/[projectId]`

### Communication (MVP)
- Email notifications for key events:
  - New application received
  - Application accepted/rejected
  - Project invitation received
  - New member added to project
- Contact via university email initially

### Communication (Future)
- Internal messaging system
- In-platform notifications
- Thread-based conversations
- File attachments

---

## Project Types Supported

The platform accommodates various types of student projects:

1. **Research Projects**
   - Professor or PhD-led research
   - Often credit-based or paid
   - Longer duration (semester/year)

2. **Student Startups**
   - Peer-to-peer co-founder matching
   - Equity-based or unpaid initially
   - Ongoing/long-term

3. **Competition Teams**
   - Hackathons, case competitions, challenges
   - Short-term, intensive
   - Often unpaid (prize-driven)

4. **Course Projects**
   - Cross-course collaboration
   - Semester-based
   - Credit/grade-driven

5. **Paid Internships** (Future - Phase 3)
   - Company-posted opportunities
   - Paid positions
   - Professional experience

Each type may have specific templates or required fields to optimize matching.

---

## Technical Considerations

### Authentication & Trust
- **Mandatory university email verification**
  - Ensures all users are legitimate students/faculty
  - Maintains platform quality
- **Role-based access control**
  - Students vs Recruiters vs Admin
  - Project-level permissions (owner, member)

### Data Storage (MVP)

**Core Data:**
- User profiles (students and recruiters)
- Project listings and details
- Application records
- Project memberships
- Basic analytics (views, clicks)

**Future Data:**
- Message history
- File uploads
- Collaborative documents
- Activity logs

### Performance Considerations
- Server-side rendering for SEO (landing, public listings)
- Client-side interactions for dynamic features
- Optimistic UI updates for better UX
- Image optimization for profile pictures

### Future Technical Features
- **Advanced Search:** Algorithm optimization for matching
- **Recommendation Engine:** ML-based project suggestions
- **Analytics Dashboard:** Platform usage metrics for admins
- **Integrations:** Calendar, Google Forms, GitHub
- **Real-time Features:** Chat, notifications, collaborative editing

---

## Go-to-Market Strategy

### Phase 1: Cold Start Problem

**Challenge:** Classic two-sided marketplace - need both supply and demand

**Strategy:**
1. **Start with Supply (Projects)**
   - Contact existing projects at our university
   - Get 10-15 projects to commit to posting on platform
   - Professors, PhD students, existing student startups
   - Leverage personal network and endorsements

2. **Create Demand (Students)**
   - "Look at all these opportunities available!"
   - Boots on the ground recruitment
   - Partnerships with student organizations
   - Present at relevant courses/programs

3. **Enable Student-Initiated Projects**
   - Students can create projects and recruit
   - Turns users into supply generators
   - Encourages organic growth

**Success Metrics:**
- 20+ active project listings
- 100+ student profiles
- 10+ successful matches in first month

### Phase 2: Growth Loop

**Virtuous Cycle:**
```
More Students → More Attractive for Project Leaders
       ↓
More Projects → More Attractive for Students
       ↓
   (Repeat)
```

**Expansion Strategies:**
1. **Cross-Disciplinary Growth**
   - Expand to business school (engineering students need business skills)
   - Expand to design schools (startups need designers)
   - Market the cross-pollination benefit

2. **Word-of-Mouth**
   - Successful matches become advocates
   - Project teams recruit through platform
   - Network effects kick in

3. **University Partnerships**
   - Official endorsement from career centers
   - Integration with university project databases
   - Promoted through official channels

### Phase 3: Monetization & Scale

**Revenue Streams:**
1. **Company Job Postings**
   - Companies pay to post internships/paid projects
   - Access to verified student talent pool
   - Premium listings with better visibility

2. **Premium Features**
   - Enhanced student profiles (video intro, portfolio hosting)
   - Advanced analytics for recruiters
   - Priority support

3. **University Partnerships**
   - Official integration fees
   - Dedicated instances for specific universities
   - White-label solutions

**Geographic Strategy:**
- Stay focused on Stockholm
- Go deep, not wide
- Become THE platform for Stockholm universities
- Network effects are local

---

## MVP Scope & Mockup Requirements

### Primary Goal
Present to university startup department for:
- Support in hiring team members
- Financial backing/resources
- Validation of concept
- Access to university networks

### MVP Must-Have Features

**Functional (Working):**
1. Landing page with clear value prop
2. Sign-up flow with role selection
3. Student profile creation and editing
4. Project browsing with basic filters
5. Project detail page
6. Application submission
7. Basic dashboard showing user's projects

**Visual Only (Mockup/Coming Soon):**
1. Recruiter browse students feature
2. Project workspace collaboration features
3. Internal messaging
4. Advanced analytics
5. Recommendation engine

### Key Screens for Mockup

**Pre-Login Flow:**
1. Landing page (hero, value prop, CTA)
2. Public project listings
3. Sign-up with role selection
4. Email verification screen

**Student Flow:**
1. Dashboard (project overview, Vercel-style)
2. Profile editor (LinkedIn-style)
3. Browse projects with filters
4. Project detail page with "Apply" button
5. Application confirmation

**Recruiter Flow:**
1. Dashboard with posted projects
2. Create/post project form
3. Browse students (with mock data)
4. View student profile
5. Application review interface

**Project Workspace:**
1. Project home page
2. Members list with management controls
3. Sidebar navigation with "coming soon" badges
4. Owner vs participant view difference

### Features to Mark "Coming Soon"
- Internal messaging system
- Custom application forms
- Advanced filtering and recommendation algorithms
- Analytics dashboard
- File sharing and collaborative tools
- Mobile application
- Real-time notifications
- Project templates

---

## Open Questions & Future Discussions

### Product Questions
1. **Dual Roles:** Should users be able to be both student and recruiter simultaneously?
   - Current thinking: Yes, many students create projects while also looking
   - Need to design dashboard that accommodates both
   
2. **Application Process:** Custom forms vs standardized?
   - MVP: Standardized (just send profile)
   - Future: Let project owners create custom questions

3. **Profile Quality:** How to incentivize keeping profiles up-to-date?
   - Reminders? Badges? Profile completion percentage?

4. **Search Algorithm:** What makes a "good match"?
   - Skills overlap? Availability? Past project success?

### Technical Questions
1. **Database Choice:** Supabase vs Vercel Postgres vs other?
2. **Authentication:** Supabase Auth vs Clerk vs NextAuth?
3. **Real-time Features:** How to implement chat/notifications efficiently?
4. **File Storage:** Where to store profile pictures, portfolios?

### Business Questions
1. **Moderation:** How to handle inappropriate content or spam?
   - User reporting system?
   - Admin review process?
   
2. **Success Metrics:** How to measure platform success?
   - Number of matches?
   - Project completion rate?
   - User satisfaction?
   
3. **Project Lifecycle:** What happens to completed projects?
   - Archive? Keep visible? Use for recommendations?

4. **Pricing Strategy:** When and how to monetize?
   - Keep free for students/university projects?
   - Charge companies only?

---

## Timeline & Milestones

### Current Phase: Pre-MVP Development
**Status:** Architecture planning complete, ready to build

**Immediate Next Steps:**
1. Initialize Next.js project with chosen tech stack
2. Set up project structure (route groups, folders)
3. Build static mockup pages (no backend)
4. Create visual designs for all key screens
5. Prepare presentation materials

**Target:** MVP mockup ready in 2-3 weeks

### Milestone 1: MVP Presentation
**Goal:** Present to university startup department

**Deliverables:**
- Working mockup (frontend only, mock data)
- Product demo video
- Business plan overview
- Ask: Team expansion support, funding, university partnership

**Target Date:** TBD (4-6 weeks from now)

### Milestone 2: Functional MVP
**Goal:** Launch to first cohort of users

**Features:**
- Full authentication
- Database connected
- Working application flow
- Email notifications
- 10-20 real projects posted

**Target:** 8-12 weeks after funding secured

### Milestone 3: Beta Launch
**Goal:** 100 students, 20 projects, 10 successful matches

**Additions:**
- Project workspace with basic features
- Analytics and admin panel
- Refined UX based on feedback

**Target:** 4-6 months

---

## Team & Resources

### Current Team
- 3 Co-founders
- Primary technical lead identified
- Using agentic coding for development acceleration

### Needed Roles (Post-Presentation)
- Additional developers (full-stack)
- UX/UI designer
- Marketing/growth person
- Content creator for social media
- University liaison / partnerships

### Resources Needed
- University startup department support
- Initial funding for hosting, tools
- Access to student organizations for marketing
- Faculty endorsements for credibility

---

## Success Criteria

### MVP Success (3 months)
- 100+ student profiles created
- 20+ active project listings
- 10+ successful matches (student joined project)
- 70%+ user satisfaction rating
- Positive feedback from university department

### Beta Success (6 months)
- 500+ students registered
- 50+ active projects
- 30+ successful matches
- Consistent weekly engagement
- University partnership secured

### Platform Success (12 months)
- 2,000+ students across multiple universities
- 200+ projects posted
- 100+ successful matches
- Revenue-generating (companies posting jobs)
- Recognized as go-to platform for Stockholm student projects

---

## Appendix

### Competitor Analysis
**Similar Platforms:**
- Handshake (US-focused, corporate jobs)
- LinkedIn (too broad, not project-focused)
- University-specific job boards (fragmented, outdated)
- Discord/Slack communities (unstructured, hard to discover)

**Our Advantage:**
- Stockholm-specific
- Project-focused (not just jobs)
- Two-way discovery
- Integrated collaboration
- Student-first design

### Key Risks & Mitigation

**Risk 1: Cold Start Problem**
- Mitigation: Pre-seed with projects before student launch

**Risk 2: Low Engagement**
- Mitigation: Focus on quality over quantity, active outreach

**Risk 3: Competing Platforms**
- Mitigation: Move fast, build network effects, university partnerships

**Risk 4: Technical Complexity**
- Mitigation: Phased approach, use proven tech, agentic development

---

## Contact & Feedback

**Project Repository:** [TODO: Add GitHub link]  
**Documentation:** See `/docs` folder for detailed specs  
**Team Contact:** [TODO: Add contact info]

---

*This document is a living document and will be updated as the project evolves.*
