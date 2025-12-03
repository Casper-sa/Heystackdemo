import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Message {
    id: string
    sender: {
        name: string
        avatar?: string
        initials: string
    }
    content: string
    timestamp: Date
    isMe: boolean
}

interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div className={cn("flex gap-3 mb-4", message.isMe ? "flex-row-reverse" : "flex-row")}>
            <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>{message.sender.initials}</AvatarFallback>
            </Avatar>
            <div className={cn(
                "flex flex-col max-w-[70%]",
                message.isMe ? "items-end" : "items-start"
            )}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                        {message.sender.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className={cn(
                    "rounded-2xl px-4 py-2 text-sm",
                    message.isMe
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                )}>
                    {message.content}
                </div>
            </div>
        </div>
    )
}
