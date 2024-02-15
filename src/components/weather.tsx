import React, { useState, useEffect } from 'react';

export const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async ( cities: string[] ) => {
            try {
                const apiKey = 'b9cc4f4f3510e8c6130611073844c1e6';

                const datas = await Promise.all(
                    cities.map( async city => {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                        const data = await response.json();
                        return data
                    })
                );
                console.log(datas)
                setWeatherData( datas );
                setLoading(false);

                
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        const fetchWeatherForecast = async ( cities: string[], days: number ) => {
            try {
                const apiKey = 'b9cc4f4f3510e8c6130611073844c1e6';
                const datas = await Promise.all(
                    cities.map( async city => {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${apiKey}`)
                        const data = await response.json();
                        return data
                    })
                )
                console.log(datas)
            }
            catch( error ) {
                console.error('Error fetching weather forecast:', error);
            }
        }

        const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Caracas'];
        fetchWeatherData( cities );
        fetchWeatherForecast( cities, 1 );
        fetchWeatherForecast( cities, 2 );
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
            <p className="mt-2">Temperature: {cityData.main.temp} °C</p>
            <p>Weather: {cityData.weather[0].description}</p>
            <p>Humidity: {cityData.main.humidity}%</p>
            <p>Pressure: {cityData.main.pressure} hPa</p>
            {/* Add more weather details as needed */}
            </div>
        ))}
        </div>
  );
};

