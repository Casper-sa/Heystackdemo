"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"
import { Palette } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ThemeGenerator() {
    const { brandHue, setBrandHue, vibrancy, setVibrancy } = useColorScheme()
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
            // Use current vibrancy for preview
            ctx.fillStyle = `oklch(0.6 ${vibrancy * 0.3} ${angle})`
            ctx.fill()
        }

        // Draw indicator at current hue position
        const indicatorAngle = (brandHue - 90) * (Math.PI / 180)
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
    }, [brandHue, vibrancy, size, radius])

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

            setBrandHue(Math.round(angle))
        },
        [radius, setBrandHue]
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

    const presets = [
        { name: "Ocean", hue: 210, vibrancy: 0.5 },
        { name: "Forest", hue: 140, vibrancy: 0.4 },
        { name: "Sunset", hue: 30, vibrancy: 0.6 },
        { name: "Berry", hue: 330, vibrancy: 0.5 },
        { name: "Slate", hue: 250, vibrancy: 0.1 },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                    <div
                        className="absolute inset-0 rounded-full opacity-20"
                        style={{ backgroundColor: `oklch(0.6 ${vibrancy * 0.3} ${brandHue})` }}
                    />
                    <Palette className="h-5 w-5" style={{ color: `oklch(0.6 ${vibrancy * 0.3} ${brandHue})` }} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-64" align="center">
                <DropdownMenuLabel>Theme Generator</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex flex-col gap-4 py-2">
                    {/* Brand Color Wheel */}
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
                            <span>{Math.round(vibrancy * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={vibrancy}
                            onChange={(e) => setVibrancy(parseFloat(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <DropdownMenuSeparator />

                    {/* Presets */}
                    <div className="grid grid-cols-3 gap-2">
                        {presets.map(preset => (
                            <Button
                                key={preset.name}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => {
                                    setBrandHue(preset.hue)
                                    setVibrancy(preset.vibrancy)
                                }}
                            >
                                {preset.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
