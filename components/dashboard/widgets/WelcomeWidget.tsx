import React from 'react';

interface WelcomeWidgetProps {
    name: string;
}

const WelcomeWidget: React.FC<WelcomeWidgetProps> = ({ name }) => {
    return (
        <div className="flex items-center justify-between h-full">
            <div>
                <h2 className="text-xl font-bold text-foreground">Welcome back, {name}!</h2>
                <p className="text-muted-foreground">Here is what's happening with your projects today.</p>
            </div>
        </div>
    );
};

export default WelcomeWidget;
