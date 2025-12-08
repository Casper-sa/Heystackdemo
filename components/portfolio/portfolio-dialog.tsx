"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PortfolioItem } from "@/lib/data/mock-talent"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface PortfolioDialogProps {
    item: PortfolioItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PortfolioDialog({ item, open, onOpenChange }: PortfolioDialogProps) {
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[400px] md:h-[600px] bg-black/50">
                        {/* In a real app, use the actual URL. For mock, we trust the external URL or local path */}
                        <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-center space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold mb-2">{item.title}</DialogTitle>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </DialogHeader>
                        <DialogDescription className="text-lg leading-relaxed text-muted-foreground">
                            {item.description}
                        </DialogDescription>

                        <div className="pt-6 border-t border-border/50">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Size: {item.size}</span>
                                <span>Type: {item.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
