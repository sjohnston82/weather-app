const api = {
  key: "0263cf82697b01a485e30dbce21bd8a5",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
const forecastDiv = document.querySelector(".forecast-div");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    forecastDiv.innerHTML = "";
    getResults(searchBox.value);
    getForecast(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function getForecast(query) {
  fetch(`${api.baseurl}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then((forecast) => {
      return forecast.json();
    })
    .then((forecast) => {
      let city = forecast.city.name;
      let dailyForecast = forecast.list;
      displayForecast(city, dailyForecast);
    });
}

function getWeatherIcon(weather) {
  let wType = weather.weather[0].main;
  if (wType == "Clear") {
    let wIcon = '<i class="fas fa-sun"></i>';
    return wIcon;
  } else if (wType == "Rain") {
    let wIcon = '<i class="fas fa-cloud-showers-heavy"></i>';
    return wIcon;
  } else if (wType == "Clouds") {
    let wIcon = '<i class="fas fa-cloud"></i>';
    return wIcon;
  } else if (wType == "Snow") {
    let wIcon = '<i class="wi wi-snow"></i>';
    return wIcon;
  }
}

function applyIcon(icon) {
  if (icon === "01d") {
    return "wi-day-sunny";
  } else if (icon === "01n") {
    return "wi-night-clear";
  } else if (icon === "02d" || "02n") {
    return "wi-cloudy";
  } else if (icon === "03d" || "03n" || "04d" || "04n") {
    return "wi-night-cloudy";
  } else if (icon === "09d" || "09n") {
    return "wi-showers";
  } else if (icon === "10d" || "10n") {
    return "wi-rain";
  } else if (icon === "11d" || "11n") {
    return "wi-thunderstorm";
  } else if (icon === "13d" || "13n") {
    return "wi-snow";
  } else if (icon === "50d" || "50n") {
    return "wi-fog";
  } else {
    return "wi-meteor";
  }
}

function displayForecast(location, forecast) {
  console.log(forecast);

  const forecastDiv = document.querySelector(".forecast-div");

  forecast.forEach((day) => {
    let date = new Date(day.dt * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");
    dayBlock.className = "forecast__item";
    dayBlock.innerHTML = `<div class="forecast-item__heading">${name} ${
      day.dt_txt
    }</div>
      <div class="forecast-item__info">
      <i class="wi ${applyIcon(day.weather[0].icon)}"></i>
      <span class="degrees">${Math.round(day.main.temp)}
      <i class="wi wi-degrees"></i></span></div>`;
    forecastDiv.appendChild(dayBlock);
    forecastDiv.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  });
}

function displayResults(weather) {
  const wDescription = weather.weather[0].description;

  console.log(weather);

  backgroundChange(weather);
  let wIcon = getWeatherIcon(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerHTML = `${wIcon}${wDescription}`;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°F - ${Math.round(
    weather.main.temp_max
  )}°F`;
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function backgroundChange(weather) {
  const wType = weather.weather[0].main;
  if (wType == "Rain") {
    document.body.style.backgroundImage = "url('css/rainy.jpg')";
  } else if (wType == "Clouds") {
    document.body.style.backgroundImage = "url('css/cloudy.jpg')";
  } else if (wType == "Clear") {
    document.body.style.backgroundImage = "url(css/clear.jpg)";
  } else if (wType == "Snow") {
    document.body.style.backgroundImage = "url(css/snowy.jpg)";
  } else {
    document.body.style.backgroundImage = "url(css/weather-background.jpeg)";
  }
}
