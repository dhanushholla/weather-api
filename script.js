var lat=0,lon=0;
var handle=document.getElementById("form")

//FLOW: FORM VALUE TO changeUrl()->GET_APPR_FETCH_METHODS--RESULT->JSON() ---> FINAL DISPLAY() THAT POPULATES IN WINDOW DOM OBJECTS 

//changes latitude and longitude and calls the getappropriate fetch methods with fn call which in turn calls the display methods aprropriately from fetch hit methods
handle.addEventListener("submit",assignLatLon)
function assignLatLon(event){
    let obtval=document.getElementById("city").value
    if(obtval==="chennai")
    {
        lat=80.27
        lon=13.08
        changeUrl(lat,lon)
        if(getCurrentWeather(currentWeatherURL,options))
        {
        getDaysWeather(daysWeatherURL,opt);
        }
    }
    else if(obtval=="bangalore")
    {
        lat=77.59
        lon=12.97
        changeUrl(lat,lon)
       if(getCurrentWeather(currentWeatherURL,options))
       {
        getDaysWeather(daysWeatherURL,opt);
       }
    }
    else if(obtval=="mumbai")
    {
        lat=72.87 
        lon=19.07
        changeUrl(lat,lon)
        if(getCurrentWeather(currentWeatherURL,options))
        {
        getDaysWeather(daysWeatherURL,opt);
        }
    }
    else
    {
        //console.log(("NA option selected"));
    }
    event.preventDefault();
}
//fetch creds for current weather call
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c7597d4dcmsha7e8b7933474a5dp18084fjsn575a2c6ae84b',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

//fetch creds for next 16 days weather call
const opt = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c7597d4dcmsha7e8b7933474a5dp18084fjsn575a2c6ae84b',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};




// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '15b9b6512fmsh365ea98e44638c2p169231jsn532f913f8ea3',
// 		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
// 	}
// };


//fetch direct call hit from the form value
var getCurrentWeather= async(currentWeatherURL,options)=>
{
    console.log(currentWeatherURL);
    var response= await fetch(currentWeatherURL,options);
    var result= await response.json();
    console.log(result);
    currentWeatherDisplay(result);
}
var getDaysWeather= async(daysWeatherURL,options)=>
{
    console.log(daysWeatherURL);
    var response= await fetch(daysWeatherURL,options);
    var result= await response.json();
    console.log(result);
    DaysWeatherDisplay(result);
}
const changeUrl =(a,b) =>{
    currentWeatherURL=`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${a}&lat=${b}`
    daysWeatherURL=`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${b}&lon=${a}`
}


//displaying methods for the retrieved jsonified objects
function currentWeatherDisplay(result)
{
    console.log(result);
    var body =document.getElementById("body")
    var table=document.createElement("table")
    var row=document.createElement("tr")
    var weathertd=document.createElement("td")
    var propstd=document.createElement("td")
    var subpropstr=document.createElement("tr")
    var subpropstd=document.createElement("td")
    var locationtd=document.createElement("td")
    locationtd.colSpan = "5";
    var desctr=document.createElement("tr")
    var desctd=document.createElement("td")
    var datetr=document.createElement("tr")
    var datetd=document.createElement("td")
    var icontd=document.createElement("td")
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()];
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;
    desctd.textContent="description:"+result.data[0].weather.description
    weathertd.textContent=result.data[0].temp+ " C "
    propstd.textContent= " wind:"+ result.data[0].wind_spd + " km/hr " 
    subpropstd.textContent= "precipitation:" +result.data[0].precip +" % "
    locationtd.textContent=result.data[0].city_name + " city "
    datetd.textContent= day + "," +time
    if(result.data[0].weather.description.includes("thunderstorms")|| result.data[0].weather.description.includes("rain"))
    {
        var image = document.createElement("img");
        image.src= "images/rain.png";
        icontd.appendChild(image);
    }
        
    else if(result.data[0].weather.description.includes("cloud"))
    {
        var image = document.createElement("img");
        image.src= "images/partly_cloudy.png";
        icontd.appendChild(image);
    }
    else if(result.data[0].weather.description.includes("snow"))
    {
        var image = document.createElement("img");
        image.src= "images/snow.png";
        icontd.appendChild(image);

    }
    else if(result.data[0].weather.description.includes("fog"))
    {
        var image = document.createElement("img");
        image.src= "images/fog.png";
        icontd.appendChild(image);
    }
    else if(result.data[0].weather.description.includes("sun"))
    {
        var image = document.createElement("img");
        image.src= "images/sunny.png";
        icontd.appendChild(image);
    }
    else{
        alert("NA weather!!");
    }
    desctr.appendChild(desctd) 
    datetr.appendChild(datetd)
    locationtd.appendChild(desctr)
    locationtd.appendChild(datetr)
    subpropstr.appendChild(subpropstd)
    propstd.appendChild(subpropstr)
    row.appendChild(icontd)
    row.appendChild(weathertd)
    row.appendChild(propstd)    
    row.appendChild(locationtd)
    table.appendChild(row)
    body.appendChild(table)
}



