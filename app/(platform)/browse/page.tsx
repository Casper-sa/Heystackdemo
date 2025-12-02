import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function BrowsePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Browse Projects</h1>
                    <p className="text-muted-foreground">
                        Discover exciting student projects at KTH
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-10"
                    />
                </div>

                {/* Placeholder Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>Project {i}</CardTitle>
                                <CardDescription>
                                    This is a placeholder for project {i}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Project details and description will appear here once the browse functionality is fully implemented.
                                </p>
                                <Button variant="outline" size="sm" className="w-full btn-accent-custom border-0">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-8 text-center p-6 border rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">
                        Full browse functionality coming soon. This is a temporary placeholder page.
                    </p>
                </div>
            </div>
        </div>
    );
}
