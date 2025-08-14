import { 
    Sun, 
    Cloud, 
    CloudRain, 
    CloudSnow, 
    CloudLightning, 
    Eye,
    CloudFog,
    Wind
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
    weatherMain: string;
    weatherDescription?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const getWeatherIcon = (weatherMain: string, weatherDescription?: string) => {
    const main = weatherMain.toLowerCase();
    const desc = weatherDescription?.toLowerCase() || '';

    switch (main) {
        case 'clear':
            return Sun;
        case 'clouds':
            if (desc.includes('scattered') || desc.includes('broken')) {
                return Cloud;
            }
            return Cloud;
        case 'rain':
        case 'drizzle':
            return CloudRain;
        case 'snow':
            return CloudSnow;
        case 'thunderstorm':
            return CloudLightning;
        case 'mist':
        case 'fog':
        case 'haze':
            return CloudFog;
        case 'tornado':
        case 'squall':
            return Wind;
        default:
            return Eye;
    }
};

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    switch (size) {
        case 'sm':
            return 'w-4 h-4';
        case 'md':
            return 'w-6 h-6';
        case 'lg':
            return 'w-8 h-8';
        case 'xl':
            return 'w-12 h-12';
        default:
            return 'w-6 h-6';
    }
};

export function WeatherIcon({ 
    weatherMain, 
    weatherDescription, 
    size = 'md', 
    className 
}: WeatherIconProps) {
    const IconComponent = getWeatherIcon(weatherMain, weatherDescription);
    const sizeClasses = getSizeClasses(size);

    return (
        <IconComponent 
            className={cn(sizeClasses, className)} 
        />
    );
} 