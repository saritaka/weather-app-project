function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = date.getDay();
  currentDay = days[currentDay];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `Last updated: ${currentDay} ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  day = days[day];
  return day;
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col-2">
                <div class="forecast-date">${formatDay(day.dt)}</div>
                <span class="forecast-max-temp"> ${Math.round(
                  day.temp.max
                )}° </span>
                <span class="forecast-min-temp"> ${Math.round(
                  day.temp.min
                )}° </span>
                <br />
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png"
                  alt="forecast-icon"
                  class="forecast-icon"
                  width="28"
                />
              </div>
    `;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "046240cb2fb8cadf405fbf7a5520ca09";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

function setTemperature(response) {
  displayedTemp = response.data.main.temp;

  let currentTemp = document.querySelector("#current-temp");
  let cityHeader = document.querySelector("#current-city");
  let weatherDecsription = document.querySelector("#weather-description");
  let presentCurrentDay = document.querySelector("#current-day-time");
  let weatherIcon = document.querySelector("#weather-icon");

  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  cityHeader.innerHTML = response.data.name;
  weatherDecsription.innerHTML = ` ${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `| Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  presentCurrentDay.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  document.querySelector("#current-city").innerHTML = city;
  let apiKey = "046240cb2fb8cadf405fbf7a5520ca09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(setTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#selected-city");

  search(selectedCity.value);
}

function handlePosiotion(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "046240cb2fb8cadf405fbf7a5520ca09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(setTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosiotion);
}

let getCity = document.querySelector("#city-selection");
getCity.addEventListener("submit", changeCity);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
