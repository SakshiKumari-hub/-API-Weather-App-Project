const apiKey = "ad127d6d90ba49988a1103454250907";

async function fetchWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  localStorage.setItem("lastCity", city); // save to localStorage
  showLoading(true);

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("city-name").textContent = data.location.name;
    document.getElementById("temperature").textContent = data.current.temp_c;
    document.getElementById("wind-speed").textContent = data.current.wind_kph;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("condition").textContent = data.current.condition.text;

   const icon = document.getElementById("weather-icon");
   const condition = data.current.condition.text.toLowerCase(); // e.g., "sunny", "rain", "cloudy","partly cloudy"
   const customIcons = {
      sunny: "sunny.png",
      rain: "rain.png",
      cloudy: "cloudy.png",
      partlycloudy: "partly cloudy.png"
    };
   // Use a default icon if condition not in customIcons
   icon.src = customIcons[condition] || "default.png";
   icon.alt = data.current.condition.text;

   document.getElementById("weather-info").style.display = "block";
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Could not get weather data. Please check the city name.");
  } finally {
    showLoading(false);
  }
}

function showLoading(show) {
  document.getElementById("loading").style.display = show ? "block" : "none";
}

// Load last city on page load
window.onload = () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("city-input").value = lastCity;
    fetchWeather();
  }
};
