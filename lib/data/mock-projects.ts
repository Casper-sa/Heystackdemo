
export interface ProjectTask {
    id: number;
    title: string;
    status: "To Do" | "In Progress" | "Done";
    assignee?: string;
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
        isMember: false
    },
    // ... add other projects if needed for consistency
]
