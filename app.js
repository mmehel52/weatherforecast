const url = "https://api.openweathermap.org/data/2.5/";
const key = "dd19ca18b6043f855468aeade58287bb";
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == "13") {
    getResult(searchBar.value);
    searchBar.value = "";
  }
}

function getResult(cityName) {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=en`;
  fetch(query)
    .then((weather) => {
      if (!weather.ok) {
        renderError();
        throw new Error(); //burayı sor????
      }
      return weather.json();
    })
    .then(displayResult);
}

const renderError = () => {
  let content = document.querySelector(".content");
  content.innerHTML = `
    <img src="./12.jpg" alt="" style="width:500px" />
  `;
};

const displayResult = (result) => {
  let content = document.querySelector(".content");
  content.innerHTML = `
 <div class="city">${result.name},${result.sys.country}</div>
        <div class="temp">${Math.round(result.main.temp)}°C</div>
        <img class="img" src="http://openweathermap.org/img/wn/${
          result.weather[0].icon
        }.png" />
        <div class="desc">${result.weather[0].description}</div>
        <div class="minmax">${Math.round(result.main.temp_min)}°C/${Math.round(
    result.main.temp_max
  )}°C</div>`;
};
