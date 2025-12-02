import * as React from "react"

import { cn } from "@/lib/utils"

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card/60 backdrop-blur-xl text-card-foreground flex flex-col gap-6 rounded-xl border border-border/50 py-6 shadow-sm hover:border-primary/50 hover:shadow-[0_0_20px_-5px_oklch(var(--primary)/0.3)] transition-all duration-300",
                className
            )}
            {...props}
        />
    )
}

export { GlassCard }
