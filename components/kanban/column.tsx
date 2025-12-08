import { Droppable } from "@hello-pangea/dnd"
import { KanbanCard } from "./card"
import { Application } from "@/components/application-provider"

interface KanbanColumnProps {
    status: Application["status"]
    applications: Application[]
    isDragDisabled?: boolean
}

const statusColors = {
    Pending: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
    Reviewing: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    Accepted: "bg-green-500/10 border-green-500/20 text-green-500",
    Rejected: "bg-red-500/10 border-red-500/20 text-red-500",
}

const statusLabels = {
    Pending: "Applied",
    Reviewing: "In Review",
    Accepted: "Accepted",
    Rejected: "Rejected",
}

export function KanbanColumn({ status, applications, isDragDisabled }: KanbanColumnProps) {
    return (
        <div className="flex flex-col h-full min-w-[280px] w-80 rounded-xl bg-muted/30 border border-border/50 p-2">
            <div className={`mb-3 p-3 rounded-lg border flex items-center justify-between ${statusColors[status]}`}>
                <h3 className="font-semibold text-sm">{statusLabels[status]}</h3>
                <span className="text-xs font-mono bg-background/50 px-2 py-0.5 rounded-full">
                    {applications.length}
                </span>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 overflow-y-auto px-1 transition-colors rounded-lg ${snapshot.isDraggingOver ? "bg-muted/50" : ""
                            }`}
                    >
                        {applications.map((app, index) => (
                            <KanbanCard key={app.id} application={app} index={index} isDragDisabled={isDragDisabled} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
} 
