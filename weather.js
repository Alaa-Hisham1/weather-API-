//key -->  c548260c76fc4035b84200634242708
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos)
    })
}
else{
    alert('geo is not supported')
}
var locationInfo;
var weatherToday;
var nextWeather;
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saterday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const timeNow= new Date();
console.log(timeNow.getHours())
var findLocationInput=document.getElementById('findLocation');
console.log(findLocationInput);

findLocationInput.addEventListener('input',function(){
    getLocation();
})
async function getLocation(){
    var myLocation=findLocationInput.value;
    console.log(myLocation);
    var response= await fetch (` http://api.weatherapi.com/v1/search.json?key=c548260c76fc4035b84200634242708&q=${myLocation}`)
    var finalData= await response.json();
    locationInfo=finalData;
    console.log(locationInfo)
    if (locationInfo.length>0){
        getWeather();
    }
}

async function getWeather(){
    var myLocation=findLocationInput.value;
    console.log(myLocation);
    var response= await fetch (`http://api.weatherapi.com/v1/current.json?key=c548260c76fc4035b84200634242708&q=${locationInfo[0].name}`)
    var finalData= await response.json();
    weatherToday=finalData;
    console.log(weatherToday);
    allDays()
    
    
}
async function allDays(){
    
    var response= await fetch (` http://api.weatherapi.com/v1/forecast.json?key=c548260c76fc4035b84200634242708&q=${weatherToday.current.condition.code}&days=3`)
    var finalData= await response.json();
    nextWeather=finalData;
    
   console.log(nextWeather)
   displayToday()
}




function displayToday(){
    const d1= new Date(nextWeather.forecast.forecastday[0].date);
    const d2= new Date(nextWeather.forecast.forecastday[1].date);
    const d3= new Date(nextWeather.forecast.forecastday[2].date);
    
    var cartona=``;
    
        cartona+=`
        
            <div class="day-month">
                <p>${days[d1.getDay()]}</p>
                <p>${d1.getDate()+" "+months[d1.getMonth()] }</p>
            </div>
            <h3>${locationInfo[0].name}</h3>
            <div class='temp'><h1>${weatherToday.current.temp_c+"oC"}</h1></div>
             <img src=${"https:"+weatherToday.current.condition.icon} alt="">
            <small>${weatherToday.current.condition.text}</small>`;
    
    document.getElementById('today').innerHTML=cartona;
    cartona=``;
    cartona+=`
     <div class="day">
     <p>${days[d2.getDay()]}</p>
     </div>
            <img src=${"https:"+nextWeather.forecast.forecastday[1].hour[timeNow.getHours()].condition.icon } alt="">
            <h5>${nextWeather.forecast.forecastday[1].hour[timeNow.getHours()].temp_c +"oC"}</h5>
            <p>${nextWeather.forecast.forecastday[1].hour[timeNow.getHours()].temp_f +"o"}</p>
            <small>${nextWeather.forecast.forecastday[1].hour[timeNow.getHours()].condition.text }</small>`;
    document.getElementById('tomorrow').innerHTML=cartona;
    cartona=``;
    cartona+=`<div class="day"><p>${days[d3.getDay()]}</p></div>
            <img src=${"https:"+nextWeather.forecast.forecastday[2].hour[timeNow.getHours()].condition.icon }  alt="">
            <h5>${nextWeather.forecast.forecastday[2].hour[timeNow.getHours()].temp_c +"oC"}</h5>
            <small>${nextWeather.forecast.forecastday[2].hour[timeNow.getHours()].condition.text } </small>
        </div>`;
        document.getElementById('after-tomorow').innerHTML=cartona;  
}
// displayToday()
var help={
    hours:{number:'1'}
}