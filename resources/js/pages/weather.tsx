import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    Search, 
    Star, 
    X, 
    Thermometer, 
    Droplets, 
    Wind, 
    Gauge, 
    MapPin,
    Cloud
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WeatherIcon } from '@/components/weather-icon';
import { WeatherSkeleton, FavoritesSkeleton } from '@/components/weather-skeleton';
import { WeatherWelcome } from '@/components/weather-welcome';
import ErrorBoundary from '@/components/error-boundary';

interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    wind: {
        speed: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
}

interface AQIData {
    data: {
        current: {
            pollution: {
                aqius: number;
            };
        };
    };
}

interface Favorite {
    id: number;
    city: string;
    country?: string;
}

interface WeatherPageProps {
    weather?: WeatherData;
    aqi?: AQIData;
    favorites: Favorite[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const getAQIStatus = (aqiValue: number) => {
    if (aqiValue <= 50) {
        return {
            label: 'Good',
            color: 'text-green-500',
            bgColor: 'bg-green-500',
            description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
        };
    } else if (aqiValue <= 100) {
        return {
            label: 'Moderate',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500',
            description: 'Air quality is acceptable; however, some pollutants may be a concern for a small number of people.'
        };
    } else if (aqiValue <= 150) {
        return {
            label: 'Unhealthy for Sensitive Groups',
            color: 'text-orange-500',
            bgColor: 'bg-orange-500',
            description: 'Members of sensitive groups may experience health effects.'
        };
    } else if (aqiValue <= 200) {
        return {
            label: 'Unhealthy',
            color: 'text-red-500',
            bgColor: 'bg-red-500',
            description: 'Everyone may begin to experience health effects.'
        };
    } else if (aqiValue <= 300) {
        return {
            label: 'Very Unhealthy',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500',
            description: 'Health warnings of emergency conditions.'
        };
    } else {
        return {
            label: 'Hazardous',
            color: 'text-red-700',
            bgColor: 'bg-red-700',
            description: 'Health alert: everyone may experience more serious health effects.'
        };
    }
};

export default function WeatherPage({ weather, aqi, favorites, flash }: WeatherPageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchForm = useForm({
        city: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        router.post('/weather', searchForm.data, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (errors) => {
                setError(errors.city || 'An error occurred');
                setIsLoading(false);
            },
        });
    };

    const handleFavoriteClick = (city: string) => {
        setIsLoading(true);
        setError(null);
        
        // Use Inertia router to navigate to the weather page with the city parameter
        router.get(`/?city=${encodeURIComponent(city)}`, {}, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (errors) => {
                setError('City not found');
                setIsLoading(false);
            },
        });
    };

    const handleAddFavorite = () => {
        if (!weather) return;
        
        router.post('/favorites', {
            city: weather.name,
            country: weather.sys.country || '',
        });
    };

    const handleRemoveFavorite = (id: number) => {
        if (confirm('Remove this city from favorites?')) {
            router.delete(`/favorites/${id}`);
        }
    };

    return (
        <ErrorBoundary>
            <Head title="Weather Dashboard" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar - Favorites */}
                        <aside className="lg:col-span-1">
                            <Card className="h-fit">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                        <Star className="w-5 h-5" />
                                        Favorites
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <FavoritesSkeleton />
                                    ) : favorites.length > 0 ? (
                                        <div className="space-y-3">
                                            {favorites.map((favorite) => (
                                                <div
                                                    key={favorite.id}
                                                    className="group flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors"
                                                >
                                                    <button
                                                        onClick={() => handleFavoriteClick(favorite.city)}
                                                        className="flex-1 text-left hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                                                    >
                                                        <div className="font-medium">{favorite.city}</div>
                                                        {favorite.country && (
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {favorite.country}
                                                            </div>
                                                        )}
                                                    </button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveFavorite(favorite.id)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p>No favorites yet</p>
                                            <p className="text-sm">Search for a city to add it to favorites</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main Content */}
                        <main className="lg:col-span-3 space-y-6">
                            {/* Header */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                        <Cloud className="w-6 h-6" />
                                        Weather Dashboard
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Flash Messages */}
                                    {flash?.success && (
                                        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                                            {flash.success}
                                        </div>
                                    )}
                                    {flash?.error && (
                                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                            {flash.error}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                            {error}
                                        </div>
                                    )}

                                    {/* Search Form */}
                                    <form onSubmit={handleSearch} className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter city name..."
                                            value={searchForm.data.city}
                                            onChange={(e) => searchForm.setData('city', e.target.value)}
                                            className="flex-1"
                                            disabled={isLoading}
                                        />
                                        <Button type="submit" disabled={isLoading}>
                                            <Search className="w-4 h-4 mr-2" />
                                            Search
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Weather Display */}
                            {isLoading ? (
                                <WeatherSkeleton />
                            ) : weather ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Current Weather */}
                                    <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-0">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                                        <MapPin className="w-5 h-5" />
                                                        {weather.name}
                                                        {weather.sys.country && (
                                                            <Badge variant="secondary" className="ml-2">
                                                                {weather.sys.country}
                                                            </Badge>
                                                        )}
                                                    </h2>
                                                    <p className="text-indigo-100 capitalize">
                                                        {weather.weather[0].description}
                                                    </p>
                                                </div>
                                                <div className="text-4xl">
                                                    <WeatherIcon 
                                                        weatherMain={weather.weather[0].main}
                                                        weatherDescription={weather.weather[0].description}
                                                        size="xl"
                                                        className="text-white"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="text-5xl font-bold my-6">
                                                {Math.round(weather.main.temp)}°C
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 text-sm text-indigo-100">
                                                <div className="flex items-center gap-2">
                                                    <Thermometer className="w-4 h-4" />
                                                    <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Droplets className="w-4 h-4" />
                                                    <span>Humidity: {weather.main.humidity}%</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Wind className="w-4 h-4" />
                                                    <span>Wind: {Math.round(weather.wind.speed * 3.6 * 10) / 10} km/h</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Gauge className="w-4 h-4" />
                                                    <span>Pressure: {weather.main.pressure} hPa</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Air Quality */}
                                    {aqi?.data && (
                                        <Card>
                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                    <Wind className="w-5 h-5" />
                                                    Air Quality Index (AQI)
                                                </h3>
                                                
                                                {(() => {
                                                    const aqiValue = aqi.data.current.pollution.aqius;
                                                    const aqiStatus = getAQIStatus(aqiValue);
                                                    return (
                                                        <>
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className={cn("text-5xl font-bold", aqiStatus.color)}>
                                                                    {aqiValue}
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                        US AQI
                                                                    </div>
                                                                    <div className={cn("font-medium", aqiStatus.color)}>
                                                                        {aqiStatus.label}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                                                                <div
                                                                    className={cn("h-2.5 rounded-full", aqiStatus.bgColor)}
                                                                    style={{ width: `${Math.min(100, (aqiValue / 3))}%` }}
                                                                />
                                                            </div>
                                                            
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                {aqiStatus.description}
                                                            </p>
                                                        </>
                                                    );
                                                })()}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ) : (
                                <WeatherWelcome />
                            )}

                            {/* Add to Favorites Button */}
                            {weather && !isLoading && (
                                <Card>
                                    <CardContent className="p-6">
                                        <Button onClick={handleAddFavorite} className="w-full">
                                            <Star className="w-4 h-4 mr-2" />
                                            Add to Favorites
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4" />
                            <p className="text-gray-700 dark:text-gray-200">Loading weather data...</p>
                        </div>
                    </Card>
                </div>
            )}
        </ErrorBoundary>
    );
} 