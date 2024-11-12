🌤️ Weather App
Overview
The Weather App is a sleek and user-friendly web application that allows users to check real-time weather updates for any location around the world. With the power of the OpenWeather API, the app provides users with current weather conditions, a 5-day forecast, and essential weather details like temperature, humidity, wind speed, and weather description. The app is designed to be responsive, so you can access it from any device with ease.

Features
Real-Time Weather: View current weather data including temperature, weather conditions, humidity, wind speed, and more.
Location Search: Search for weather by entering a city name or geographic location.
5-Day Forecast: Get a detailed forecast for the next 5 days.
Responsive Design: The app adapts to any screen size, making it accessible from both mobile and desktop devices.
Weather Icons: Dynamic weather icons are displayed based on the current weather conditions.
Tech Stack
HTML, CSS for layout and styling
JavaScript (ES6) for dynamic weather data fetching and user interaction
OpenWeather API for accessing weather data
JSON format for API responses
Getting Started
Prerequisites
A modern web browser (Chrome, Firefox, Safari, etc.).
Internet access for fetching weather data from the OpenWeather API.

Folder Structure
index.html: Main HTML file containing the layout for the weather app.
style.css: Styling for the app, ensuring a clean and simple design.
app.js: JavaScript file that handles weather data fetching, location search, and dynamic updates.
icons/: Folder containing various weather icons used to visually represent weather conditions.
Usage
Get Weather Information
Search by City: Enter a city name in the search bar and click the "Search" button to get the current weather data for that city.
5-Day Forecast: After entering a city, the app will display a 5-day weather forecast, showing the weather data (temperature, humidity, etc.) for each day.
Weather Icons: Weather icons dynamically change to represent the current weather conditions (e.g., sunny, cloudy, rainy, etc.).
Explore the 5-Day Forecast
Once you search for a city, the 5-day forecast will be displayed below the current weather. Each day shows:
Date
Weather icon
Temperature
Weather condition (e.g., clear sky, rain, etc.)
Error Handling
If the city is not found or the weather data cannot be retrieved, an error message will appear.
You can search for a new city by simply entering a different name in the search bar.
Code Structure
API Integration
API Key: The app uses the OpenWeather API, and an API key is required for accessing weather data.
Endpoints:
Current Weather: Retrieves real-time weather data for a specific city.
5-Day Forecast: Fetches the weather forecast for the next 5 days.
JavaScript Highlights
Event Listeners: To handle user input for city search and dynamic updates to the UI.
Main Functions:
getWeatherData(city): Fetches current weather data for the given city.
displayWeather(data): Displays the current weather information (temperature, condition, etc.).
getForecast(city): Fetches the 5-day forecast for the city.
displayForecast(data): Displays the 5-day weather forecast.
