"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CardColorWheel() {
    const { cardHue, setCardHue, cardVibrancy, setCardVibrancy } = useColorScheme()
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const size = 150
    const radius = size / 2

    // Draw the color wheel
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, size, size)

        // Draw color wheel
        for (let angle = 0; angle < 360; angle++) {
            const startAngle = (angle - 90) * (Math.PI / 180)
            const endAngle = (angle + 1 - 90) * (Math.PI / 180)

            ctx.beginPath()
            ctx.moveTo(radius, radius)
            ctx.arc(radius, radius, radius, startAngle, endAngle)
            ctx.closePath()
            // Use current vibrancy for preview (light mode card color)
            ctx.fillStyle = `oklch(1 ${cardVibrancy} ${angle})`
            ctx.fill()
        }

        // Draw indicator at current hue position
        const indicatorAngle = (cardHue - 90) * (Math.PI / 180)
        const indicatorX = radius + (radius * 0.7) * Math.cos(indicatorAngle)
        const indicatorY = radius + (radius * 0.7) * Math.sin(indicatorAngle)

        // Draw white circle with black border as indicator
        ctx.beginPath()
        ctx.arc(indicatorX, indicatorY, 6, 0, 2 * Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.stroke()
    }, [cardHue, cardVibrancy, size, radius])

    const handleInteraction = React.useCallback(
        (clientX: number, clientY: number) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = clientX - rect.left - radius
            const y = clientY - rect.top - radius

            // Calculate angle from center
            let angle = Math.atan2(y, x) * (180 / Math.PI)
            angle = (angle + 90 + 360) % 360

            setCardHue(Math.round(angle))
        },
        [radius, setCardHue]
    )

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true)
        handleInteraction(e.clientX, e.clientY)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDragging) {
            handleInteraction(e.clientX, e.clientY)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    // Touch events
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        setIsDragging(true)
        const touch = e.touches[0]
        handleInteraction(touch.clientX, touch.clientY)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (isDragging && e.touches.length > 0) {
            const touch = e.touches[0]
            handleInteraction(touch.clientX, touch.clientY)
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    React.useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false)
        const handleGlobalTouchEnd = () => setIsDragging(false)

        if (isDragging) {
            window.addEventListener("mouseup", handleGlobalMouseUp)
            window.addEventListener("touchend", handleGlobalTouchEnd)
        }

        return () => {
            window.removeEventListener("mouseup", handleGlobalMouseUp)
            window.removeEventListener("touchend", handleGlobalTouchEnd)
        }
    }, [isDragging])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-muted transition-all shadow-sm"
                    style={{ backgroundColor: `oklch(1 ${cardVibrancy} ${cardHue})` }}
                    title="Card Color Settings"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-64" align="center">
                <DropdownMenuLabel>Card Color</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex flex-col gap-4 py-2">
                    {/* Hue Wheel */}
                    <div className="flex justify-center">
                        <canvas
                            ref={canvasRef}
                            width={size}
                            height={size}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            className="cursor-pointer rounded-full shadow-sm"
                            style={{ width: `${size}px`, height: `${size}px`, touchAction: 'none' }}
                        />
                    </div>

                    {/* Vibrancy Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Vibrancy</span>
                            <span>{Math.round(cardVibrancy * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="0.5"
                            step="0.005"
                            value={cardVibrancy}
                            onChange={(e) => setCardVibrancy(parseFloat(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

