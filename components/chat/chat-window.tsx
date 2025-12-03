"use client"

import { useEffect, useRef, useState } from "react"
import { ChatInput } from "./chat-input"
import { ChatMessage, Message } from "./chat-message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from "@/components/user-provider"

interface ChatWindowProps {
    projectId: number
}

export function ChatWindow({ projectId }: ChatWindowProps) {
    const { user } = useUser()
    const [messages, setMessages] = useState<Message[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    // Load messages from local storage
    useEffect(() => {
        const savedMessages = localStorage.getItem(`heystack-chat-${projectId}`)
        if (savedMessages) {
            const parsed = JSON.parse(savedMessages)
            // Convert string dates back to Date objects
            setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })))
        } else {
            // Initial mock message
            setMessages([
                {
                    id: "1",
                    sender: { name: "Alice", initials: "A" },
                    content: "Hey everyone! Welcome to the project workspace.",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
                    isMe: false
                }
            ])
        }
    }, [projectId])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: {
                name: user.name,
                initials: user.name.charAt(0).toUpperCase(),
                avatar: "/avatars/01.png" // Mock avatar
            },
            content,
            timestamp: new Date(),
            isMe: true
        }

        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        localStorage.setItem(`heystack-chat-${projectId}`, JSON.stringify(updatedMessages))

        // Simulate reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                sender: { name: "Bob", initials: "B" },
                content: "Sounds good! Let's get started.",
                timestamp: new Date(),
                isMe: false
            }
            const withReply = [...updatedMessages, reply]
            setMessages(withReply)
            localStorage.setItem(`heystack-chat-${projectId}`, JSON.stringify(withReply))
        }, 2000)
    }

    return (
        <div className="flex flex-col h-[600px] border rounded-lg bg-background/40 backdrop-blur-md overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-muted/30">
                <h3 className="font-semibold">Team Chat</h3>
                <p className="text-xs text-muted-foreground">3 members online</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col justify-end min-h-full">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    )
}
