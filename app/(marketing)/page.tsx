"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavBarWrapper } from "@/components/nav-bar-wrapper";
import { NavbarSettings } from "@/components/navbar-settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import { useDynamicShadow } from "@/hooks/use-dynamic-shadow";

export default function LandingPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const findProjectsBtnRef = useRef<HTMLButtonElement>(null);
  const postProjectBtnRef = useRef<HTMLButtonElement>(null);

  const headingShadow = useDynamicShadow(headingRef as React.RefObject<HTMLElement>, { type: 'text', opacity: 0.1, blur: 5 });
  const findProjectsShadow = useDynamicShadow(findProjectsBtnRef as React.RefObject<HTMLElement>, { type: 'box' });
  const postProjectShadow = useDynamicShadow(postProjectBtnRef as React.RefObject<HTMLElement>, { type: 'box' });

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar Placeholder */}
      <NavBarWrapper className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">HeyStack</span>
        </Link>
        <div className="flex-1" />
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
          <NavbarSettings />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Student Name</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    student@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </NavBarWrapper>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  ref={headingRef}
                  style={headingShadow}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none transition-all duration-300"
                >
                  Connect with Student Projects at KTH
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The central hub for finding collaborators, joining exciting initiatives, and showcasing your work to the university community.
                </p>
              </div>
              <div className="space-x-4 flex items-center justify-center">
                <Link href="/browse">
                  <Button
                    ref={findProjectsBtnRef}
                    style={findProjectsShadow}
                    variant="outline"
                    className="h-11 px-6 text-base transition-all duration-300"
                  >
                    Find Projects
                  </Button>
                </Link>
                <Link href="/recruiter">
                  <Button
                    ref={postProjectBtnRef}
                    style={postProjectShadow}
                    variant="outline"
                    className="h-11 px-6 text-base transition-all duration-300"
                  >
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
