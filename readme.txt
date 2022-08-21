Just a simple weather api with basic html,css and Just
used rapidapi/ioweather api for the datas
made a simple dropdown with three cities

code Flow:
    select a city
    form transfer the value to assignLatLon() which is a program hit of the form eventlistener eventlistener
    in assignLatLon(),it calls the get_approrpiate_weather(url,api options) which makes the fetch logic and stores the response as json
    then after that method, an internal call to the displayweather() which populates the needed data into DOM objects. 