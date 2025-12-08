"use client"

import { PortfolioItem } from "@/lib/data/mock-talent"
import { PortfolioItemCard } from "./portfolio-item"
import { PortfolioDialog } from "./portfolio-dialog"
import { PortfolioUploadDialog } from "./portfolio-upload-dialog"
import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioGridProps {
    items: PortfolioItem[]
    isEditable?: boolean
}

export function PortfolioGrid({ items: initialItems, isEditable = false }: PortfolioGridProps) {
    const [items, setItems] = useState(initialItems)
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    const handleItemClick = (item: PortfolioItem) => {
        setSelectedItem(item)
        setIsDialogOpen(true)
    }

    const handleUpload = (newItem: PortfolioItem) => {
        setItems([newItem, ...items])
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] p-1">
                {isEditable && (
                    <div
                        onClick={() => setIsUploadOpen(true)}
                        className={cn(
                            "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/10 hover:bg-muted/30 transition-all cursor-pointer h-full col-span-1 row-span-1"
                        )}
                    >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">Add New Item</h3>
                        <p className="text-sm text-muted-foreground">Upload image or video</p>
                    </div>
                )}

                {items.map((item) => (
                    <PortfolioItemCard key={item.id} item={item} onClick={handleItemClick} />
                ))}
            </div>

            <PortfolioDialog
                item={selectedItem}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />

            <PortfolioUploadDialog
                open={isUploadOpen}
                onOpenChange={setIsUploadOpen}
                onUpload={handleUpload}
            />
        </div>
    )
}
