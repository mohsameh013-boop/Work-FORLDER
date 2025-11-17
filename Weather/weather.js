 const API_KEY = '801edc9904ae4430800214236251411'; 

        document.addEventListener('DOMContentLoaded', () => {
            const cityInput = document.getElementById('city-input');
            const searchBtn = document.getElementById('search-btn');
            const weatherCardsDiv = document.getElementById('weather-cards');
            
            const createWeatherCard = (cityName, forecastDayData) => {
                const date = new Date(forecastDayData.date).toLocaleDateString();
                const tempCelsius = forecastDayData.day.avgtemp_c.toFixed(1);
                const iconUrl = forecastDayData.day.condition.icon;
                const windSpeedKph = forecastDayData.day.maxwind_kph;
                const humidity = forecastDayData.day.avghumidity;
                
                 return `<div class="card">
                            <h3>${cityName}</h3>
                            <p>Date: ${date}</p>
                            <img src="${iconUrl}" alt="weather icon">
                            <p>Temp: ${tempCelsius}°C</p>
                            <p>Wind: ${windSpeedKph} kph</p>
                            <p>Humidity: ${humidity}%</p>
                        </div>`;
            };

            const getWeatherData = () => {
                const cityName = cityInput.value.trim();
                if (!cityName) return;

            
                const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3`;
                
                fetch(WEATHER_API_URL)
                    .then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            throw new Error(data.error.message);
                        }
                        weatherCardsDiv.innerHTML = ""; 
                        const cityNameReturned = data.location.name;
                        const forecastDays = data.forecast.forecastday;

                        if (forecastDays.length === 0) {
                            throw new Error('No 3-day forecast data found');
                        }

                        forecastDays.forEach(forecastDayData => {
                            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityNameReturned, forecastDayData));
                        });

                    })
                    .catch(error => {
                        alert(`An error occurred: ${error.message}`);
                        console.error("Error fetching weather data:", error);
                    });
            };

            searchBtn.addEventListener('click', getWeatherData);
            cityInput.addEventListener('keyup', e => e.key === "Enter" && getWeatherData());
        });

   