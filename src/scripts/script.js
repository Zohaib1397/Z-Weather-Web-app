var today = new Date();
const weekday = ["Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,"];
var mainController = angular.module('weatherApp', []);
mainController.controller('datCtrl', function($scope) {
    $scope.day = weekday[today.getDay()].toUpperCase();
    $scope.time = today.getHours()+":"+today.getMinutes();
    
});
mainController.controller('searchCtrl', function($scope) {
    $scope.searchField = '';
    var searchText = $scope.searchField;
    $scope.searchCity = function(){ 
        searchText = $scope.searchField;
        if(searchText!=''){
            LocateCity(searchText);
        }
    }
});
const weather_icons = [
    "Weather Icons/01d.png",
    "Weather Icons/02d.png",
    "Weather Icons/03d.png",
    "Weather Icons/04d.png",
    "Weather Icons/10d.png",
    "Weather Icons/11d.png",
    "Weather Icons/13d.png",
    "Weather Icons/50d.png",
    "Weather Icons/01n.png",
    "Weather Icons/02n.png",
    "Weather Icons/03n.png",
    "Weather Icons/04n.png",
    "Weather Icons/10n.png",
    "Weather Icons/11n.png",
    "Weather Icons/13n.png",
    "Weather Icons/50n.png",
];
$('#weatherImage').attr('src',weather_icons[0]);
$('.main-weather-image').attr('src',weather_icons[0]);
const getWeekDays = document.getElementsByClassName("day");
const weeklyWeatherImages = document.getElementsByClassName("main-weather-image");
const setMaxForcast = document.getElementsByClassName("max-forcast");
const setMinForcast = document.getElementsByClassName("min-forcast");

var alignedDays = weekday.slice(today.getDay()+1,weekday.length).concat(weekday.slice(0,today.getDay()));
for(const day in alignedDays){
    getWeekDays[day].innerHTML = alignedDays[day].substring(0,3);
}

const demoElement = document.getElementById("demo");
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position){
                setLocation(position.coords.latitude,position.coords.longitude);
            }
        );
    } else {
        $('#demo').html("Geolocation is not supported by this browser.");
    }
}

