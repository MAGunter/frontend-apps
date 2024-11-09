const API_KEY = '72af106e8075924a9134576c33286343';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const defaultCity = 'Almaty';
const API_URL = `${BASE_URL}?q=${defaultCity}&appid=${API_KEY}&units=metric`;  // Added units=metric for temperature in Celsius

const searchButton = document.getElementById('btn');
const searchInput = document.getElementById('search');
const countryElement = document.querySelector('.country p');
const cityElement = document.querySelector('.city p');
const descriptionElement = document.querySelector('.description p');
const temperatureElement = document.querySelector('.temperature p');
const humidityElement = document.querySelector('.humidity p');
const windElement = document.querySelector('.wind p');

cityElement.textContent = defaultCity;
countryElement.textContent = 'Kazakhstan';

getWeather(API_URL);

searchButton.addEventListener('click', () => {
    const cityName = searchInput.value || defaultCity;
    const apiUrlWithCity = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;

    getWeather(apiUrlWithCity);
});

function getWeather(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            showWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function showWeather(data) {
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    descriptionElement.textContent = data.weather[0].description;
    temperatureElement.textContent = `${data.main.temp}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} m/s`;
}
