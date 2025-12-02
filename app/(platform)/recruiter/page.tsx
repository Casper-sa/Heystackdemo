import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RecruiterPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <h1 className="text-4xl font-bold">Recruiter Dashboard</h1>
            <p className="text-xl text-muted-foreground">Post a Project - Coming Soon</p>
            <Link href="/">
                <Button variant="outline">Back to Home</Button>
            </Link>
        </div>
    );
}
