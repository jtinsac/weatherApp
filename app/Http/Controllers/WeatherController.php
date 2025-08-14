<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Favorite;
use Inertia\Inertia;

class WeatherController extends Controller
{
    // Show the page with optional default data + favorites list
    public function index(Request $request)
    {
        $favorites = Favorite::orderBy('city')->get();

        // Check if city is provided in query parameters
        $city = $request->query('city', 'Manila');
        $apiKey = env('OPENWEATHER_API_KEY');

        $weather = null;
        $aqi = null;

        if ($apiKey) {
            $wRes = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                'q'     => $city,
                'appid' => $apiKey,
                'units' => 'metric'
            ]);

            if ($wRes->ok()) {
                $weather = $wRes->json();

                // If you set OPENAIR_QUALITY_API_KEY, also fetch AQI
                if (env('OPENAIR_QUALITY_API_KEY') && isset($weather['coord'])) {
                    $aqiRes = Http::get('http://api.airvisual.com/v2/nearest_city', [
                        'lat' => $weather['coord']['lat'] ?? null,
                        'lon' => $weather['coord']['lon'] ?? null,
                        'key' => env('OPENAIR_QUALITY_API_KEY')
                    ]);

                    if ($aqiRes->ok()) {
                        $aqi = $aqiRes->json();
                    }
                }
            }
        }

        return Inertia::render('weather', [
            'weather' => $weather,
            'aqi' => $aqi,
            'favorites' => $favorites,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    // Handle search form
    public function search(Request $request)
    {
        $request->validate([
            'city' => 'required|string|max:100'
        ]);

        $favorites = Favorite::orderBy('city')->get();

        $city = $request->input('city');
        $apiKey = env('OPENWEATHER_API_KEY');

        $wRes = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q'     => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($wRes->failed() || ($wRes->json()['cod'] ?? 0) != 200) {
            return back()->with('error', 'City not found.')->with(compact('favorites'));
        }

        $weather = $wRes->json();
        $aqi = null;

        if (env('OPENAIR_QUALITY_API_KEY') && isset($weather['coord'])) {
            $aqiRes = Http::get('http://api.airvisual.com/v2/nearest_city', [
                'lat' => $weather['coord']['lat'] ?? null,
                'lon' => $weather['coord']['lon'] ?? null,
                'key' => env('OPENAIR_QUALITY_API_KEY')
            ]);

            if ($aqiRes->ok()) {
                $aqi = $aqiRes->json();
            }
        }

        return Inertia::render('weather', [
            'weather' => $weather,
            'aqi' => $aqi,
            'favorites' => $favorites,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    // Save favorite city (idempotent-ish)
    public function saveFavorite(Request $request)
    {
        $data = $request->validate([
            'city'    => 'required|string|max:100',
            'country' => 'nullable|string|max:5'
        ]);

        // Try not to duplicate
        Favorite::firstOrCreate($data);

        return back()->with('success', 'City added to favorites.');
    }

    // Remove a favorite
    public function removeFavorite($id)
    {
        Favorite::where('id', $id)->delete();
        return back()->with('success', 'Favorite removed.');
    }

    // JSON endpoint used by AJAX (returns weather + AQI)
    public function apiCombined($city)
    {
        $apiKey = env('OPENWEATHER_API_KEY');
        if (!$apiKey) {
            return response()->json(['error' => 'Missing OPENWEATHER_API_KEY'], 500);
        }

        $wRes = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q'     => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($wRes->failed() || ($wRes->json()['cod'] ?? 0) != 200) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $weather = $wRes->json();

        $aqi = null;
        if (env('OPENAIR_QUALITY_API_KEY') && isset($weather['coord'])) {
            $aqiRes = Http::get('http://api.airvisual.com/v2/nearest_city', [
                'lat' => $weather['coord']['lat'] ?? null,
                'lon' => $weather['coord']['lon'] ?? null,
                'key' => env('OPENAIR_QUALITY_API_KEY')
            ]);

            if ($aqiRes->ok()) {
                $aqi = $aqiRes->json();
            }
        }

        return response()->json([
            'weather' => $weather,
            'aqi'     => $aqi
        ]);
    }
}
