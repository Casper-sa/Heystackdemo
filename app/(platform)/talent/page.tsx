import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, GraduationCap } from "lucide-react";

export default function BrowseTalentPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Browse Talent</h1>
                    <p className="text-muted-foreground">
                        Connect with talented students at KTH
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search students by skills, major, or interests..."
                        className="pl-10"
                    />
                </div>

                {/* Placeholder Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle>Student {i}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" />
                                            Computer Science
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        Stockholm, Sweden
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary">React</Badge>
                                            <Badge variant="secondary">TypeScript</Badge>
                                            <Badge variant="secondary">Node.js</Badge>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        Student profile details will appear here once the browse talent functionality is fully implemented.
                                    </p>

                                    <Button variant="outline" size="sm" className="w-full btn-accent-custom border-0">
                                        View Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-8 text-center p-6 border rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">
                        Full browse talent functionality coming soon. This is a temporary placeholder page.
                    </p>
                </div>
            </div>
        </div>
    );
}
