"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ChatWindow } from "@/components/chat/chat-window"
import { Whiteboard } from "@/components/whiteboard/whiteboard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, Github } from "lucide-react"
import Link from "next/link"

// Mock Data (Ideally this would come from a shared store or API)
const MOCK_PROJECTS = [
    {
        id: 1,
        title: "AI Study Buddy",
        description: "An intelligent study companion that helps students organize their schedule and summarizes lecture notes.",
        tags: ["AI", "React", "Python"],
        members: 3,
        repo: "github.com/casper/ai-study-buddy"
    },
    {
        id: 2,
        title: "Campus Marketplace",
        description: "A platform for students to buy and sell textbooks, furniture, and electronics securely within the university.",
        tags: ["Web", "Next.js", "Stripe"],
        members: 5,
        repo: "github.com/casper/campus-marketplace"
    },
    // ... add other projects if needed for consistency, but these are enough for demo
]

export default function ProjectWorkspacePage() {
    const params = useParams()
    const projectId = Number(params.id)
    const [activeTool, setActiveTool] = useState<"none" | "whiteboard" | "tasks" | "files">("none")

    const project = MOCK_PROJECTS.find(p => p.id === projectId) || {
        id: projectId,
        title: "Unknown Project",
        description: "Project details not found.",
        tags: [],
        members: 0,
        repo: "#"
    }

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-3.5rem)] flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    {activeTool !== "none" && (
                        <Button variant="ghost" size="sm" onClick={() => setActiveTool("none")}>
                            Close Tool
                        </Button>
                    )}
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
                        <p className="text-muted-foreground max-w-2xl">{project.description}</p>
                        <div className="flex gap-2 mt-4">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Github className="mr-2 h-4 w-4" />
                            Repository
                        </Button>
                        <Button variant="outline" size="sm">
                            <Users className="mr-2 h-4 w-4" />
                            {project.members} Members
                        </Button>
                    </div>
                </div>
            </div>

            {/* Workspace Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Main Content Area */}
                <div className="lg:col-span-2 h-full min-h-[500px]">
                    {activeTool === "none" ? (
                        <div className="h-full bg-muted/10 border rounded-lg p-6 flex items-center justify-center text-muted-foreground border-dashed">
                            <div className="text-center">
                                <p className="mb-4 text-lg font-medium">Workspace Tools</p>
                                <p className="text-sm mb-6">Select a tool to start collaborating with your team</p>
                                <div className="flex gap-4 mt-4 justify-center">
                                    <Button
                                        variant="outline"
                                        className="h-24 w-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-all"
                                        onClick={() => setActiveTool("whiteboard")}
                                    >
                                        <span className="text-2xl">🎨</span>
                                        Whiteboard
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-24 w-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-all"
                                        disabled
                                    >
                                        <span className="text-2xl">✅</span>
                                        Tasks
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-24 w-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-all"
                                        disabled
                                    >
                                        <span className="text-2xl">📂</span>
                                        Files
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : activeTool === "whiteboard" ? (
                        <div className="h-full border rounded-lg overflow-hidden shadow-sm">
                            <Whiteboard />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/10">
                            <p>Tool not implemented yet</p>
                        </div>
                    )}
                </div>

                {/* Chat Sidebar */}
                <div className="h-full">
                    <ChatWindow projectId={projectId} />
                </div>
            </div>
        </div>
    )
}
