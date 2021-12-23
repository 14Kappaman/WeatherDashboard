fetch ("https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=2a962a7b9345f5d3ab23257ed8d563d6")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    }) 
    .catch(e => {
        console.error(e)
    }) 

function searchbutton() {
    let city=document.getElementById("searchtext").value;
    GetWeatherdata(city);
}

function GetWeatherdata(city) {
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a962a7b9345f5d3ab23257ed8d563d6`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayweather(data)
    }) 
    .catch(e => {
        console.error(e)
    }) 
}

function displayweather(data){
   
    display ("date", new Date().toDateString(), "Today Is ")
    display ("icon", displayicon(data), "")
    display ("temperature", displaytemperature(kelvintofahrenheit(data.main.temp)), "")
    display ("humidity", data.main.humidity + "%", "Humidity ")
    display ("windspeed", data.wind.speed + "MPH", "Windspeed ")
    display ("uvindex", displayuv (data), "UV Index ")
    display ("5dayforecast", display5dayforecast (data), "5-Day Forecast ")
}

function displayuv(data){
    return "loading"
}

function display5dayforecast(data){
return "loading"
}

function displayicon (data) {
    return "icongoeshere"
}
function displayerror(){}
function kelvintocelsius(kelvin){
    let celsius = kelvin - 273.15;
    return celsius;

}
function  celsiustofahrenheit(celsius){
    let fahrenheit = celsius * 9/5 + 32;
    return fahrenheit;

}
function kelvintofahrenheit (kelvin){
    return celsiustofahrenheit(kelvintocelsius(kelvin));
    
}
function displaytemperature(temp){
    return temp.toFixed(1) + "°" + "F"
}
function display(id,text, title) {
    let e = document.createElement("span");
    e.innerText = text;


    let container =document.getElementById(id);
    container.setAttribute("class", "weather_ele");
    container.innerHTML = `<span>${title}</span>`;
    container.appendChild(e);
}

