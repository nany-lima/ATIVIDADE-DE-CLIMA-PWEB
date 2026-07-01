const apiKey = "433a6461f3c219a34676fe4f5db4e8f8";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Cidade não encontrada");
    const data = await response.json();

    document.getElementById("city-name").textContent = `${data.name} 🌍`;
    document.getElementById("condition").textContent = data.weather[0].description;

    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C 🌡️`;
    document.getElementById("feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("humidity").textContent = `${data.main.humidity}% 💧`;
    document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s 🍃`;
    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
    document.getElementById("visibility").textContent = `${data.visibility / 1000} km 👀`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const localTime = new Date((data.dt + data.timezone) * 1000).toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    document.getElementById("local-time").textContent = `🕒 ${localTime}`;

    document.getElementById("uv-index").textContent = "N/D";

    document.getElementById("weather-result").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
  } catch (error) {
    document.getElementById("weather-result").classList.add("hidden");
    document.getElementById("error-message").classList.remove("hidden");
    console.error(error);
  }
}
