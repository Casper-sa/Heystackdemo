"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GlassCard } from "@/components/ui/glass-card"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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

    const filteredProjects = MOCK_PROJECTS.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

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

                {/* Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
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
                                <Button variant="outline" size="sm" className="w-full btn-accent-custom border-0">
                                    View Details
                                </Button>
                            </CardContent>
                        </ShadowGlassCard>
                    ))}
                    {filteredProjects.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No projects found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