function setLocation(latitude,longitude){
    fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&daily=temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum&current_weather=true&timezone=auto')
        .then(res=> {
            if(res.status==200){
                return res.json();
            }
        })
        .then(data=>{
            const weatherRecord =data;
            $('#myRange').roundSlider('option', 'value', weatherRecord.daily.uv_index_max[0]);
            $("#preciptation").html("Rain - " +weatherRecord.daily.rain_sum[0]+" "+ weatherRecord.daily_units.rain_sum);
            $("#currentTemp").html(parseFloat(weatherRecord.current_weather.temperature).toFixed(0));
        })
        .catch(error =>{
            console.log(error);
        });
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey)
        .then(res=>{
            if(res.status == 200){
                return res.json();
            }
        })
        .then(data=>{
            const weatherData = data;
            // $("#currentTemp").html(parseFloat(parseFloat(weatherData.main.temp)-273.15).toFixed(0));
            $("#currentHumidity").html(weatherData.main.humidity);
            $('#weatherImage').attr('src',fetchWeatherIcon(weatherData.weather[0].icon.substring(0,2) + "d"));
            FindHumidityLevel(weatherData.main);
            $("#currentFeelsLike").html(parseFloat(parseFloat(weatherData.main.feels_like)-273.15).toFixed(0));
            $("#feelDescription").html("Clouds - "+ weatherData.clouds.all+"%");
            $("#windSpeed").html(parseFloat(weatherData.wind.speed).toFixed(1));
            $("#windDirection").html(parseFloat(weatherData.wind.deg).toFixed(1)+"°");
            $("#currentVisibility").html(parseFloat(parseFloat(weatherData.visibility)/1000).toFixed(1));
            FindVisibilityLevel(weatherData.visibility);
            $("#weatherDescription").html(weatherData.weather[0].description);
            $("#city-country").html(weatherData.name+", "+weatherData.sys.country);
        })
        .catch(error =>{
            console.log(error);
        });
    fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+latitude+'&lon='+longitude+'&appid='+apiKey)
        .then(res=>{
            if(res.status == 200){
                return res.json();
            }
        })
        .then(data=>{
            const airData = data;
            $("#airQualityDescription").html(air_Quality[airData.list[0].main.aqi]);
            FindAirQuality(airData.list[0].components);
        })
        .catch(error =>{
            console.log(error);
        });
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid='+apiKey)
        .then(res=>{
            if(res.status==200){
                return res.json();
            }
        })
        .then(data=>{
            const forcastRecord = data;
            console.log(data);
            FindWeekTemperature(forcastRecord.list);
        })
}
function LocateCity(cityName){
    console.log(cityName);
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey)
    .then(res =>{
        if(res.status==200){
            return res.json();
        }else if(res.status==404){
            $('#demo').html("Something Went Wrong");
        }
    })
    .then(data =>{
        setLocation(data.coord.lat,data.coord.lon);
    })
    .catch(err=>{
        $('#demo').html(err+" Something Went Wrong");
    })
}
function FindWeekTemperature(data){
    // weekday is an array of string containing sunday, monday, tuesday etc.
    var index=0;
    for(const count in data.list){
        if(data.list[count].dt_txt.substring(11,13)=="00"){
            index=count;
            break;
        }
    }
    for(const day in weekday){
        if(day==5){
            console.log(fetchWeatherIcon((data[index-1].weather[0].icon).substring(0,2) + "d"));
            weeklyWeatherImages[day].src = fetchWeatherIcon((data[index-1].weather[0].icon).substring(0,2) + "d");
            setMaxForcast[day].innerHTML = parseFloat(parseFloat(data[index-1].main.temp)-273.15).toFixed(0)+"°";
            setMinForcast[day].innerHTML = parseFloat(parseFloat(data[index-1].main.feels_like)-273.15).toFixed(0)+"°";
            break;
        }
        weeklyWeatherImages[day].src = fetchWeatherIcon((data[index].weather[0].icon).substring(0,2) + "d");
        setMaxForcast[day].innerHTML = parseFloat(parseFloat(data[index].main.temp)-273.15).toFixed(0)+"°";
        setMinForcast[day].innerHTML = parseFloat(parseFloat(data[index].main.feels_like)-273.15).toFixed(0)+"°";
        index= index+8;
    }
}
function FindAirQuality(data){
    var max=0;
    for(const concentration in data){
        if(max <= data[concentration]){
            max = data[concentration];
        }
    }
    $("#airQuality").html(parseFloat(max).toFixed(0));
}
function FindHumidityLevel(data){
    for(const level in humidity_Level.humidity){
        const checkRange = humidity_Level.humidity[level];
        if(data.humidity >= checkRange.range[0] && data.humidity <= checkRange.range[1]){
            $("#humidityDescription").html(level);
            break;
        }
        
    }
}
function FindVisibilityLevel(data){
    for(const level in visibiltyRange.condition){
        const checkRange = visibiltyRange.condition[level];
        if(data >= checkRange.range[0] && data <= checkRange.range[1]){
            $("#visibilityDescription").html(level);
            break;
        }
    }
}
const air_Quality = {
    1 : "Good",
    2: "Fair",
    3: "Moderate",
    4:"Poor",
    5:"Very Poor"
}
const humidity_Level = {
    "humidity" : {
        "Very Low" : {
            "range" : [0,24]
        },
        "Fairly Low" : {
            "range" : [25,29]
        }, 
        "Normal" : {
            "range" : [30,59]
        },
        "Fairly High" : {
            "range" : [60,69]
        },
        "Very High" : {
            "range" : [70,100]
         }
    }
};
const visibiltyRange ={
    "condition" :{
        "Dense Fog":{
            "range" : [0,49]
        },
        "Thick Fog":{
            "range" : [50,199]
        },
        "Moderate Fog":{
            "range" : [200,499]
        },
        "Light Fog":{
            "range" : [500,999]
        },
        "Thin Fog":{
            "range" : [1000,1999]
        },
        "Haze":{
            "range" : [2000,3999]
        },
        "Light Haze":{
            "range" : [4000,9999]
        },
        "Clear":{
            "range" : [10000,19999]
        },
        "Very Clear":{
            "range" : [20000,49999]
        },
        "Exceptionally Clear":{
            "range" : [50000,276999]
        },
        "Pure Air":{
            "range" : [277000,2770000]
        }
    }
};

function fetchWeatherIcon(SubString){
    for(const weather in weather_icons){
        if(weather_icons[weather].substring(14,17)==SubString){
            return weather_icons[weather];
        }
    }
}
// The following code snippit is used as a UV Index RoundSlider Script
var initialValue= 12;
$(document).ready(function(){
    getLocation();
    $("#myRange").roundSlider({
        min:0,
        max:12,
        step:0.1,
        sliderType: "min-range",
        handleSize:0,
        width: 40,
        radius: 100,
        value: initialValue,
        circleShape:"half-top",
        editableTooltip:false,
        change: getLocation,
        readOnly:true,
    });
});
