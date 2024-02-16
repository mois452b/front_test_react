import { WeatherDataInterface } from "../components/weather";

export const getForecastData = async ( cities: string[], days: number ): Promise<WeatherDataInterface[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/weather/forecast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cities, days }),
        });
        const data = await response.json();
        return data;
    }
    catch( error ) {
        console.error('Error fetching weather forecast:', error);
    }
    return [];
}