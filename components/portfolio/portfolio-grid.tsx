"use client"

import { PortfolioItem } from "@/lib/data/mock-talent"
import { PortfolioItemCard } from "./portfolio-item"
import { PortfolioDialog } from "./portfolio-dialog"
import { useState } from "react"

interface PortfolioGridProps {
    items: PortfolioItem[]
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleItemClick = (item: PortfolioItem) => {
        setSelectedItem(item)
        setIsDialogOpen(true)
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] p-1">
                {items.map((item) => (
                    <PortfolioItemCard key={item.id} item={item} onClick={handleItemClick} />
                ))}
            </div>

            <PortfolioDialog
                item={selectedItem}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </div>
    )
}
