let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
    name: "Paris",
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
    name: "Tokyo",
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
    name: "Lisbon",
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
    name: "San Francisco",
  },
  moscow: {
    temp: -5,
    humidity: 20,
    name: "Moscow",
  },
};

let city = prompt("Enter a city! 🌍");
city = city.toLowerCase().trim();

if (weather[city] !== undefined) {
  let cityTempCel = Math.round(weather[city].temp);
  let cityTempFar = Math.round((weather[city].temp * 9) / 5 + 32);
  alert(
    `It is currently ${cityTempCel}°C (${cityTempFar}°F) in ${weather[city].name} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
