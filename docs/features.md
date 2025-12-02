# HeyStack - Features

**Last Updated:** 2024-11-22  
**Status:** MVP Planning

---

## Feature Priority

- ✅ **MVP** - Must have for initial launch
- 🔄 **Post-MVP** - Next phase after initial launch
- 🔮 **Future** - Long-term enhancements

---

## Authentication & Onboarding

### ✅ University Email Verification
- Sign up requires university email (@kth.se, etc.)
- Email verification before accessing platform
- Ensures quality and trust in community

### ✅ Role Selection
- During signup, user selects role: Student or Recruiter
- Can switch/add role later (both roles simultaneously)
- Different onboarding flow per role

### ✅ Profile Setup
- Guided profile creation after signup
- Required fields vs optional
- Profile completion indicator

---

## Student Features

### Profile Management

#### ✅ Professional Profile
- LinkedIn-style layout
- Education background (university, major, graduation year)
- Skills (hard skills, soft skills, tools)
- Past projects and experience
- Portfolio links (GitHub, LinkedIn, personal site)
- Profile picture

#### ✅ Availability Toggle
- "Open to opportunities" on/off switch
- Set hours available per week
- Controls visibility in recruiter search

### Project Discovery

#### ✅ Browse Projects
- Job-board style project listings
- Grid/list view toggle
- Pagination or infinite scroll

#### ✅ Search & Filter
- Search by keyword
- Filter by:
  - Required skills
  - Project type
  - Time commitment
  - Compensation
  - Duration
  - Department/Faculty

#### ✅ Project Detail View
- Full project description
- Required and nice-to-have skills
- Time commitment and duration
- Team size needed
- Project owner info
- "Apply" button

#### ✅ Apply to Projects
- One-click apply (sends profile to owner)
- 🔄 Optional cover message
- Application confirmation

#### 🔄 Saved Projects
- Bookmark projects to review later
- Saved projects list in dashboard

#### 🔮 Project Recommendations
- Algorithm-based suggestions
- Based on skills, interests, availability

### Student Dashboard

#### ✅ Project Overview (Vercel-style)
- Projects you own
- Projects you're a member of
- Pending applications with status
- Quick actions (create project, browse)

#### ✅ Create New Project
- Students can initiate projects
- Post to find collaborators
- Same form as recruiters use

#### 🔄 Application Status Tracking
- View all applications
- Status: Pending, Accepted, Rejected
- Notification when status changes

---

## Recruiter Features

### Project Management

#### ✅ Post Project
- Detailed project form:
  - Title and description
  - Required skills (with levels)
  - Nice-to-have skills
  - Time commitment (hours/week)
  - Duration (fixed/ongoing)
  - Compensation (paid/unpaid/credit)
  - Project type/category
  - Team size needed
- Draft and publish

#### ✅ Manage Projects
- View all posted projects
- Edit project details
- Mark project as closed/filled
- View project analytics (views, applications)

#### ✅ Review Applications
- List of applicants per project
- View student profiles
- Accept or reject applications
- 🔄 Request more information

### Student Discovery

#### ✅ Browse Students
- Directory of students with "open to opportunities" enabled
- Card view with key info

#### ✅ Filter Students
- Major/program
- Skills
- Graduation year
- Availability (hours/week)
- Project type preferences

#### 🔄 Invite Students
- Send project invitation to specific students
- Student receives notification

#### 🔮 Save/Bookmark Students
- Create talent pool for future projects

---

## Project Workspace

### Access & Navigation

#### ✅ Project Home
- Project overview and description
- Team roster
- Quick stats
- Recent activity (future)

#### ✅ Project Sidebar
- Consistent navigation for all features
- Role-based visibility (owner tools)
- "Coming soon" badges for future features

### Team Management

#### ✅ View Members
- List of all team members
- Display role (owner, member)
- Member profile links

#### ✅ Add Members (Owner Only)
- Search and invite users
- Accept applications directly
- Add members without application

#### ✅ Remove Members (Owner Only)
- Remove team members from project
- Confirmation dialog

#### 🔄 Change Member Roles
- Promote member to co-owner
- Set custom roles (admin, contributor, viewer)

