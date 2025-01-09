const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherContainer = document.getElementById('weather-container');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById('city-name').textContent = `Weather in ${data.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

  const weatherCondition = data.weather[0].main.toLowerCase();
  setWeatherIcon(weatherCondition);

  weatherContainer.classList.remove('hidden');
}

function setWeatherIcon(condition) {
  const iconMap = {
    clear: 'fa-sun',
    clouds: 'fa-cloud',
    rain: 'fa-cloud-rain',
    drizzle: 'fa-cloud-showers-heavy',
    thunderstorm: 'fa-bolt',
    snow: 'fa-snowflake',
    mist: 'fa-smog',
    haze: 'fa-smog',
  };

  const iconClass = iconMap[condition] || 'fa-cloud';
  weatherIcon.className = `fas ${iconClass}`;
}
