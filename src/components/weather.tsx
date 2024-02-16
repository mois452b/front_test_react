import React, { useState, useEffect } from 'react';
import { gethWeatherData } from '../utils/getWeatherData';
import { getForecastData } from '../utils/getForecastData';

export interface WeatherDataInterface {
    name: string;
    temp: number;
    description: string;
    humidity: number;
    pressure: number;
    wind_speed: number;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataInterface[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async ( cities: string[] ) => {
            const datas = await gethWeatherData( cities );
            setWeatherData(datas);
            setLoading(false);

        };

        const fetchWeatherForecast = async ( cities: string[], days: number ) => {
            const datas = await getForecastData( cities, days );
            console.log( datas)
        }

        const cities = ['London', 'Paris', 'Tokyo', 'Sydney', 'Caracas'];
        fetchWeatherData( cities );
        fetchWeatherForecast( cities, 1 );
        // fetchWeatherForecast( cities, 2 );
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData.length) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Weather</h1>
        {weatherData.map((cityData, index) => (
            <div key={index} className="my-4 p-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-semibold">Weather in {cityData.name}</h2>
            <p className="mt-2">Temperature: {cityData.temp} °C</p>
            <p>Weather: {cityData.description}</p>
            <p>Humidity: {cityData.humidity}%</p>
            <p>Pressure: {cityData.pressure} hPa</p>
            </div>
        ))}
        </div>
  );
};

