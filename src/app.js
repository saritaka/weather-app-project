let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Display the current day and time
// let now = new Date();
// let currentDay = now.getDay();
// currentDay = days[currentDay];
// let currentHour = now.getHours();
// if (currentHour < 10) {
//   currentHour = `0${currentHour}`;
// }
// let currentMinute = now.getMinutes();
// if (currentMinute < 10) {
//   currentMinute = `0${currentMinute}`;
// }
// let presentCurrentDay = document.querySelector("#current-day-time");
// presentCurrentDay.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

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

  console.log(date);

  let currentDay = date.getDay();
  console.log(currentDay);
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

function setTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;

  let cityHeader = document.querySelector("#current-city");
  cityHeader.innerHTML = response.data.name;

  console.log(response.data);
  let weatherDecsription = document.querySelector("#weather-description");
  weatherDecsription.innerHTML = ` ${response.data.weather[0].description}`;
  console.log(response.data.weather[0].description);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `| Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  let presentCurrentDay = document.querySelector("#current-day-time");
  presentCurrentDay.innerHTML = formatDate(response.data.dt * 1000);

  console.log(response.data.weather[0].icon, weatherDecsription);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  document.querySelector("#current-city").innerHTML = city;
  let apiKey = "046240cb2fb8cadf405fbf7a5520ca09";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

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

function degreesC() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "19°";
}
function degreesF() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "66°";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", degreesC);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", degreesF);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
