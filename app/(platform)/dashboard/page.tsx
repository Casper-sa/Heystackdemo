import Dashboard from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-8 bg-background min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
            <Dashboard />
        </div>
    );
}
