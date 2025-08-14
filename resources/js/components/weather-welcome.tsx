import { Card, CardContent } from '@/components/ui/card';
import { Cloud, MapPin, Search } from 'lucide-react';

export function WeatherWelcome() {
    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 border-0">
            <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="flex justify-center">
                        <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                            <Cloud className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Welcome to Weather Dashboard
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Search for any city to get current weather conditions and air quality information.
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Search className="w-4 h-4" />
                        <span>Enter a city name above to get started</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mb-2">
                                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto" />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Current Weather</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Temperature, humidity, wind</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mb-2">
                                <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Air Quality</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">AQI and health information</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mb-2">
                                <Search className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Favorites</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Save your favorite cities</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 