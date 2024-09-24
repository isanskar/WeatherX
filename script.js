

WEATHER_API_ENDPOINT =`https://api.openweathermap.org/data/2.5/weather?appid=86e4d4a0fcff7e24ee6b46650690d9e4&q=`;
WEATHER_DATA_ENDPOINT =`https://api.weatherbit.io/v2.0/current?key=712526d3dc024b3f9420d65e04c1a801`;

function findUserLocation() {
    const converter = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    temperature = document.querySelector(".temperature"),
    feelsLike = document.querySelector(".feelsLike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    HValue = document.querySelector("#HValue"),
    WValue = document.querySelector("#WValue"),
    SRValue = document.querySelector("#SRValue"),
    SSValue = document.querySelector("#SSValue"),
    CValue = document.querySelector("#CValue"),
    UVValue = document.querySelector("#UVValue"),
    PValue = document.querySelector("#PValue"),
    Forecast = document.querySelector(".Forecast")

    const UserLocation = document.querySelector("#userLocation");
    fetch(WEATHER_API_ENDPOINT + UserLocation.value)
    .then((response) => response.json())
    .then((data) => {
        if (data.cod !== 200) {
            alert(data.message);
            return;
        }
        console.log(data);
        city.innerHTML = data.name + ", " + data.sys.country;
        weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
        temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`; // Convert from Kelvin to Celsius
        feelsLike.innerHTML = `Feels like ${Math.round(data.main.feels_like - 273.15)}°C`; // Convert from Kelvin to Celsius
        description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;
        HValue.innerHTML = `${data.main.humidity}%`;
        WValue.innerHTML = `${data.wind.speed} m/s`;
        PValue.innerHTML = `${data.main.pressure} hPa`;
        CValue.innerHTML = `${data.clouds.all}%`;
        // Sunrise and Sunset times in UTC, convert to local time
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        SRValue.innerHTML = sunrise;
        SSValue.innerHTML = sunset;

        fetch(
            WEATHER_DATA_ENDPOINT + `&lon=${data.coord.lon}&lat=${data.coord.lat}`
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data); 
            UVValue.innerHTML = `${data.data[0].uv} `;
        });
    });
}