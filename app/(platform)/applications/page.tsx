"use client"

import { useApplications } from "@/components/application-provider"
import { KanbanBoard } from "@/components/kanban/board"

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

                <div className="h-[calc(100vh-250px)] w-full">
                    {applications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            You haven't applied to any projects yet.
                        </div>
                    ) : (
                        <KanbanBoard readOnly={true} />
                    )}
                </div>
            </div>
        </div>
    )
}
