const api = {
  key: "0263cf82697b01a485e30dbce21bd8a5",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
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
  }
}

function displayResults(weather) {
  console.log(weather);
  backgroundChange(weather);
  let wIcon = getWeatherIcon(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°F</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerHTML = `${wIcon}${weather.weather[0].main}`;

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
    document.body.style.backgroundImage = "url('rainy.jpg')";
  } else if (wType == "Clouds") {
    document.body.style.backgroundImage = "url('cloudy.jpg')";
  } else if (wType == "Clear") {
    document.body.style.backgroundImage = "url(clear.jpg)";
  } else {
    document.body.style.backgroundImage = "url(weather-background.jpeg)";
  }
}
