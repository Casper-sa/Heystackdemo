"use client"

import { useEffect, useRef, useState } from "react"

export interface Point {
    x: number
    y: number
}

export interface Stroke {
    points: Point[]
    color: string
    width: number
}

export function useWhiteboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("#000000")
    const [tool, setTool] = useState<"pencil" | "eraser">("pencil")

    // Store strokes for potential undo/redo or syncing
    const strokesRef = useRef<Stroke[]>([])
    const currentStrokeRef = useRef<Stroke | null>(null)

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setIsDrawing(true)
        ctx.beginPath()
        ctx.moveTo(x, y)

        const strokeColor = tool === "eraser" ? "#ffffff" : color
        const strokeWidth = tool === "eraser" ? 20 : 2

        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        currentStrokeRef.current = {
            points: [{ x, y }],
            color: strokeColor,
            width: strokeWidth
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ctx.lineTo(x, y)
        ctx.stroke()

        if (currentStrokeRef.current) {
            currentStrokeRef.current.points.push({ x, y })
        }
    }

    const stopDrawing = () => {
        if (!isDrawing) return
        setIsDrawing(false)

        if (currentStrokeRef.current) {
            strokesRef.current.push(currentStrokeRef.current)
            currentStrokeRef.current = null
        }
    }

    const clearBoard = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        strokesRef.current = []
    }

    // Handle resizing
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const parent = canvas.parentElement
        if (parent) {
            canvas.width = parent.clientWidth
            canvas.height = parent.clientHeight
        }
    }, [])

    return {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        color,
        setColor,
        tool,
        setTool,
        clearBoard
    }
}
