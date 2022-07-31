function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = date.getDay();
  let dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayList[currentDay];
  return `${day} ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "a8933cdba2878673d4b2f2fce60fe703";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "a8933cdba2878673d4b2f2fce60fe703";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Lviv");

function fahrenheitChange(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemp");
  //   let fahrenheitTemp = Math.round(currentTemperature * 1.8 + 32);
  //   currentTemperature.innerHTML = `${fahrenheitTemp}`;
  currentTemperature.innerHTML = 62;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitChange);

function celsiusChange(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemp");
  //   let celsiusTemp = Math.round(currentTemperature - 32 / 1.8);
  //   currentTemperature.innerHTML = `${celsiusTemp}`;
  currentTemperature.innerHTML = 17;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusChange);
