import { WeatherDataInterface } from "../components/weather";

export const getForecastData = async ( cities: string[], days: number ): Promise<WeatherDataInterface[]> => {
    try {
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${apiKey}`)
        const response = await fetch('http://127.0.0.1:8000/api/weather/forecast', {
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