function DaysWeatherDisplay(result)
{
    var body =document.getElementById("body")
    var sliderWrapper=document.createElement("div");
    var table1 = document.createElement("table")
    var table1Row = document.createElement("tr")
    console.log(result);
    result.data.forEach(element => {
        var table1Data = document.createElement("td");
        table1Data.innerText = element.temp
        var table1SubRow = document.createElement("tr");
        var table1SubData = document.createElement("td");
        
        if(element.weather.description.includes("thunderstorms")|| element.weather.description.includes("rain"))
        {
            var image = document.createElement("img");
            image.src= "images/rain.png";
            table1SubData.appendChild(image);
        }
            
        else if(element.weather.description.includes("cloud"))
        {
            var image = document.createElement("img");
            image.src= "images/partly_cloudy.png";
            table1SubData.appendChild(image);
        }
        else if(element.weather.description.includes("snow"))
        {
            var image = document.createElement("img");
            image.src= "images/snow.png";
            table1SubData.appendChild(image);
    
        }
        else if(element.weather.description.includes("fog"))
        {
            var image = document.createElement("img");
            image.src= "images/fog.png";
            table1SubData.appendChild(image);
        }
        else if(element.weather.description.includes("sun"))
        {
            var image = document.createElement("img");
            image.src= "images/sunny.png";
            table1SubData.appendChild(image);
        }
        else{
            alert("NA weather!!");
        }
       // table1SubData.innerText = element.weather.description;
        
        table1SubRow.appendChild(table1SubData);
        table1Data.appendChild(table1SubRow);
        table1Row.appendChild(table1Data);
    });
    table1.appendChild(table1Row);
    sliderWrapper.appendChild(table1);
    body.appendChild(sliderWrapper);
    sliderWrapper.classList.add("table1style");
}














//SCRAPS:




// function DaysWeatherDisplay(result)
// {
//     var body =document.getElementById("body")
//     var table1 = document.createElement("table")
//     var table1Row = document.createElement("tr")
//     console.log(result);
//     result.data.forEach(element => {
//         var r1 = document.createElement("tr")
//         var table1Data = document.createElement("td");
//         table1Data.innerText = element.temp
//         r1.appendChild(table1Data)
//         var r2 = document.createElement("tr")
//         var table1SubData = document.createElement("td");
//         table1SubData.innerText = element.weather.description;
//         r2.appendChild(table1SubData)
//     });
//     table1.appendChild(table1Row);
//     body.appendChild(table1);
// }

//function currentWeatherDisplay(result)
// {
//     console.log(result);
//     var body =document.getElementById("body")
//     console.log(body);
//     var wrapper=document.createElement("div")
//     var temparature=document.createElement("span")
//     var windspeed=document.createElement("span")
//     var cityname=document.createElement("span")
//     var weatherdesc=document.createElement("span")
//     var precipitation=document.createElement("span")
//     temparature.innerText=result.data[0].temp + " Celcius "
//     windspeed.innerText=result.data[0].wind_spd + " km/hr "
//     cityname.innerText=result.data[0].city_name + " city "
//     weatherdesc.innerText=result.data[0].weather.description + " situation "
//     precipitation.innerText=result.data[0].precip +" % "
//     temparature.classList.add("temp-span")
//     windspeed.classList.add("windspeed-span")
//     cityname.classList.add("cityname-span")
//     weatherdesc.classList.add("weatherdesc-span")
//     precipitation.classList.add("precipitation-span")
//     wrapper.appendChild(temparature)
//     wrapper.appendChild(windspeed)
//     wrapper.appendChild(cityname)
//     wrapper.appendChild(weatherdesc)
//     wrapper.appendChild(precipitation)
//     wrapper.classList.add("wrapper-style");
//     body.appendChild(wrapper)
// }
