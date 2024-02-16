import { WeatherDataInterface } from "../components/weather";

export const gethWeatherData = async ( cities: string[] ): Promise<WeatherDataInterface[]> => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cities }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    return [];
};