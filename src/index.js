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

function celcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "19°C";
}

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "66°F";
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheit);

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

function showTemperature(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#currentSearchLocation");
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
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

// Matt's week 5 homework solution (includes info on updating humidity and wind)
// https://codesandbox.io/s/api-homework-solution-zyx7g
