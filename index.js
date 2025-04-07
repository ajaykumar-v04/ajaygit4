// Grab the DOM elements for city input and pollution percentage
var cityname = document.getElementById("cityInput");
var pollutionPercentage = document.getElementById("pollutionPercentage");
var weatherDetails = document.getElementById("weatherDetails"); // New element for weather details
var searchButton = document.getElementById("searchButton");

// Set up the API keys
const apiKey = "ecc9325840371c35d5d4779d8370f4eb0c7f17e7"; // WAQI API for AQI
const weatherApiKey = "54afe24e67535f5a558979da6d66c0c4"; // OpenWeatherMap API key

// Event listener for the search button
searchButton.addEventListener("click", function () {
  var city = cityname.value; // Get the city name from the input field

  if (city === "") {
    pollutionPercentage.textContent = "Please enter a city name.";
    weatherDetails.textContent = ""; // Clear weather details if city is empty
    return; // Do nothing if the city is empty
  }

  const url = `https://api.waqi.info/feed/${city}/?token=${apiKey}`;

  // Make the GET request for AQI
  axios
    .get(url)
    .then((response) => {
      // Successfully received data for AQI
      console.log("Air Quality Index:", response);

      // Update the DOM with the AQI value
      pollutionPercentage.textContent = `Air Quality Index: ${response.data.data.aqi}`;

      // Now make a request to OpenWeatherMap for the weather details
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`; // Use 'metric' for temperature in Celsius

      axios
        .get(weatherUrl)
        .then((weatherResponse) => {
          // Successfully received data for weather
          console.log("Weather Data:", weatherResponse.data);

          // Get weather details
          const weather = weatherResponse.data.weather[0].description;
          const temperature = weatherResponse.data.main.temp;
          const humidity = weatherResponse.data.main.humidity;
          const windSpeed = weatherResponse.data.wind.speed;

          // Update the DOM with the weather details
          weatherDetails.textContent = `Weather: ${weather}, Temperature: ${temperature}°C, Humidity: ${humidity}%, Wind Speed: ${windSpeed} m/s`;
        })
        .catch((error) => {
          // If there was an error fetching weather data
          console.error("Error fetching weather data:", error);
          weatherDetails.textContent =
            "Error fetching weather data. Please try again.";
        });
    })
    .catch((error) => {
      // If there was an error fetching air quality data
      console.error("Error fetching AQI:", error);
      pollutionPercentage.textContent =
        "Error fetching air quality data. Please try again.";
      weatherDetails.textContent = ""; // Clear weather details if AQI request fails
    });
});
