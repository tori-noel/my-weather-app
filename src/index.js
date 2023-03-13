let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;
let cityInput = document.querySelector("#city-input");
function searchForCity(event) {
  event.preventDefault();

  console.log(cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

function showWeather(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let name = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${name}`;
  let heading = document.querySelector("h3");
  heading.innerHTML = `The temperature is ${temp} °F`;
}
function search(event) {
  event.preventDefault();

  let city = cityInput.value;
  let unit = "imperial";
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function currentLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}
&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(currentLocation);

function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locButton = document.querySelector("#current-location");
locButton.addEventListener("click", updateLocation);
