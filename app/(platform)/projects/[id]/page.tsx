"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, Github, CheckCircle2, Circle, Clock } from "lucide-react"
import Link from "next/link"
import { useApplications } from "@/components/application-provider"
import { ApplicationDialog } from "@/components/application-dialog"
import { useState } from "react"
import { MOCK_PROJECTS } from "@/lib/data/mock-projects"

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
        repo: "#",
        tasks: []
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
                        {project.isMember ? (
                            <Button asChild>
                                <Link href={`/projects/${project.id}/workspace`}>
                                    Open Workspace
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                disabled={isApplied}
                                onClick={() => setIsDialogOpen(true)}
                            >
                                {isApplied ? "Applied" : "Apply Now"}
                            </Button>
                        )}
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

                    {project.tasks && project.tasks.length > 0 && (
                        <div className="p-6 border rounded-xl bg-card shadow-sm">
                            <h3 className="font-semibold mb-4 flex items-center">
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                                Current Tasks
                            </h3>
                            <div className="space-y-3">
                                {project.tasks.map(task => (
                                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                        {task.status === "Done" ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                        ) : task.status === "In Progress" ? (
                                            <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                                        ) : (
                                            <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        )}
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{task.title}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">{task.status}</span>
                                                {task.assignee && (
                                                    <span className="text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded border">
                                                        {task.assignee.split(" ").map(n => n[0]).join("")}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
