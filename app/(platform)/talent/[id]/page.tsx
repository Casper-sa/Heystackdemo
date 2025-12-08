"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, GraduationCap, Building2, Calendar, FolderKanban, ExternalLink, Code } from "lucide-react"
import { MOCK_TALENT, TalentProfile } from "@/lib/data/mock-talent"
import { useUser } from "@/components/user-provider"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"

export default function TalentProfilePage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useUser()
    const id = Number(params.id)

    let profile: TalentProfile | undefined

    if (id === 0) {
        profile = {
            id: 0,
            name: user.name,
            major: "Computer Science",
            location: "Stockholm, Sweden",
            skills: user.skills.split(",").map(s => s.trim()).filter(Boolean),
            bio: user.bio,
            isUser: true,
            experience: [], // Placeholder for user experience
            education: [],   // Placeholder for user education
            projects: []     // Placeholder for user projects
        }
    } else {
        profile = MOCK_TALENT.find(t => t.id === id)
    }

    if (!profile) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button
                variant="ghost"
                className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Browse Talent
            </Button>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Sidebar / Main Info */}
                <div className="md:col-span-1 space-y-6">
                    <ShadowGlassCard className="text-center">
                        <CardHeader>
                            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                                {profile.name.charAt(0)}
                            </div>
                            <CardTitle className="text-xl">{profile.name}</CardTitle>
                            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                                <GraduationCap className="h-4 w-4" />
                                {profile.major}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {profile.location}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full btn-accent-custom">Contact</Button>
                        </CardContent>
                    </ShadowGlassCard>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map(skill => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6 mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {profile.bio}
                                    </p>
                                </CardContent>
                            </Card>

                            {profile.projects && profile.projects.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Projects</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        {profile.projects.map((project, index) => (
                                            <div key={index} className="border rounded-lg p-4 space-y-2 hover:bg-accent/5 transition-colors">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FolderKanban className="h-4 w-4 text-primary" />
                                                        <h3 className="font-semibold">{project.name}</h3>
                                                    </div>
                                                    <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                                                        {project.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{project.description}</p>
                                                <div className="flex items-center justify-between text-sm pt-2">
                                                    <span className="text-muted-foreground">Role: <span className="font-medium text-foreground">{project.role}</span></span>
                                                    {project.link && (
                                                        <a href={project.link} className="flex items-center gap-1 text-primary hover:underline">
                                                            View Project <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {profile.experience && profile.experience.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {profile.experience.map((exp, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                                    <Building2 className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{exp.role}</h3>
                                                    <div className="text-sm text-muted-foreground mb-2">{exp.company} • {exp.duration}</div>
                                                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {profile.education && profile.education.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Education</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {profile.education.map((edu, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{edu.school}</h3>
                                                    <div className="text-sm text-muted-foreground">{edu.degree}</div>
                                                    <div className="text-sm text-muted-foreground">{edu.year}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="portfolio" className="mt-4">
                            {profile.portfolio && profile.portfolio.length > 0 ? (
                                <PortfolioGrid items={profile.portfolio} isEditable={profile.isUser} />
                            ) : (
                                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                                    <Code className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                                    <h3 className="text-lg font-semibold">No portfolio items yet</h3>
                                    <p className="text-muted-foreground mb-4">This user hasn't uploaded any work samples.</p>
                                    {profile.isUser && (
                                        <PortfolioGrid items={[]} isEditable={true} />
                                    )}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
