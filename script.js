cityInput = document.querySelector("#city-input");
const submitButton = document.querySelector("#submit");
const weatherDataSection = document.querySelector("#weather-data");
const loadingSection = document.querySelector("#loading-section");

const requestOptions = {
	method: 'GET',
};

const API_KEY = `6409ee75b6ffc020adb31a565296a4bb`
const errorStatuses = ["404", 401, "400"];
let isLoading = false;
const arrayRequests = [];


const lastRequestedData = localStorage.getItem("weather-data")
? JSON.parse(localStorage.getItem("weather-data"))
: undefined;

lastRequestedData && renderWeather(lastRequestedData);

//цей варіант вимагає постійного звернення до серверу!!!
// const lastRequestedCity = localStorage.getItem("city");
//lastRequestedCity && getWeather(lastRequestedCity);


function getWeather(city) {
    isLoading = true;
    renderLoading(isLoading);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, requestOptions)
    	.then(response => response.json())
    	.then(response => {
            console.log(response, "response");
            //проверка на наличие ошибки
            if(errorStatuses.includes(response.cod)) {
                return renderError(response);
            };

            localStorage.setItem("city", city);
            localStorage.setItem("weather-data", JSON.stringify(response));
            arrayRequests.push(JSON.stringify(response));
            console.log("ARRAY", arrayRequests);

            // усли все хооошо - выводим
            renderWeather(response);
        })
    	.catch(err => console.log(err))
        .finally(() => {
            isLoading = false;
            renderLoading(isLoading);
        });
}

submitButton.onclick = () => {
    getWeather(cityInput.value);
}

function renderError (error) {
    weatherDataSection.innerHTML = `<h3>${error.message}</h3>`;
}

function renderLoading(isLoading) {
    loadingSection.innerHTML = isLoading ? `<h3>Loading</h3>` : "";
}

function renderWeather (data) {
    const {main, wind, sys, name} = data;
    const {feels_like, temp, temp_min, temp_max, pressure} = main;
    const {speed, deg, gust} = wind

    weatherDataSection.innerHTML = "";
    weatherDataSection.innerHTML = `
        <h3 id="description">Weather in ${name}</h3>
        <p>Temp: ${temp}C</p>
        <p>Feels like: ${feels_like}C</p>
        <span>${temp_min}C - ${temp_max}C</span>
        <p>Pressure: ${pressure}</p>
        
        <h3>Wind</h3>
        <span>Spid: ${speed}  </span>
        <span>Direction: ${deg}  </span>
        <span>Gust: ${gust}</span>
       
        
    `;
}