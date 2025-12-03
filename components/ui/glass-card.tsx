import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.ComponentProps<typeof Card> {
    children: React.ReactNode
    className?: string
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <Card
                ref={ref}
                className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    // Light Mode (Cloud Vibe): Whiter, softer, stronger blur
                    "bg-white/40 backdrop-blur-xl border-white/20 shadow-sm hover:shadow-md hover:bg-white/50",
                    // Dark Mode (Space Vibe): Darker, more transparent, lighter blur to see stars
                    "dark:bg-slate-900/20 dark:backdrop-blur-md dark:border-white/10 dark:hover:bg-slate-900/30 dark:hover:border-white/20",
                    // Brand glow on hover (subtle)
                    "hover:border-primary/30",
                    className
                )}
                {...props}
            >
                {children}
            </Card>
        )
    }
)
GlassCard.displayName = "GlassCard"
