import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
            }

            return (
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardContent className="p-6 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
                                    Something went wrong
                                </h2>
                                <p className="text-red-700 dark:text-red-300 max-w-md">
                                    We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
                                </p>
                            </div>
                            
                            <div className="flex gap-3">
                                <Button onClick={this.resetError} variant="outline">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                                <Button onClick={() => window.location.reload()}>
                                    Refresh Page
                                </Button>
                            </div>
                            
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-4 text-left w-full max-w-md">
                                    <summary className="cursor-pointer text-sm text-red-600 dark:text-red-400 font-medium">
                                        Error Details (Development)
                                    </summary>
                                    <pre className="mt-2 p-3 bg-red-100 dark:bg-red-900/50 rounded text-xs text-red-800 dark:text-red-200 overflow-auto">
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 