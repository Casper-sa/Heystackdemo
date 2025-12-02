"use client"

import * as React from "react"
import { useColorScheme } from "./color-scheme-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Crosshair } from "lucide-react"

export function GradientOriginPicker() {
    const { setGradientOriginX, setGradientOriginY, gradientSize, setGradientSize } = useColorScheme()
    const [isPicking, setIsPicking] = React.useState(false)
    const [dropdownOpen, setDropdownOpen] = React.useState(false)

    const handlePickClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsPicking(true)
        setDropdownOpen(false) // Close dropdown when entering pick mode
        // Change cursor to crosshair
        document.body.style.cursor = "crosshair"
    }

    const skipNextClickRef = React.useRef(false)

    React.useEffect(() => {
        if (!isPicking) return

        // Skip the first click (which is the button click)
        skipNextClickRef.current = true
        const timeoutId = setTimeout(() => {
            skipNextClickRef.current = false
        }, 100)

        const handleClick = (e: MouseEvent) => {
            if (skipNextClickRef.current) {
                skipNextClickRef.current = false
                return
            }

            // Calculate percentage position relative to viewport
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100

            setGradientOriginX(x)
            setGradientOriginY(y)
            setIsPicking(false)
            document.body.style.cursor = ""
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsPicking(false)
                document.body.style.cursor = ""
            }
        }

        window.addEventListener("click", handleClick, true)
        window.addEventListener("keydown", handleEscape)

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener("click", handleClick, true)
            window.removeEventListener("keydown", handleEscape)
            document.body.style.cursor = ""
        }
    }, [isPicking, setGradientOriginX, setGradientOriginY])

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={isPicking ? "ring-2 ring-primary" : ""}
                    title="Gradient Settings"
                >
                    <Crosshair className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-64" align="center">
                <DropdownMenuLabel>Gradient Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex flex-col gap-4 py-2">
                    {/* Pick Origin Button */}
                    <Button
                        variant={isPicking ? "default" : "outline"}
                        size="sm"
                        onClick={handlePickClick}
                        className={isPicking ? "ring-2 ring-primary" : ""}
                    >
                        {isPicking ? "Click anywhere to set origin (ESC to cancel)" : "Pick Origin Position"}
                    </Button>

                    {/* Gradient Size Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Gradient Size</span>
                            <span>{Math.round(gradientSize)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={gradientSize}
                            onChange={(e) => setGradientSize(parseFloat(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <p className="text-xs text-muted-foreground">
                            Controls how large the center circle is before transitioning to outer color
                        </p>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

