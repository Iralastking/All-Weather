const city = 'jacksonville'; // Replace with the desired city
const WapiKey = '74c43979c37f49a2801192855231805'
const apiKey = '6afc29d93d88a544a9ded7b82b82a66d';
var searchButton;
var searchInput;


jQuery(document).ready(function ($) {

  searchButton = $('#search-button');
  searchInput = $('#search-input');
  $('.cities button').on('click', function(){
    getWeatherData($(this).text())
  });

  searchButton.on('click', function(){
    const location = searchInput.val();
    if ( location ) {
      getWeatherData(location);
    }
  });

  function getWeatherData(city){
    fetch(`https://api.weatherapi.com/v1/current.json?key=${WapiKey}&q=${city}`)
    .then(response => response.json())
    .then(data => {
      const currentDescription = data.current.condition.text;
      const currentTemperature = data.current.temp_f;
      const currentWindspeed = data.current.gust_mph;
      const currentDate = new Date(data.current.last_updated);
      const currentHumidity = data.current.humidity;
      const currWeathericon = data.current.condition.icon;
      console.log(data);
      document.getElementById("currentCityName").innerHTML = data.location.name;
      document.getElementById("currentTemp").innerHTML = currentTemperature;
      document.getElementById("currentDate").innerHTML = currentDate.toLocaleDateString('en-US');
      document.getElementById("currentDescr").innerHTML = currentDescription;
      document.getElementById("currentHumidity").innerHTML = currentHumidity;
      document.getElementById("currentWs").innerHTML = currentWindspeed;
      document.getElementById("currWeathericon").innerHTML = "<img src=\"https:" + currWeathericon + "\" class=\"icon\" />";

      console.log("Current: ", currentDescription, currentTemperature, currentWindspeed);


    })
    .catch(error => {
      console.log('Error:', error);
    })
  }
  getWeatherData('Jacksonville');



  // fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=30.329&lon=-81.8176&units=imperial&cnt=5&appid=6afc29d93d88a544a9ded7b82b82a66d`)
  //   .then(response => response.json())
  //   .then(data => {
  //     // Extract relevant information from the data

  //     // const weatherDescription = data.weather[0].description;

  //     const weatherDescription = data.list[0].weather[0].description;

  //     const forecast = data.list;
  //     forecast.forEach(function (v) {
  //       const weatherDescription = v.weather[0].description;
  //       const temperature = v.main.temp;
  //       const windspeed = v.wind.speed;
  //       console.log(weatherDescription, temperature, windspeed);
  //     });
  //     // Display the weather information
  //     // console.log(`Temperature:${temperature} °C`);
  //     // console.log(`Weather:${weatherDescription}`);
  //     // console.log(data);
  //   })
  //   .catch(error => {
  //     console.log('Error:', error);
  //   })

  // Inside the fetchWeatherData function, after updating other elements

  // document.querySelector('.weather-icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  // https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

  // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  // const weatherDescription = data.weather[0].description;

  function updateWeatherInfo(data) {
    locationEl.textContent = `Location: ${data.location.name}, ${data.location.country}`;
    temperatureEl.textContent = `Temperature: ${data.current.temp_f}°F`;
    conditionEl.textContent = `Condition: ${data.current.condition.text}`;

    // Create an img element and set its source to the weather icon URL
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https:${data.current.condition.icon}`;

    // Append the icon to the condition element
    conditionEl.appendChild(weatherIcon);
  }



  // Handle search button click
  searchButton.addEventListener('click', () => {
    
    if (location) {
      getWeatherData(location);
      searchInput.value = '';
    }
  });

});
