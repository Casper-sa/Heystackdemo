"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function SunMoonToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-14 h-8 rounded-full bg-muted" />
    }

    const isDark = theme === "dark"

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative w-16 h-8 rounded-full p-1 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary
                ${isDark ? "bg-slate-800" : "bg-sky-300"}
            `}
            aria-label="Toggle theme"
        >
            {/* Sun/Moon Icon Container */}
            <div
                className={`
                    absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 ease-in-out flex items-center justify-center
                    ${isDark ? "translate-x-8 bg-slate-100" : "translate-x-0 bg-yellow-300"}
                `}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-slate-800" />
                ) : (
                    <Sun className="w-4 h-4 text-orange-500" />
                )}
            </div>

            {/* Clouds/Stars Background Elements (Optional decorative touches) */}
            <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-full transition-opacity duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}>
                {/* Stars */}
                <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                <div className="absolute top-5 left-5 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
                <div className="absolute top-3 left-7 w-1 h-1 bg-white rounded-full opacity-90" />
            </div>

            <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-full transition-opacity duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}>
                {/* Clouds */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60" />
                <div className="absolute top-4 right-4 w-4 h-2 bg-white rounded-full opacity-50" />
            </div>
        </button>
    )
}
