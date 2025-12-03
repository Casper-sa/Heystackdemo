"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GlassCard } from "@/components/ui/glass-card"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ApplicationDialog } from "@/components/application-dialog"
import { useApplications } from "@/components/application-provider"
import { Badge } from "@/components/ui/badge"

// Mock Data
const MOCK_PROJECTS = [
    {
        id: 1,
        title: "AI Study Buddy",
        description: "An intelligent study companion that helps students organize their schedule and summarizes lecture notes.",
        tags: ["AI", "React", "Python"]
    },
    {
        id: 2,
        title: "Campus Marketplace",
        description: "A platform for students to buy and sell textbooks, furniture, and electronics securely within the university.",
        tags: ["Web", "Next.js", "Stripe"]
    },
    {
        id: 3,
        title: "Sustainable Garden Monitor",
        description: "IoT system to monitor soil moisture and sunlight for the campus community garden.",
        tags: ["IoT", "C++", "Hardware"]
    },
    {
        id: 4,
        title: "VR Campus Tour",
        description: "Virtual reality experience for prospective students to explore the campus from anywhere.",
        tags: ["VR", "Unity", "3D"]
    },
    {
        id: 5,
        title: "Blockchain Voting",
        description: "Secure and transparent voting system for student council elections.",
        tags: ["Blockchain", "Solidity", "Web3"]
    },
    {
        id: 6,
        title: "Music Collab App",
        description: "Find musicians on campus to jam with or form a band.",
        tags: ["Mobile", "Flutter", "Audio"]
    }
]

export default function BrowsePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedProject, setSelectedProject] = useState<{ id: number, title: string } | null>(null)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const { hasApplied } = useApplications()

    // Extract all unique tags
    const allTags = Array.from(new Set(MOCK_PROJECTS.flatMap(project => project.tags))).sort()

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const filteredProjects = MOCK_PROJECTS.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag))

        return matchesSearch && matchesTags
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Browse Projects</h1>
                    <p className="text-muted-foreground">
                        Discover exciting student projects at KTH
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search projects by title, description, or tags..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Tag Filters */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                        {allTags.map(tag => (
                            <Badge
                                key={tag}
                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/90 transition-colors"
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                        {selectedTags.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTags([])}
                                className="ml-2 h-6 px-2 text-xs"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => {
                        const isApplied = hasApplied(project.id)
                        return (
                            <ShadowGlassCard key={project.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>
                                        {project.tags.join(", ")}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            View Details
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            disabled={isApplied}
                                            onClick={() => setSelectedProject({ id: project.id, title: project.title })}
                                        >
                                            {isApplied ? "Applied" : "Apply"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </ShadowGlassCard>
                        )
                    })}
                    {filteredProjects.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No projects found matching your criteria
                        </div>
                    )}
                </div>
            </div>

            <ApplicationDialog
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
                projectId={selectedProject?.id || 0}
                projectTitle={selectedProject?.title || ""}
            />
        </div>
    )
}
