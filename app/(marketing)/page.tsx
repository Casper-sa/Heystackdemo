import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavBarWrapper } from "@/components/nav-bar-wrapper";
import { GradientBackground } from "@/components/gradient-background";
import { NavbarSettings } from "@/components/navbar-settings";


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <GradientBackground />
      {/* Navbar Placeholder */}
      <NavBarWrapper className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">HeyStack</span>
        </Link>
        <div className="flex-1" />
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/browse">
            Find Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/recruiter">
            Post Project
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
          <NavbarSettings />
          <ThemeToggle />
        </nav>
      </NavBarWrapper>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect with Student Projects at KTH
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The central hub for finding collaborators, joining exciting initiatives, and showcasing your work to the university community.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/browse">
                  <Button size="lg" className="h-11 px-8">
                    Find Projects
                  </Button>
                </Link>
                <Link href="/recruiter">
                  <Button variant="outline" size="lg" className="h-11 px-8 btn-accent-custom border-0">
                    Post a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