### Collaboration (Future)

#### 🔮 Project Chat
- Real-time team communication
- Thread-based conversations
- File attachments

#### 🔮 Mindmap/Whiteboard
- Collaborative idea mapping
- Visual brainstorming tool

#### 🔮 File Sharing
- Shared document repository
- Version control
- Organized folders

#### 🔮 Task Management
- Create and assign tasks
- Track progress
- Deadlines and milestones

#### 🔮 Shared Calendar
- Team availability
- Meeting scheduling
- Milestone tracking

---

## Communication & Notifications

### ✅ Email Notifications
- Application received
- Application status changed
- Invited to project
- Added to project workspace
- New member joined project

### 🔄 In-Platform Notifications
- Notification center
- Unread count badge
- Mark as read

### 🔄 Internal Messaging
- Direct messages between users
- Project-level messaging
- Email notifications for new messages

---

## Marketing Site (Pre-Login)

### ✅ Landing Page
- Hero section with value proposition
- Separate CTAs for students and recruiters
- Social proof (stats, testimonials)
- Feature highlights

### ✅ Public Project Listings
- Preview of available projects
- Requires login to view details
- Shows platform is active

### ✅ Sign Up Flow
- Role selection
- Email verification
- Profile setup wizard

---

## Admin & Platform

### 🔄 Admin Dashboard
- User statistics
- Project statistics
- Recent activity
- Moderation queue

### 🔄 Content Moderation
- Flag inappropriate projects/profiles
- Admin review system
- User reporting

### 🔮 Platform Analytics
- User engagement metrics
- Match success rate
- Popular skills/projects
- Growth trends

### 🔮 Email Management
- Customize notification emails
- Email templates
- Send announcements

---

## Search & Discovery

### 🔄 Advanced Search
- Combined search (projects + students)
- Saved searches
- Search history

### 🔮 Smart Matching
- ML-based recommendations
- Skill gap analysis
- Compatibility scoring

### 🔮 Tags & Categories
- Standardized skill tags
- Project categories/taxonomy
- Industry tags

---

## User Experience

### ✅ Responsive Design
- Mobile-friendly layouts
- Touch-optimized interactions
- Adaptive navigation

### ✅ Dark Mode Support
- System preference detection
- Manual toggle
- Consistent styling

### 🔄 Onboarding Tooltips
- First-time user guidance
- Feature discovery prompts
- Dismissible tips

### 🔮 Keyboard Shortcuts
- Power user features
- Quick navigation
- Search shortcut

---

## Integrations (Future)

### 🔮 Calendar Integration
- Google Calendar sync
- iCal export
- Availability checking

### 🔮 GitHub Integration
- Link repositories
- Display contributions
- Auto-update portfolio

### 🔮 LinkedIn Import
- Import profile data
- Sync experience
- Suggest skills

### 🔮 Google Forms
- Custom application forms
- Embedded forms in projects

---

## Security & Privacy

### ✅ Email Verification
- Prevent fake accounts
- University domain restriction

### 🔄 Privacy Controls
- Profile visibility settings
- Control what recruiters see
- Export personal data

### 🔄 Blocking/Reporting
- Block users
- Report inappropriate content
- Safety guidelines

### 🔮 Two-Factor Authentication
- Optional 2FA for security
- Recovery codes

---

## Notes

**MVP Focus:**
- Core marketplace functionality (browse, apply, post)
- Basic project workspace (view, manage members)
- Essential communication (email notifications)
- Clean, functional UI with mock features shown as "coming soon"

**Post-MVP Priority:**
- Application status tracking
- In-platform notifications
- Admin dashboard
- Enhanced student discovery

**Future Enhancements:**
- Real-time collaboration tools
- Advanced matching algorithms
- Third-party integrations
- Mobile app

---

## Feature Dependencies

Some features depend on technical decisions:
- **Real-time features** (chat, notifications) → Need WebSocket or SSE solution
- **File uploads** → Need storage solution (Supabase Storage, Uploadthing)
- **Email system** → Need email service (Resend, SendGrid)
- **Recommendations** → Need analytics and ML infrastructure

See ARCHITECTURE.md TODO section for pending technical decisions.
