Just a simple weather api with basic html,css and Just
used rapidapi/ioweather api for the datas
made a simple dropdown with three cities

code Flow:
    select a city
    form transfer the value to assignLatLon() which is a program hit of the form eventlistener eventlistener
    in assignLatLon(),it calls the get_approrpiate_weather(url,api options) which makes the fetch logic and stores the response as json
    then after that method, an internal call to the displayweather() which populates the needed data into DOM objects. 


// after second commit
Problems:
    1) made data populated through table thus making them responsive using flex|grid would be difficult.
    2) API doesn't provide min/max,humidity temparature thus the weather slider couldn't have the min/max temp view.. thus single temparature alone possible.
    3)weather map would be difficult to do with this api.


solutions:
