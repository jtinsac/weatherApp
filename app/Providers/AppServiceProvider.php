<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register the weather helpers
        $this->app->singleton('weather.helpers', function ($app) {
            return new class($app) {
                public function getWeatherIcon($condition)
                {
                    $icons = [
                        'Clear' => '<i class="fas fa-sun text-yellow-300"></i>',
                        'Clouds' => '<i class="fas fa-cloud text-gray-300"></i>',
                        'Rain' => '<i class="fas fa-cloud-rain text-blue-400"></i>',
                        'Drizzle' => '<i class="fas fa-cloud-rain text-blue-300"></i>',
                        'Thunderstorm' => '<i class="fas fa-bolt text-purple-500"></i>',
                        'Snow' => '<i class="far fa-snowflake text-blue-100"></i>',
                        'Mist' => '<i class="fas fa-smog text-gray-400"></i>',
                        'Smoke' => '<i class="fas fa-smog text-gray-500"></i>',
                        'Haze' => '<i class="fas fa-smog text-gray-400"></i>',
                        'Dust' => '<i class="fas fa-wind text-yellow-300"></i>',
                        'Fog' => '<i class="fas fa-smog text-gray-300"></i>',
                        'Sand' => '<i class="fas fa-wind text-yellow-200"></i>',
                        'Ash' => '<i class="fas fa-fire text-orange-300"></i>',
                        'Squall' => '<i class="fas fa-wind text-blue-300"></i>',
                        'Tornado' => '<i class="fas fa-wind text-red-500"></i>',
                    ];
                    
                    return $icons[$condition] ?? '<i class="fas fa-cloud-sun text-gray-400"></i>';
                }

                public function getAqiStatus($aqi)
                {
                    if ($aqi <= 50) {
                        return [
                            'label' => 'Good',
                            'color' => 'text-green-500',
                            'bgColor' => 'bg-green-500',
                            'description' => 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
                        ];
                    } elseif ($aqi <= 100) {
                        return [
                            'label' => 'Moderate',
                            'color' => 'text-yellow-500',
                            'bgColor' => 'bg-yellow-500',
                            'description' => 'Air quality is acceptable; however, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
                        ];
                    } elseif ($aqi <= 150) {
                        return [
                            'label' => 'Unhealthy for Sensitive Groups',
                            'color' => 'text-orange-500',
                            'bgColor' => 'bg-orange-500',
                            'description' => 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
                        ];
                    } elseif ($aqi <= 200) {
                        return [
                            'label' => 'Unhealthy',
                            'color' => 'text-red-500',
                            'bgColor' => 'bg-red-500',
                            'description' => 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
                        ];
                    } elseif ($aqi <= 300) {
                        return [
                            'label' => 'Very Unhealthy',
                            'color' => 'text-purple-500',
                            'bgColor' => 'bg-purple-500',
                            'description' => 'Health alert: The risk of health effects is increased for everyone.'
                        ];
                    } else {
                        return [
                            'label' => 'Hazardous',
                            'color' => 'text-red-800',
                            'bgColor' => 'bg-red-800',
                            'description' => 'Health warning of emergency conditions: everyone is more likely to be affected.'
                        ];
                    }
                }
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register the @weatherIcon blade directive
        Blade::directive('weatherIcon', function ($expression) {
            return "<?php echo app('weather.helpers')->getWeatherIcon($expression); ?>";
        });

        // Share the helpers with all views
        view()->composer('*', function ($view) {
            $view->with('weatherHelpers', app('weather.helpers'));
        });
    }

    /**
     * Get weather icon based on weather condition
     */
    public function getWeatherIcon($condition): string
    {
        $icons = [
            'Clear' => '<i class="fas fa-sun text-yellow-300"></i>',
            'Clouds' => '<i class="fas fa-cloud text-gray-300"></i>',
            'Rain' => '<i class="fas fa-cloud-rain text-blue-400"></i>',
            'Drizzle' => '<i class="fas fa-cloud-rain text-blue-300"></i>',
            'Thunderstorm' => '<i class="fas fa-bolt text-purple-500"></i>',
            'Snow' => '<i class="far fa-snowflake text-blue-100"></i>',
            'Mist' => '<i class="fas fa-smog text-gray-400"></i>',
            'Smoke' => '<i class="fas fa-smog text-gray-500"></i>',
            'Haze' => '<i class="fas fa-smog text-gray-400"></i>',
            'Dust' => '<i class="fas fa-wind text-yellow-300"></i>',
            'Fog' => '<i class="fas fa-smog text-gray-300"></i>',
            'Sand' => '<i class="fas fa-wind text-yellow-200"></i>',
            'Ash' => '<i class="fas fa-smog text-gray-500"></i>',
            'Squall' => '<i class="fas fa-wind text-gray-400"></i>',
            'Tornado' => '<i class="fas fa-wind text-red-500"></i>'
        ];
        
        return $icons[$condition] ?? '<i class="fas fa-cloud-sun text-gray-400"></i>';
    }

    /**
     * Get AQI status information
     */
    public function getAqiStatus($aqi): array
    {
        if ($aqi <= 50) {
            return [
                'label' => 'Good',
                'color' => 'text-green-500',
                'bgColor' => 'bg-green-500',
                'description' => 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            ];
        } elseif ($aqi <= 100) {
            return [
                'label' => 'Moderate',
                'color' => 'text-yellow-500',
                'bgColor' => 'bg-yellow-500',
                'description' => 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.'
            ];
        } elseif ($aqi <= 150) {
            return [
                'label' => 'Unhealthy for Sensitive Groups',
                'color' => 'text-orange-500',
                'bgColor' => 'bg-orange-500',
                'description' => 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            ];
        } elseif ($aqi <= 200) {
            return [
                'label' => 'Unhealthy',
                'color' => 'text-red-500',
                'bgColor' => 'bg-red-500',
                'description' => 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            ];
        } elseif ($aqi <= 300) {
            return [
                'label' => 'Very Unhealthy',
                'color' => 'text-purple-500',
                'bgColor' => 'bg-purple-500',
                'description' => 'Health alert: everyone may experience more serious health effects.'
            ];
        } else {
            return [
                'label' => 'Hazardous',
                'color' => 'text-red-700',
                'bgColor' => 'bg-red-700',
                'description' => 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            ];
        }
    }
}
