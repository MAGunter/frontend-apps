const API_KEY = '72af106e8075924a9134576c33286343';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const searchButton = document.getElementById('btn');
const searchInput = document.getElementById('search');
const main = document.querySelector('main');
const countryElement = document.querySelector('.country p');
const cityElement = document.querySelector('.city p');
const descriptionElement = document.querySelector('.description p');
const temperatureElement = document.querySelector('.temperature p');
const humidityElement = document.querySelector('.humidity p');
const windElement = document.querySelector('.wind p');
const unitToggle = document.getElementById('unit-toggle');
const forecastSection = document.querySelector('.forecast');

let currentUnit = 'metric'; 
let currentCity = 'Almaty';

getWeather(currentCity);

// Event listener for search button to get weather by city name
searchButton.addEventListener('click', () => {
    const cityName = searchInput.value || currentCity;
    currentCity = cityName;
    getWeather(cityName);
});

// Event listener for location button to get weather by user's geolocation
document.getElementById('location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Event listener for unit toggle to switch between Celsius and Fahrenheit
unitToggle.addEventListener('change', () => {
    currentUnit = unitToggle.checked ? 'imperial' : 'metric';
    getWeather(currentCity);
});

// Function to fetch and display current weather by city name
function getWeather(city) {
    const apiUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=${currentUnit}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            showCurrentWeather(data);
            getForecast(city);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to fetch weather by geographic coordinates
function getWeatherByCoordinates(lat, lon) {
    const apiUrl = `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            showCurrentWeather(data);
            getForecastByCoordinates(lat, lon);
        })
        .catch(error => console.error('Error fetching weather data by location:', error));
}

// Function to fetch and display 5-day weather forecast by city name
function getForecast(city) {
    const apiUrl = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=${currentUnit}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            showForecast(data);
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

// Function to fetch 5-day forecast by geographic coordinates
function getForecastByCoordinates(lat, lon) {
    const apiUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            showForecast(data);
        })
        .catch(error => console.error('Error fetching forecast by location:', error));
}

// Function to display current weather data on the page
function showCurrentWeather(data) {
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    descriptionElement.textContent = data.weather[0].description;
    temperatureElement.textContent = `${data.main.temp}°${currentUnit === 'metric' ? 'C' : 'F'}`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}.png`;
}

// Function to display 5-day forecast data on the page
function showForecast(data) {
    forecastSection.innerHTML = '';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) {
            const dayForecast = document.createElement('div');
            dayForecast.classList.add('day-forecast');

            const date = new Date(item.dt * 1000).toLocaleDateString();
            const tempHigh = item.main.temp_max;
            const tempLow = item.main.temp_min;
            const weatherIcon = item.weather[0].icon;
            const description = item.weather[0].description;

            dayForecast.innerHTML = `
                <h4>${date}</h4>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${description}">
                <p>High: ${tempHigh}°${currentUnit === 'metric' ? 'C' : 'F'}</p>
                <p>Low: ${tempLow}°${currentUnit === 'metric' ? 'C' : 'F'}</p>
                <p>${description}</p>
            `;
            forecastSection.appendChild(dayForecast);
        }
    });
}