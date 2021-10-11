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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastDisplay = document.querySelector("#future-forecast");
  let forecastHTML = `<div class="row future-forecast-row-1">`;

  forecast.forEach(function (forecastDay, index) {
    let iconCode = forecastDay.weather[0].icon;
    let id = forecastDay.weather[0].id;

    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
			<div class="col day-of-week-container">
            <div class="day-of-week-box">
              <div class="future-weather-img-section">
                <img
                  src="${weatherImageLogic(iconCode, id)}"
                  class="future-weather-img"
                  id="future-weather-img"
                />
              </div>
              <div class="future-weather-temp">
                <span
                  class="future-weather-temp-max"
                  id="forecast-day1-temp-max"
                  >${Math.round(forecastDay.temp.max)}°</span
                >
                <span
                  class="future-weather-temp-min"
                  id="forecast-day1-temp-min"
                  >${Math.round(forecastDay.temp.min)}°</span
                >
              </div>
            </div>
            <div class="day-of-week-title" id="forecastDay1">${formatForecastDay(
              forecastDay.dt
            )}</div>
            </div>
			`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastDisplay.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "c3a61a564272a1eaa5cf5ae99e2d35f2";
  let units = "metric";
  let apiUrlEndPoint = "https://api.openweathermap.org/data/2.5/onecall";
  let lat = coords.lat;
  let lon = coords.lon;
  let apiUrl = `${apiUrlEndPoint}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function weatherImageLogic(iconCode, id) {
  //image logic

  //Clear Sky Day
  if (iconCode === "01d") {
    imgRef = "images/sun.png";
  }
  //Clear Sky Night
  if (iconCode === "01n") {
    imgRef = "images/moon.png";
  }
  //Few Clouds Day
  if (iconCode === "02d") {
    imgRef = "images/sun-cloud.png";
  }
  //Few Clouds Night
  if (iconCode === "02n") {
    imgRef = "images/moon-cloud.png";
  }
  //Scattered Clouds Day
  if (iconCode === "03d") {
    imgRef = "images/cloud-small-sun.png";
  }
  //Scattered Clouds Night, Broken Clouds and Mist Day and Night
  if (
    iconCode === "04d" ||
    iconCode === "03n" ||
    iconCode === "04n" ||
    iconCode === "50d" ||
    iconCode === "50n"
  ) {
    imgRef = "images/clouds.png";
  }
  //Shower Rain Day
  if (iconCode === "09d") {
    imgRef = "images/rain.png";
  }
  //Rain Day (500 and 501 is light and moderate rain only)
  if (iconCode === "10d") {
    if (id === 500 || id === 501) {
      imgRef = "images/sun-rain-cloud.png";
    } else {
      imgRef = "images/rain.png";
    }
  }
  // Shower Rain and Rain Night
  if (iconCode === "09n" || iconCode === "10n") {
    imgRef = "images/moon-rain.png";
  }
  //Thunderstorm Day and Night
  if (iconCode === "11d" || iconCode === "11n") {
    imgRef = "images/storm.png";
  }
  //Snow Day and Night
  if (iconCode === "13d" || iconCode === "13n") {
    imgRef = "images/snow.png";
  }

  return imgRef;
}

function showCityTemp(response) {
  celsiusTemp = response.data.main.temp;
  let country = response.data.sys.country;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let iconCode = response.data.weather[0].icon;
  let id = response.data.weather[0].id;
  let imgRef = weatherImageLogic(iconCode, id);

  let mainImgDisplay = document.querySelector("#main-img");
  mainImgDisplay.setAttribute("src", imgRef);
  mainImgDisplay.setAttribute("alt", description);

  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = city;

  let descriptionDisplay = document.querySelector("#weather-description");
  descriptionDisplay.innerHTML = description;

  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;

  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = humidity;

  let tempDisplay = document.querySelector("#main-temperature");
  tempDisplay.innerHTML = Math.round(celsiusTemp);

  // Get display names of region in English
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  let countryDisplay = document.querySelector("#country-display");
  countryDisplay.innerHTML = regionNames.of(country);

  document.getElementById("btnradio1").checked = true; //check a radio button
  document.getElementById("btnradio2").checked = false; //uncheck a radio button

  getForecast(response.data.coord);
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

  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "c3a61a564272a1eaa5cf5ae99e2d35f2";
  let units = "metric";
  let apiUrlEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiUrlEndPoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityTemp);
}

function handleGeoSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahTemp(event) {
  let tempDisplay = document.querySelector("#main-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempDisplay.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelTemp(event) {
  let tempDisplay = document.querySelector("#main-temperature");
  tempDisplay.innerHTML = Math.round(celsiusTemp);
}

let now = new Date();
currentDateTime(now);

let celsiusTemp = null;

searchCity("London");

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", handleCitySubmit);

let geoBtn = document.querySelector("#geo-city-button");
geoBtn.addEventListener("click", handleGeoSubmit);

let fahBtn = document.querySelector("#btnradio2");
fahBtn.addEventListener("click", displayFahTemp);

let celBtn = document.querySelector("#btnradio1");
celBtn.addEventListener("click", displayCelTemp);
