"use client"

import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { Application, useApplications } from "@/components/application-provider"
import { KanbanColumn } from "./column"

const COLUMNS: Application["status"][] = ["Pending", "Reviewing", "Accepted", "Rejected"]

export function KanbanBoard({ readOnly = false }: { readOnly?: boolean }) {
    const { applications, updateApplicationStatus } = useApplications()

    const onDragEnd = (result: DropResult) => {
        if (readOnly) return
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // We only persist the status change, we don't handle reordering within columns 
        // because the provider just filters by status. To support reorder we'd need a more complex data model.
        if (destination.droppableId !== source.droppableId) {
            updateApplicationStatus(draggableId, destination.droppableId as Application["status"])
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full gap-6 overflow-x-auto pb-4 items-start justify-start">
                {COLUMNS.map((status) => {
                    const columnApps = applications.filter((app) => app.status === status)
                    return <KanbanColumn key={status} status={status} applications={columnApps} isDragDisabled={readOnly} />
                })}
            </div>
        </DragDropContext>
    )
}
