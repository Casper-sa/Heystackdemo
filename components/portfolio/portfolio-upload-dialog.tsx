"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useRef, ChangeEvent, DragEvent } from "react"
import { PortfolioItem } from "@/lib/data/mock-talent"
import { UploadCloud, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PortfolioUploadDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpload: (item: PortfolioItem) => void
}

export function PortfolioUploadDialog({ open, onOpenChange, onUpload }: PortfolioUploadDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<"image" | "video">("image")
    const [size, setSize] = useState<"small" | "medium" | "large" | "tall" | "wide">("medium")
    const [isLoading, setIsLoading] = useState(false)

    // File Upload State
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        // Simple validation
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.")
            return
        }
        setFile(file)
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
    }

    const removeFile = () => {
        setFile(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const onButtonClick = () => {
        inputRef.current?.click()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!previewUrl) {
            alert("Please upload an image.")
            return
        }

        setIsLoading(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newItem: PortfolioItem = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            url: previewUrl, // Use the object URL for local preview
            type,
            size,
            tags: ["New", "Upload"]
        }

        onUpload(newItem)
        setIsLoading(false)
        onOpenChange(false)

        // Reset form
        setTitle("")
        setDescription("")
        setType("image")
        setSize("medium")
        removeFile()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit} onDragEnter={handleDrag}>
                    <DialogHeader>
                        <DialogTitle>Add to Portfolio</DialogTitle>
                        <DialogDescription>
                            Upload an image to showcase your latest work.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Project Name"
                                required
                            />
                        </div>

                        {/* Dropzone */}
                        <div className="grid gap-2">
                            <Label>Image</Label>
                            <div
                                className={cn(
                                    "relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all",
                                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/5",
                                    previewUrl ? "border-transparent p-0 overflow-hidden" : "hover:bg-muted/10 cursor-pointer"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={!previewUrl ? onButtonClick : undefined}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleChange}
                                    accept="image/*"
                                />

                                {previewUrl ? (
                                    <>
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2 z-10">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8 rounded-full shadow-md"
                                                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">AVG, PNG, JPG (MAX. 800x400px)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select value={type} onValueChange={(v: any) => setType(v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="image">Image</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="size">Grid Size</Label>
                                <Select value={size} onValueChange={(v: any) => setSize(v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small (1x1)</SelectItem>
                                        <SelectItem value="medium">Medium (2x1)</SelectItem>
                                        <SelectItem value="large">Large (2x2)</SelectItem>
                                        <SelectItem value="tall">Tall (1x2)</SelectItem>
                                        <SelectItem value="wide">Wide (2x1)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell us about this project..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading || !previewUrl}>
                            {isLoading ? "Uploading..." : "Add to Portfolio"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
