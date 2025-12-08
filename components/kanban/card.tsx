import { Draggable } from "@hello-pangea/dnd"
import { Application } from "@/components/application-provider"
import { ShadowGlassCard } from "@/components/shadow-glass-card"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { format } from "date-fns"
import { GripVertical } from "lucide-react"

interface KanbanCardProps {
    application: Application
    index: number
    isDragDisabled?: boolean
}

export function KanbanCard({ application, index, isDragDisabled }: KanbanCardProps) {
    return (
        <Draggable draggableId={application.id} index={index} isDragDisabled={isDragDisabled}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`mb-3 ${snapshot.isDragging ? "opacity-75 rotate-2 scale-105" : ""}`}
                    style={provided.draggableProps.style}
                >
                    <ShadowGlassCard className={`h-full transition-all ${!isDragDisabled ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary/20" : ""}`}>
                        {!isDragDisabled && (
                            <div {...provided.dragHandleProps} className="absolute right-2 top-2 text-muted-foreground/50 hover:text-foreground">
                                <GripVertical className="h-4 w-4" />
                            </div>
                        )}
                        <CardHeader className="p-4 pt-3">
                            <CardTitle className="text-base pr-4 line-clamp-1" title={application.projectTitle}>
                                {application.projectTitle}
                            </CardTitle>
                            <CardDescription className="text-xs">
                                {format(new Date(application.appliedDate), "MMM d")}
                            </CardDescription>
                            {application.coverLetter && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                                    {application.coverLetter}
                                </p>
                            )}
                        </CardHeader>
                    </ShadowGlassCard>
                </div>
            )}
        </Draggable>
    )
}
