document.addEventListener('DOMContentLoaded', function() {
const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const location = locationInput.value;
  fetchWeatherData(location);
});

function fetchWeatherData(location) {
  const apiKey = 'fbbde147c33691fe80920cb909533f63';  //this is the API key you will need to change.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not available for the location.');
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      displayErrorMessage(error.message);
    });
}

function displayWeatherData(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

  const celsiusTemperature = data.main.temp;
  const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperature.textContent = `Temperature: ${celsiusTemperature} °C / ${fahrenheitTemperature} °F`;
  description.textContent = `Description: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  errorMessage.textContent = 'An error has occurred. Please try again later.';
} 
function displayErrorMessage(message) {
  errorMessage.textContent = message;
}
});
