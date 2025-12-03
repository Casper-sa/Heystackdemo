"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInputProps {
    onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage(message)
            setMessage("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-background/50 backdrop-blur-sm">
            <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </form>
    )
}
