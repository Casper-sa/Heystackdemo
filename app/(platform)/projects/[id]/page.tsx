"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useApplications } from "@/components/application-provider"
import { ApplicationDialog } from "@/components/application-dialog"
import { useState } from "react"

// Mock Data (Ideally this would come from a shared store or API)
const MOCK_PROJECTS = [
    {
        id: 1,
        title: "AI Study Buddy",
        description: "An intelligent study companion that helps students organize their schedule and summarizes lecture notes.",
        tags: ["AI", "React", "Python"],
        members: 3,
        repo: "github.com/casper/ai-study-buddy",
        longDescription: "This project aims to leverage Large Language Models to create a personalized study assistant. It features automatic summarization of lecture recordings, flashcard generation, and a smart scheduling system that adapts to the student's learning pace."
    },
    {
        id: 2,
        title: "Campus Marketplace",
        description: "A platform for students to buy and sell textbooks, furniture, and electronics securely within the university.",
        tags: ["Web", "Next.js", "Stripe"],
        members: 5,
        repo: "github.com/casper/campus-marketplace",
        longDescription: "A secure, student-only marketplace that verifies university credentials. Features include integrated payments via Stripe, in-app messaging, and a reputation system to ensure safe transactions."
    },
    // ... add other projects if needed for consistency
]

export default function ProjectDetailsPage() {
    const params = useParams()
    const projectId = Number(params.id)
    const project = MOCK_PROJECTS.find(p => p.id === projectId) || {
        id: projectId,
        title: "Unknown Project",
        description: "Project details not found.",
        longDescription: "",
        tags: [],
        members: 0,
        repo: "#"
    }

    const { hasApplied } = useApplications()
    const isApplied = hasApplied(projectId)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/browse" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Browse
                </Link>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            View Repo
                        </Button>
                        <Button
                            disabled={isApplied}
                            onClick={() => setIsDialogOpen(true)}
                        >
                            {isApplied ? "Applied" : "Apply Now"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {project.longDescription || project.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {project.tags.map(tag => (
                                <div key={tag} className="p-4 border rounded-lg bg-muted/30">
                                    <span className="font-medium">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="font-semibold mb-4 flex items-center">
                            <Users className="mr-2 h-5 w-5" />
                            Team Members
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    AL
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Alice Lovelace</p>
                                    <p className="text-xs text-muted-foreground">Project Lead</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    AT
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Alan Turing</p>
                                    <p className="text-xs text-muted-foreground">Backend Dev</p>
                                </div>
                            </div>
                            {/* Placeholder for more members */}
                            {project.members > 2 && (
                                <div className="text-sm text-muted-foreground pt-2">
                                    + {project.members - 2} more members
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 border rounded-xl bg-card shadow-sm">
                        <h3 className="font-semibold mb-4 flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Project Status
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">Active</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Started</span>
                                <span>2 weeks ago</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Open Roles</span>
                                <span>2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ApplicationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                projectId={projectId}
                projectTitle={project.title}
            />
        </div>
    )
}
