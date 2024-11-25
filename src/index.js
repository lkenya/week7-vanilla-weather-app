function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let currentDate = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#weather-description");
  let timeElement = document.querySelector("#current-date");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  timeElement.innerHTML = formatDate(currentDate);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `
    <img src="${response.data.condition.icon_url}" class="current-temperature-icon" />
  `;
}

function searchWeatherCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchWeatherCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">Tue</div>
        <div class="weather-forecast-icon">⛅</div>
        <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>15&deg;</strong></div>
            <div class="weather-forecast-temperature">9&deg;</div>
        </div>
        </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
searchWeatherCity("Harare");
displayForecast();
