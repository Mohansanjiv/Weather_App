import React, { useState } from "react";
import './Weather.css'
const API_KEY = "e367de94beb64f71ae0160436252911";
const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setWeatherData(null);

        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
            );
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error.message || "Error fetching weather");
            }

            setWeatherData({
                temp: data.current.temp_c,
                humidity: data.current.humidity,
                wind: data.current.wind_kph,
                pressure: data.current.pressure_mb,
            });
        } catch (err) {
            alert("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: "8px" }}
            />
            <button style={{ background: "green", color: "white", padding: "10px", border: "none", borderRadius: "0px 20px 20px 0px" }} onClick={fetchWeather}>Search</button>

            {loading && <p>Loading data...</p>}

            {weatherData && (
                <div className="weather-cards" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.temp} °C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.humidity} %</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.wind} km/h</p>
                    </div>
                    <div className="weather-card">
                        <h3>Pressure</h3>
                        <p>{weatherData.pressure} mb</p>
                    </div>
                </div>


            )
            }
        </div >
    );
};

export default WeatherApp;