"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { useDynamicShadow } from "@/hooks/use-dynamic-shadow"

interface ShadowGlassCardProps extends React.ComponentProps<typeof GlassCard> { }

export function ShadowGlassCard({ style, ...props }: ShadowGlassCardProps) {
    const ref = React.useRef<HTMLDivElement>(null)
    const shadowStyle = useDynamicShadow(ref as React.RefObject<HTMLElement>)

    return (
        <GlassCard
            ref={ref}
            style={{ ...style, ...shadowStyle }}
            {...props}
        />
    )
}
