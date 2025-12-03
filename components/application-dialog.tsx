"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useApplications } from "@/components/application-provider"

interface ApplicationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    projectId: number
    projectTitle: string
}

export function ApplicationDialog({ open, onOpenChange, projectId, projectTitle }: ApplicationDialogProps) {
    const [coverLetter, setCoverLetter] = useState("")
    const { applyToProject } = useApplications()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        applyToProject(projectId, projectTitle, coverLetter)
        onOpenChange(false)
        setCoverLetter("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apply to {projectTitle}</DialogTitle>
                    <DialogDescription>
                        Introduce yourself and explain why you'd be a good fit for this project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="cover-letter">Cover Letter</Label>
                        <Textarea
                            id="cover-letter"
                            placeholder="Hi, I'm interested in this project because..."
                            className="h-32"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Application</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
