import { useState, useEffect } from 'react';
import { gethWeatherData } from '../utils/getWeatherData';
import { getForecastData } from '../utils/getForecastData';
import Modal from 'react-modal';

export interface WeatherDataInterface {
    name: string;
    temp: number;
    description: string;
    humidity: number;
    pressure: number;
    wind_speed: number;
}

export const Weather = () => {
  const [isOpen, setIsOpen] = useState( false )
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
    <div>
        <button onClick={() => setIsOpen(true)}>Ver Climas</button>
        <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-center mb-4">Weather</h2>
                <div className="flex flex-wrap justify-center items-start gap-4">
                    {
                        weatherData.map( (item, index) => <DisplayWeather key={index} city={item} /> )
                    }
                </div>
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setIsOpen(false)}>Cerrar</button>

        </Modal>
      </div>
  );
};


function DisplayWeather ({city}:{city:WeatherDataInterface}){

  return <div className="my-4 p-4 border border-gray-300 rounded-md">
    <h2 className="text-xl font-semibold">Weather in {city.name}</h2>
    <p className="mt-2">Temperature: {city.temp} °C</p>
    <p>Weather: {city.description}</p>
    <p>Humidity: {city.humidity}%</p>
    <p>Pressure: {city.pressure} hPa</p>
  </div>

}