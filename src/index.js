let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let lastUpdatedTime = document.querySelector(".last-updated");
lastUpdatedTime.innerHTML = `Last updated ${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="card col-2 forecast">
        <div class="card-body">
          <div class="card-title day">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="daily-icon sunny" alt="sunny" />
          <div class="card-text min-max-temp">
            <span class="min-temp">
              ${Math.round(
                forecastDay.temp.min
              )}° </span>/ <strong>${Math.round(forecastDay.temp.max)}°</strong>
            
          </div>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function changeDisplayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let currentSearchLocation = document.querySelector("#currentSearchLocation");

  if (searchInput.value) {
    currentSearchLocation.innerHTML = searchInput.value;
  } else {
    searchInput.value = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("form");
form.addEventListener("submit", changeDisplayCity);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  searchCity(searchInput.value);
}

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "33dca7c891ae6d6a6644ea4d53f75127";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#currentSearchLocation");
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "33dca7c891ae6d6a6644ea4d53f75127";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
