import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavBarWrapper } from "@/components/nav-bar-wrapper";
import { GradientBackground } from "@/components/gradient-background";
import { NavbarSettings } from "@/components/navbar-settings";


export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <GradientBackground />
            {/* Navbar */}
            <NavBarWrapper className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="/">
                    <span className="font-bold text-xl">HeyStack</span>
                </Link>
                <div className="flex-1" />
                <nav className="flex gap-4 sm:gap-6 items-center">
                    <Link href="/dashboard">
                        <Button size="sm">Login</Button>
                    </Link>
                    <NavbarSettings />
                    <ThemeToggle />
                </nav>
            </NavBarWrapper>

            <main className="flex-1 flex items-center justify-center">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center space-y-8 text-center max-w-2xl mx-auto">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Welcome to HeyStack
                            </h1>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Your central hub for connecting with student projects at KTH.
                                Sign in to access your dashboard and start collaborating.
                            </p>
                        </div>

                        <div className="w-full max-w-sm space-y-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/" className="font-medium hover:underline underline-offset-4">
                                    Learn more about HeyStack
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 HeyStack. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="/terms">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
