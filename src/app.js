function currentDateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let times = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayMonth = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = times[date.getHours()];
  }

  if (minutes < 10) {
    minutes = times[date.getMinutes()];
  }

  let formattedDate = `${day} ${dayMonth} ${month} ${year}`;
  let formattedTime = `${hours}:${minutes}`;

  let dateDisplay = document.querySelector("#date");
  dateDisplay.innerHTML = `${formattedDate}`;

  let timeDisplay = document.querySelector("#time");
  timeDisplay.innerHTML = `${formattedTime}`;
}

function showCityTemp(response) {
  
  console.log(response.data);
  
  let temperature = Math.round(response.data.main.temp);
  let country = response.data.sys.country;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  
  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = city;
  
  

  let descriptionDisplay = document.querySelector("#weather-description");
  descriptionDisplay.innerHTML = description;

  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;

  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = humidity;

  let tempDisplay = document.querySelector("#main-temperature");
  tempDisplay.innerHTML = temperature;
 
}

function searchCity(city) {
  

  let apiKey = "c3a61a564272a1eaa5cf5ae99e2d35f2";
  let units = "metric";
  let apiUrlEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiUrlEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityTemp);
}

function handleCitySubmit(event) {

  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let city = cityInput.value;

  showCity(city);

}





function showGeoCityTemp(response) {
  console.log(response);
  
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let country = response.data.sys.country;

  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = city;

  let mainTemp = document.querySelector("#main-temperature");
  mainTemp.innerHTML = temperature;

  
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "c3a61a564272a1eaa5cf5ae99e2d35f2";
  let units = "metric";
  let apiUrlEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiUrlEndPoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showGeoCityTemp);
}

function handleGeoSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let now = new Date();
currentDateTime(now);

searchCity("London");

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", handleCitySubmit);

let geoBtn = document.querySelector("#geo-city-button");
geoBtn.addEventListener("click", handleGeoSubmit);
