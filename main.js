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

function displayResults(weather) {
  console.log(weather);
  backgroundChange(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°F</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  // console.log(weather.weather[0].main);
  // switch (weather.weather[0].main) {
  //   case weather.weather[0].main === "Clear":
  //     document.body.style.backgroundImage = 'url("clear.jpg")';
  //     break;
  //   case weather.weather[0].main === "Rain":
  //     document.body.style.backgroundImage = 'url("rainy.jpg")';
  //     break;
  //   case weather.weather[0].main === "Clouds":
  //     document.body.style.backgroundImage = 'url("cloudy.jpg")';
  //     break;
  //   default:
  //     document.body.style.backgroundImage = 'url("weather-background.jpeg")';
  // }

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

// function changeBackground() {
//   console.log(this.weather.weather[0].main);
//   switch (weatherEl.value) {
//     case weatherEl === "Clear":
//       document.body.style.backgroundImage = 'url("clear.jpg")';
//       break;
//     case weatherEl === "Rain":
//       document.body.style.backgroundImage = 'url("rainy.jpg")';
//       break;
//     case weatherEl === "Clouds":
//       document.body.style.backgroundImage = 'url("cloudy.jpg")';
//       break;
//     default:
//       document.body.style.backgroundImage = 'url("weather-background.jpeg")';
//   }
// }

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
