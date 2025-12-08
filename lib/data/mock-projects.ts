
export interface ProjectTask {
    id: number;
    title: string;
    status: "To Do" | "In Progress" | "Done";
    assignee?: string;
}

export interface Activity {
    id: string;
    user: { name: string; avatar?: string; initials: string };
    action: "pushed" | "commented" | "uploaded" | "joined" | "completed" | "created" | "deployed";
    target: string;
    timestamp: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    members: number;
    repo: string;
    longDescription: string;
    tasks: ProjectTask[];
    activity?: Activity[];
    isMember?: boolean;
}

export const MOCK_PROJECTS: Project[] = [
    {
        id: 1,
        title: "AI Study Buddy",
        description: "An intelligent study companion that helps students organize their schedule and summarizes lecture notes.",
        tags: ["AI", "React", "Python"],
        members: 3,
        repo: "github.com/casper/ai-study-buddy",
        longDescription: "This project aims to leverage Large Language Models to create a personalized study assistant. It features automatic summarization of lecture recordings, flashcard generation, and a smart scheduling system that adapts to the student's learning pace.",
        tasks: [
            { id: 1, title: "Implement lecture summarization API", status: "In Progress", assignee: "Alice Lovelace" },
            { id: 2, title: "Design user dashboard", status: "Done", assignee: "Alan Turing" },
            { id: 3, title: "Integrate calendar API", status: "To Do" }
        ],
        activity: [
            { id: "1", user: { name: "Alice Lovelace", initials: "AL" }, action: "pushed", target: "feat/summarization-api", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() }, // 30 mins ago
            { id: "2", user: { name: "Alan Turing", initials: "AT" }, action: "completed", target: "Design user dashboard", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }, // 2 hours ago
            { id: "3", user: { name: "Casper", initials: "CA" }, action: "commented", target: "Great progress on the UI!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() }, // 5 hours ago
            { id: "4", user: { name: "Alice Lovelace", initials: "AL" }, action: "uploaded", target: "architecture-diagram.png", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
            { id: "5", user: { name: "System", initials: "SYS" }, action: "created", target: "Project", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() }, // 2 days ago
        ],
        isMember: true
    },
    {
        id: 2,
        title: "Campus Marketplace",
        description: "A platform for students to buy and sell textbooks, furniture, and electronics securely within the university.",
        tags: ["Web", "Next.js", "Stripe"],
        members: 5,
        repo: "github.com/casper/campus-marketplace",
        longDescription: "A secure, student-only marketplace that verifies university credentials. Features include integrated payments via Stripe, in-app messaging, and a reputation system to ensure safe transactions.",
        tasks: [
            { id: 1, title: "Setup Stripe Connect", status: "In Progress", assignee: "Bob Jones" },
            { id: 2, title: "Create product listing page", status: "Done", assignee: "Alice Smith" },
            { id: 3, title: "Implement user verification", status: "To Do" }
        ],
        activity: [
            { id: "1", user: { name: "Bob Jones", initials: "BJ" }, action: "commented", target: "Stripe verification is tricky.", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
            { id: "2", user: { name: "Alice Smith", initials: "AS" }, action: "pushed", target: "fix/listing-layout", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
        ],
        isMember: false
    },
    // ... add other projects if needed for consistency
]
