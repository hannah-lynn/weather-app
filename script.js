const descElement = document.querySelector('.description');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp p');
const infoElement = document.querySelector('.temp-info p');
const locationElement = document.querySelector('.location p');

const KELVIN = 273;
const key = '07e80250c0e96a55cc525b8e8be29c7c';

const weather = {
  temperature: {
    value: 18,
    unit: 'celsius',
  },
  description: 'Rainy',
  iconId: '09d',
  city: 'Manchester',
  country: 'England',
};

// DISPLAY THE WEATHER

function displayWeather() {
  iconElement.innerHTML = `<img = "icons/${weather.iconId}.png`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  infoElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// CHANGE C TO F

function cToF(temperature) {
  return (temperature * 9) / 5 + 32;
}

// ADD CLICKABLE TO CHANGE TO F

tempElement.addEventListener('click', function () {
  if (weather.temperature.value === undefinded) {
    return;
  }
  if (weather.temperature.unit === celsius) {
    let fahrenheit = cToF(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${farenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});

// GET WEATHER USING API

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    });
}
