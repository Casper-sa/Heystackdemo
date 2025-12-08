import Link from "next/link"
import { Bell, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { NavBarWrapper } from "@/components/nav-bar-wrapper"
import { NavbarSettings } from "@/components/navbar-settings"
import { HaystackLogo } from "@/components/haystack-logo"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"

import { TaskProvider } from "@/components/task-provider"
import { ProjectProvider } from "@/components/project-provider"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProjectProvider>
            <TaskProvider>
                <div className="min-h-screen flex flex-col relative">
                    {/* Top Navbar */}
                    <NavBarWrapper className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-95 px-4 lg:px-6 h-14 flex items-center">
                        <div className="mr-4 hidden md:flex">
                            <Link href="/" className="mr-6 flex items-center space-x-2">
                                <span className="hidden font-bold sm:inline-block">
                                    HeyStack
                                </span>
                                <HaystackLogo className="h-6 w-6 text-primary" />
                            </Link>
                        </div>
                        <div className="flex-1" />
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-6">
                            <Link
                                href="/dashboard"
                                className="transition-colors hover:text-foreground/80 text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/browse"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Browse Projects
                            </Link>
                            <Link
                                href="/talent"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Browse Talent
                            </Link>
                        </nav>
                        <nav className="flex items-center space-x-2">
                            <Button size="sm" className="hidden sm:flex">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                            </Button>
                            <NotificationsDropdown />
                            <NavbarSettings />
                            <ThemeToggle />
                            <UserNav />
                        </nav>
                    </NavBarWrapper>
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </TaskProvider>
        </ProjectProvider>
    )
}
