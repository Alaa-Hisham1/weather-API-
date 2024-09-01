//key --> c548260c76fc4035b84200634242708
var findLocationInput=document.getElementById('findLocation');
days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const date= new Date()
console.log(date.getHours())
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        getweatherInfo(`${pos.coords.latitude},${pos.coords.longitude}`)
    });
}
findLocationInput.addEventListener('input',function(val){
    
    getweatherInfo(val.target.value);
})
var weatherData;
async function getweatherInfo(location){
    
    var response= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=c548260c76fc4035b84200634242708`);
    var finalData= await response.json()
    weatherData=finalData
    console.log(weatherData);
    display();
}

function display(){
    const d2=new Date(weatherData.forecast.forecastday[1].date);
    const d3=new Date(weatherData.forecast.forecastday[2].date);
    var cartona=``;
    cartona=`
                <div class="day-month">
                    <p>${date.toLocaleString('en-us',{weekday:'long'})}</p>
                    <p>${date.getDate()+" "+ date.toLocaleString('en-us',{month:'long'})}</p>
                </div>
                <h5>${weatherData.location.name}</h5>
               <h1>${weatherData.current.temp_c+'°C'}
                    <img src=${"https:"+weatherData.current.condition.icon} alt="">
                </h1>
                
                
                <small>${weatherData.current.condition.text}</small>
                <div class="fina-info"> 
                    <div class="c1">
                    <img src="image/icon-umberella.png" alt="">
                    <span>${weatherData.current.humidity+'%'}</span>
                </div>
                <div class="c2">
                    <img src="image/icon-wind.png" alt="">
                    <span>${weatherData.current.wind_kph+'Km/h'}</span>
                </div>
                <div class="c3">
                    <img src="image/icon-compass.png" alt="">
                    <span>${weatherData.current.wind_dir}</span>
                </div>
                </div>
            `
        document.getElementById('today').innerHTML=cartona;
        
        cartona=`<div class="day"><p>${d2.toLocaleString('en-us',{weekday:'long'})}</p></div>
            <img src=${"https:"+weatherData.forecast.forecastday[1].hour[date.getHours()].condition.icon} alt="">
            <h5>${weatherData.forecast.forecastday[1].hour[date.getHours()].temp_c+'°C'}</h5>
            <p>${weatherData.forecast.forecastday[1].hour[date.getHours()].temp_f+'°'}</p>
            <small>${weatherData.forecast.forecastday[1].hour[date.getHours()].condition.text}</small>`;
        document.getElementById('tomorrow').innerHTML=cartona;   
        cartona=`<div class="day"><p>${days[d3.getDay()]}</p></div>
            <img src=${"https:"+weatherData.forecast.forecastday[2].hour[date.getHours()].condition.icon} alt="">
            <h5>${weatherData.forecast.forecastday[2].hour[date.getHours()].temp_c+'°C'}</h5>
            <p>${weatherData.forecast.forecastday[2].hour[date.getHours()].temp_f+'°'}</p>
            <small>${weatherData.forecast.forecastday[2].hour[date.getHours()].condition.text}</small>`
        document.getElementById('after-tomorow').innerHTML=cartona;  
}
