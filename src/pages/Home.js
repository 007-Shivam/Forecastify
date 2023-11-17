import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

import videoBG from '../assets/Bg.mp4';

export default function Home() {
    const [place, setPlace] = useState('');
    const [weatherData, setWeatherData] = useState({
        wind: '...',
        humidity: '...',
        main: '...',
        temp: '...',
        pressure: '...',
    });

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=646824f2b7b86caffec1d0b16ea77f79`
            );

            const {
                main: { temp, humidity, pressure },
                weather,
                wind,
            } = response.data;

            setWeatherData({
                temp: (temp - 273.15).toFixed(2),
                wind: wind.speed,
                humidity,
                main: weather[0].main,
                pressure,
            });
        } catch (error) {
            console.error('Error fetching weather data:');
        }
    };

    return (
        <div className='main w-100'>
            <video src={videoBG} autoPlay loop muted className='w-100 h-100' />
            <div className='bck'>
                <h3 className='title text-center font-weight-bold'>
                    Welcome to Forecastify
                </h3>
                <div class='form-group'>
                    <input
                        type='place'
                        class='input_place'
                        id='place'
                        placeholder='Enter Place'
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </div>
                <a onClick={getWeather}>
                    <i className='fa fa-search'></i>
                </a>
                <div className='info-box'>
                    <div className='box'>
                        <div className='inner-box wind-info'>
                            <h5>WIND</h5>
                            <p className='description'>{weatherData.wind} m/s</p>
                        </div>
                        <div className='inner-box humidity-info'>
                            <h5>HUMIDITY</h5>
                            <p className='description'>{weatherData.humidity} %</p>
                        </div>
                    </div>

                    <div className='box bottom-box'>
                        <div className='inner-box description-info'>
                            <h5>DESCRIPTION</h5>
                            <p className='description'>{weatherData.main}</p>
                        </div>
                        <div className='inner-box pressure-info'>
                            <h5>TEMPERATURE</h5>
                            <p className='description'>{weatherData.temp} &deg;C</p>
                        </div>
                        <div className='inner-box pressure-info'>
                            <h5>PRESSURE</h5>
                            <p className='description'>{weatherData.pressure} hPa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
