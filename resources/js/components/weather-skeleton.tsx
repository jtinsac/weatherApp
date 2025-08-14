import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function WeatherSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Weather Skeleton */}
            <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48 bg-white/20" />
                            <Skeleton className="h-4 w-32 bg-white/20" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                    </div>
                    
                    <Skeleton className="h-16 w-24 mb-6 bg-white/20" />
                    
                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full bg-white/20" />
                                <Skeleton className="h-4 w-24 bg-white/20" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Air Quality Skeleton */}
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-48" />
                        
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-12 w-16" />
                            <div className="text-right space-y-1">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                        </div>
                        
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function FavoritesSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-6 w-6 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
} 