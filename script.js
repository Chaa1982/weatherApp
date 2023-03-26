cityInput = document.querySelector("#city-input");
const submitButton = document.querySelector("#submit");
const weatherDataSection = document.querySelector("#weather-data");

const requestOptions = {
	method: 'GET',
};

const API_KEY = `6409ee75b6ffc020adb31a565296a4bb`

const errorStatuses = ["404", "401"];

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, requestOptions)
    	.then(response => response.json())
    	.then(response => {
            console.log(response, "response");
            //проверка на наличие ошибки
            if(errorStatuses.includes(response.cod)) {
                return renderError(response);
            }
            // усли все хооошо - выводим
            renderWeather(response);
        })
    	.catch(err => console.log(err));
}

submitButton.onclick = () => {
    getWeather(cityInput.value);
}

function renderError (error) {
    weatherDataSection.innerHTML = error.message;


}

function renderWeather (data) {
    const {main, wind, sys} = data;
    const {feels_like, temp, temp_min, temp_max, pressure} = main;
    const {speed, deg, gust} = wind

    weatherDataSection.innerHTML = "";
    weatherDataSection.innerHTML = `
        <h3>Weather</h3>
        <p>Temp: ${temp}C</p>
        <p>Feels like: ${feels_like}C</p>
        <span>${temp_min}C - ${temp_max}C</span>
        <p>Pressure: ${pressure}</p>
        <h3>Wind</h3>
        <p>Spid: ${speed}</p>
        <span>Direction: ${deg}</span>
        <p>Gust: ${gust}</p>
    `;
}