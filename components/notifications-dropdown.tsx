"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock notifications data - replace with real data from your backend
const mockNotifications = [
    {
        id: 1,
        title: "New project match",
        description: "AI Research Assistant matches your skills",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "Application accepted",
        description: "You've been accepted to Web Development Project",
        time: "5 hours ago",
        read: false,
    },
    {
        id: 3,
        title: "New message",
        description: "John Doe sent you a message",
        time: "1 day ago",
        read: true,
    },
    {
        id: 4,
        title: "Project deadline",
        description: "Mobile App Project deadline is approaching",
        time: "2 days ago",
        read: true,
    },
]

export function NotificationsDropdown() {
    const unreadCount = mockNotifications.filter(n => !n.read).length

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                            {unreadCount} new
                        </Badge>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {mockNotifications.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
                        {mockNotifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                            >
                                <div className="flex items-start justify-between w-full gap-2">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {notification.title}
                                            {!notification.read && (
                                                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {notification.time}
                                </span>
                            </DropdownMenuItem>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                    </div>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center justify-center cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
