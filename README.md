# Weather Dashboard

A modern, elegant weather dashboard built with Laravel, Inertia.js, React, and TypeScript. Get real-time weather information and air quality data for any city around the world.

## Features

- 🌤️ **Real-time Weather Data** - Current temperature, humidity, wind speed, and pressure
- 🌬️ **Air Quality Index** - AQI information with health recommendations
- ⭐ **Favorites System** - Save and quickly access your favorite cities
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- 📱 **Mobile Responsive** - Works perfectly on desktop and mobile devices
- ⚡ **Fast Performance** - Optimized with loading states and error handling

## Tech Stack

- **Backend**: Laravel 11 with PHP 8.2+
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Inertia.js for seamless SPA experience
- **Icons**: Lucide React for beautiful, consistent icons
- **APIs**: OpenWeatherMap for weather data, AirVisual for AQI

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure API keys**
   Add your API keys to the `.env` file:
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key
   OPENAIR_QUALITY_API_KEY=your_airvisual_api_key
   ```

6. **Database setup**
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run build
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   npm run dev
   ```

## API Keys Required

- **OpenWeatherMap API**: Get weather data for cities
  - Sign up at: https://openweathermap.org/api
  - Free tier available

- **AirVisual API**: Get air quality data
  - Sign up at: https://www.airvisual.com/api
  - Free tier available

## Usage

1. **Search for a city** - Enter any city name in the search bar
2. **View weather details** - See current conditions, temperature, humidity, wind, and pressure
3. **Check air quality** - View AQI with health recommendations
4. **Save favorites** - Click "Add to Favorites" to save cities for quick access
5. **Manage favorites** - View, click, or remove cities from your favorites list

## Project Structure

```
weather-dashboard/
├── app/
│   ├── Http/Controllers/
│   │   └── WeatherController.php    # Weather API logic
│   └── Models/
│       └── Favorite.php             # Favorites model
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── weather-icon.tsx     # Weather icon component
│   │   │   ├── weather-skeleton.tsx # Loading skeletons
│   │   │   ├── weather-welcome.tsx  # Welcome screen
│   │   │   └── error-boundary.tsx   # Error handling
│   │   └── pages/
│   │       └── weather.tsx          # Main weather page
│   └── css/
│       └── app.css                  # Tailwind styles
└── routes/
    └── web.php                      # Application routes
```

## Components

### WeatherIcon
Displays appropriate weather icons based on conditions (sun, cloud, rain, snow, etc.)

### WeatherSkeleton
Loading skeleton for weather data display

### FavoritesSkeleton
Loading skeleton for favorites list

### WeatherWelcome
Welcome screen shown when no weather data is available

### ErrorBoundary
Graceful error handling with user-friendly error messages

## Styling

The application uses a modern design system with:
- **Color Palette**: Indigo and blue gradients with proper contrast
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Dark Mode**: Full dark mode support with proper color schemes
- **Responsive**: Mobile-first design that works on all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 