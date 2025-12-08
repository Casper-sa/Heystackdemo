"use client"

import { PortfolioItem } from "@/lib/data/mock-talent"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Eye } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"

interface PortfolioItemCardProps {
    item: PortfolioItem
    onClick: (item: PortfolioItem) => void
}

export function PortfolioItemCard({ item, onClick }: PortfolioItemCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Map size to grid spans (Tailwind classes)
    const sizeClasses = {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 row-span-1 md:col-span-2",
        large: "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
        tall: "col-span-1 row-span-2",
        wide: "col-span-1 row-span-1 md:col-span-2",
    }

    return (
        <motion.div
            className={cn("relative rounded-xl cursor-pointer group perspective-1000", sizeClasses[item.size])}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            onClick={() => onClick(item)}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"
                style={{ transform: "translateZ(50px)" }}
            />

            <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted border border-white/10 shadow-xl">
                <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-8 h-8 text-white mx-auto mb-2 opacity-80" />
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-white/70 text-sm">{item.tags[0]}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
