# HeyStack - Developer Overview

**Version:** 2.0 (Lean)  
**Last Updated:** 2024-11-22  
**Reference:** See `heystack_architecture.md` for technical implementation details.

---

## 1. System Summary
HeyStack is a two-sided marketplace connecting students with university projects, featuring an integrated collaboration workspace for accepted teams.

**Core Modules:**
1.  **Marketplace (Discovery):** Public listings, student profiles, application system.
2.  **Collaboration (Workspace):** Private project areas for team management and tools.

---

## 2. User Roles & Permissions

| Role | Permissions |
| :--- | :--- |
| **Student** | Create profile, browse projects, apply, create own projects, join workspaces. |
| **Recruiter** | Post projects, browse student profiles, manage applications, manage owned workspaces. |
| **Project Owner** | Full admin control over specific project workspace (add/remove members). |
| **Member** | Read/Write access within specific project workspace. |

*Note: Users can hold multiple roles (e.g., a student can also be a recruiter/project owner).*

---

## 3. Feature Specifications (MVP)

### A. Public / Marketing (Unauthenticated)
*   **Landing Page:** Hero section, value prop, public project listings (blurred/limited view).
*   **Project Listings:** Job-board style cards.
*   **Auth:** Sign up/Login with university email verification.

### B. Student Experience
*   **Dashboard (`/dashboard`):**
    *   Overview of owned projects, joined projects, and pending applications.
*   **Profile (`/profile`):**
    *   LinkedIn-style professional profile.
    *   **Fields:** Education, Skills (Hard/Soft), Experience, Portfolio, Availability status.
*   **Browse Projects (`/browse`):**
    *   **Filters:** Skills, Project Type (Research, Startup, Competition), Time Commitment, Duration.
    *   **Action:** "Apply" button (sends profile to owner).

### C. Recruiter Experience
*   **Dashboard:** View posted projects, status of applications.
*   **Post Project (`/recruiter/post`):**
    *   **Fields:** Title, Description, Skills, Time Commitment, Duration, Type, Compensation.
*   **Browse Students (`/recruiter/browse`):**
    *   Filterable directory of student profiles (MVP: Mockup/Visual only).
*   **Application Management:**
    *   List applicants per project.
    *   Actions: Accept (adds to workspace), Reject.

### D. Project Workspace (`/project/[id]`)
*   **Access:** Restricted to Owners and Accepted Members.
*   **Project Home:** Description, team roster, status.
*   **Member Management:**
    *   Owner: Add/Remove members, change roles.
    *   Member: View roster.
*   **Future Placeholders:** Chat, Mindmap, Files, Tasks (marked "Coming Soon").

---

## 4. Data Entities (High Level)

### Project
*   **Types:** Research, Student Startup, Competition Team, Course Project.
*   **Attributes:** Title, Description, Skills[], TimeCommitment, Duration, Compensation, Status.

### User (Student/Recruiter)
*   **Attributes:** Name, University Email, Program, GraduationYear, Bio, Skills[], Experience[], Availability.

### Application
*   **Attributes:** StudentID, ProjectID, Status (Pending, Accepted, Rejected), Timestamp.

---

## 5. MVP Scope & Priorities

**Functional (Must Work):**
1.  Auth flow (Sign up/Login).
2.  Student Profile creation/editing.
3.  Project creation & browsing.
4.  Application submission & status tracking.
5.  Basic Dashboard.

**Visual Only (Mockup/Static):**
1.  Recruiter "Browse Students" search.
2.  Advanced Workspace tools (Chat, Files, etc.).
3.  Analytics & Recommendations.
