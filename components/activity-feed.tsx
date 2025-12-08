"use client"

import { Activity } from "@/lib/data/mock-projects"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GitCommit, MessageSquare, Upload, UserPlus, CheckCircle2, Rocket, Clock, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ActivityFeedProps {
    initialActivities?: Activity[]
    className?: string
}

const ACTION_ICONS = {
    pushed: GitCommit,
    commented: MessageSquare,
    uploaded: Upload,
    joined: UserPlus,
    completed: CheckCircle2,
    created: Rocket,
    deployed: Zap,
}

const ACTION_COLORS = {
    pushed: "text-blue-500 bg-blue-500/10",
    commented: "text-yellow-500 bg-yellow-500/10",
    uploaded: "text-purple-500 bg-purple-500/10",
    joined: "text-green-500 bg-green-500/10",
    completed: "text-green-500 bg-green-500/10",
    created: "text-primary bg-primary/10",
    deployed: "text-orange-500 bg-orange-500/10",
}

export function ActivityFeed({ initialActivities = [], className }: ActivityFeedProps) {
    const [activities, setActivities] = useState<Activity[]>(initialActivities)

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            // 30% chance to add a new activity every check
            if (Math.random() > 0.7) {
                const actions: Activity["action"][] = ["pushed", "commented", "uploaded", "completed"]
                const users = [
                    { name: "Alice Lovelace", initials: "AL" },
                    { name: "Alan Turing", initials: "AT" },
                    { name: "Casper", initials: "CA" },
                    { name: "System", initials: "SYS" }
                ]
                const targets = [
                    "feat/new-button",
                    "Looks good to me!",
                    "main.tsx",
                    "Bug fix #123",
                    "Updated documentation"
                ]

                const randomAction = actions[Math.floor(Math.random() * actions.length)]
                const randomUser = users[Math.floor(Math.random() * users.length)]
                const randomTarget = targets[Math.floor(Math.random() * targets.length)]

                const newActivity: Activity = {
                    id: Math.random().toString(36).substr(2, 9),
                    user: randomUser,
                    action: randomAction,
                    target: randomTarget,
                    timestamp: new Date().toISOString()
                }

                setActivities(prev => [newActivity, ...prev].slice(0, 10)) // Keep last 10
            }
        }, 15000) // Check every 15 seconds for a "live" feel

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={cn("p-6 border rounded-xl bg-card shadow-sm h-full", className)}>
            <h3 className="font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Activity Feed
            </h3>
            <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-6 pl-2">
                    {activities.map((item, index) => {
                        const Icon = ACTION_ICONS[item.action]
                        return (
                            <div key={item.id} className="relative flex gap-4 w-full">
                                {/* Connecting Line */}
                                {index !== activities.length - 1 && (
                                    <div className="absolute left-[19px] top-10 h-full w-[2px] bg-border/50" />
                                )}

                                <div className="relative z-10">
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center border-2 border-background shadow-sm", ACTION_COLORS[item.action])}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="flex-1 pt-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="text-sm font-medium truncate">
                                            <span className="text-foreground">{item.user.name}</span>
                                            <span className="text-muted-foreground font-normal"> {item.action} </span>
                                            <span className="text-foreground font-medium">{item.target}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
