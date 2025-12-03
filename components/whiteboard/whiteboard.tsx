"use client"

import { useEffect, useState } from "react"
import { useWhiteboard } from "./use-whiteboard"
import { Button } from "@/components/ui/button"
import { Pencil, Eraser, Trash2, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Whiteboard() {
    const {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        color,
        setColor,
        tool,
        setTool,
        clearBoard
    } = useWhiteboard()

    // Mock Remote Cursor
    const [remoteCursor, setRemoteCursor] = useState<{ x: number, y: number } | null>(null)

    useEffect(() => {
        // Simulate remote user moving mouse
        const interval = setInterval(() => {
            const canvas = canvasRef.current
            if (!canvas) return

            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height

            // Smooth interpolation could be added here
            setRemoteCursor({ x, y })

            // Simulate random drawing occasionally
            if (Math.random() > 0.7) {
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.beginPath()
                    ctx.strokeStyle = "#ff0000" // Remote user is red
                    ctx.lineWidth = 2
                    ctx.moveTo(x, y)
                    ctx.lineTo(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10)
                    ctx.stroke()
                }
            }

        }, 2000)

        return () => clearInterval(interval)
    }, [canvasRef])

    return (
        <div className="relative w-full h-full bg-white rounded-lg overflow-hidden border shadow-sm">
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-md rounded-full px-4 py-2 flex items-center gap-4 border z-10">
                <div className="flex items-center gap-1 border-r pr-4">
                    <Button
                        variant={tool === "pencil" ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setTool("pencil")}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={tool === "eraser" ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setTool("eraser")}
                    >
                        <Eraser className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 border-r pr-4">
                    {["#000000", "#ef4444", "#3b82f6", "#22c55e"].map((c) => (
                        <button
                            key={c}
                            className={cn(
                                "w-6 h-6 rounded-full border-2 transition-all",
                                color === c && tool === "pencil" ? "border-primary scale-110" : "border-transparent hover:scale-105"
                            )}
                            style={{ backgroundColor: c }}
                            onClick={() => {
                                setColor(c)
                                setTool("pencil")
                            }}
                        />
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearBoard}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />

            {/* Remote Cursor */}
            {remoteCursor && (
                <div
                    className="absolute pointer-events-none transition-all duration-700 ease-in-out flex items-center gap-1"
                    style={{ left: remoteCursor.x, top: remoteCursor.y }}
                >
                    <MousePointer2 className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-xs bg-red-500 text-white px-1 rounded">Bob</span>
                </div>
            )}
        </div>
    )
}
