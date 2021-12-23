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

    let historybutton=document.createElement("button");
    historybutton.addEventListener("click",() => {
        GetWeatherdata(city);
    })
    historybutton.innerText=city;
    document.getElementById("searchhistory").appendChild(historybutton);
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
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}}&lon=${data.coord.lon}&appid=2a962a7b9345f5d3ab23257ed8d563d6

    `)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("uvindex").innerText=""
       
    }) 
    .catch(e => {
        console.error(e)
    }) 
    return "loading"
}
function displayoneday(daydata,Index){
    let view=document.createElement("div")
    view.innerHTML=`
    <div> ${new Date(daydata.dt_txt).toDateString()}</div>
    <div> ${displayicon(daydata)} </div>
    <div> ${displaytemperature(kelvintofahrenheit(daydata.main.temp))}</div>
    <div> ${daydata.wind.speed + " MPH"}</div>
    <div> ${daydata.main.humidity + " % "}</div>

    `
    return view 
}

function display5dayforecast(data){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=2a962a7b9345f5d3ab23257ed8d563d6
    `)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("5dayforecast").innerText=""
        data.list.forEach((day,Index) =>{
            if (Index % 8 == 0 ) {
                let view=displayoneday(day,Index/8 + 1)
                document.getElementById("5dayforecast").appendChild(view)   
            }
        
        } ) 
    }) 
    .catch(e => {
        console.error(e)
    }) 


return "loading"
}

function displayicon (data) {
    return `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
    `
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
    e.innerHTML = text;


    let container =document.getElementById(id);
    container.setAttribute("class", "weather_ele");
    container.innerHTML = `<span>${title}</span>`;
    container.appendChild(e);
}

