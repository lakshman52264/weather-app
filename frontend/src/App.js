import React, { useState } from "react";
import axios from "axios";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/weather?city=${city}`
            );
            setWeather(response.data);
            setError("");
        } catch (err) {
            setError("City not found or API error");
            setWeather(null);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Weather Forecast</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
            />
            <button onClick={fetchWeather} style={{ padding: "10px 20px", marginLeft: "10px" }}>
                Get Weather
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && (
                <div style={{ marginTop: "20px" }}>
                    <h3>{weather.location.name}, {weather.location.country}</h3>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Condition: {weather.current.condition.text}</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind: {weather.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
}

export default App;
