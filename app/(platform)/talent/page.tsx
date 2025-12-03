"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, GraduationCap } from "lucide-react"
import { useUser } from "@/components/user-provider"

// Mock Data
const MOCK_TALENT = [
    {
        id: 1,
        name: "Alice Smith",
        major: "Computer Science",
        location: "Stockholm, Sweden",
        skills: ["React", "TypeScript", "Node.js"]
    },
    {
        id: 2,
        name: "Bob Jones",
        major: "Interaction Design",
        location: "Kista, Sweden",
        skills: ["Figma", "UI/UX", "Prototyping"]
    },
    {
        id: 3,
        name: "Charlie Brown",
        major: "Electrical Engineering",
        location: "Stockholm, Sweden",
        skills: ["IoT", "Embedded C", "PCB Design"]
    },
    {
        id: 4,
        name: "Diana Prince",
        major: "Business Administration",
        location: "Solna, Sweden",
        skills: ["Marketing", "Strategy", "Public Speaking"]
    },
    {
        id: 5,
        name: "Evan Wright",
        major: "Data Science",
        location: "Stockholm, Sweden",
        skills: ["Python", "Machine Learning", "SQL"]
    },
    {
        id: 6,
        name: "Fiona Green",
        major: "Architecture",
        location: "Stockholm, Sweden",
        skills: ["3D Modeling", "AutoCAD", "Rendering"]
    }
]

export default function BrowseTalentPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const { user } = useUser()

    const userCard = {
        id: 0,
        name: user.name,
        major: "Computer Science", // Default for now
        location: "Stockholm, Sweden", // Default for now
        skills: user.skills.split(",").map(s => s.trim()).filter(Boolean),
        isUser: true
    }

    const allTalent = [userCard, ...MOCK_TALENT]

    // Extract all unique skills
    const allSkills = Array.from(new Set(allTalent.flatMap(student => student.skills))).sort()

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        )
    }

    const filteredTalent = allTalent.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(skill => student.skills.includes(skill))

        return matchesSearch && matchesSkills
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Browse Talent</h1>
                    <p className="text-muted-foreground">
                        Connect with talented students at KTH
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search students by name, major, or skills..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Skill Filters */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                        {allSkills.map(skill => (
                            <Badge
                                key={skill}
                                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/90 transition-colors"
                                onClick={() => toggleSkill(skill)}
                            >
                                {skill}
                            </Badge>
                        ))}
                        {selectedSkills.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSkills([])}
                                className="ml-2 h-6 px-2 text-xs"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTalent.map((student) => (
                        <ShadowGlassCard key={student.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                            {/* @ts-ignore */}
                            {student.isUser && (
                                <div className="absolute top-0 right-0 p-2">
                                    <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">You</Badge>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle>{student.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" />
                                            {student.major}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        {student.location}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {student.skills.map(skill => (
                                                <Badge key={skill} variant="secondary">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" className="w-full btn-accent-custom border-0">
                                        View Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </ShadowGlassCard>
                    ))}
                    {filteredTalent.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No students found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
