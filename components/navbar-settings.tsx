"use client"

import * as React from "react"
import { GripHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeGenerator } from "./theme-generator"
import { GradientOriginPicker } from "./gradient-origin-picker"

export function NavbarSettings() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    title="Appearance Settings"
                >
                    <GripHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-auto" align="center">
                <DropdownMenuLabel>Appearance Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex gap-3 py-2 items-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">Theme Color</span>
                        <ThemeGenerator />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">Gradient</span>
                        <GradientOriginPicker />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
