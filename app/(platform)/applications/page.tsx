"use client"

import { useApplications } from "@/components/application-provider"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function ApplicationsPage() {
    const { applications } = useApplications()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">My Applications</h1>
                    <p className="text-muted-foreground">
                        Track the status of your project applications
                    </p>
                </div>

                <div className="grid gap-6">
                    {applications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            You haven't applied to any projects yet.
                        </div>
                    ) : (
                        applications.map((app) => (
                            <ShadowGlassCard key={app.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{app.projectTitle}</CardTitle>
                                            <CardDescription>
                                                Applied on {format(new Date(app.appliedDate), "PPP")}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={app.status === "Pending" ? "secondary" : "default"}>
                                            {app.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Cover Letter: </span>
                                        {app.coverLetter}
                                    </p>
                                </CardContent>
                            </ShadowGlassCard>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
