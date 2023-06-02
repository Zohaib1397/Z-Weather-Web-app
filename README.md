# Web based weather application 

# Introduction
This weather application is built using HTML, Bootstrap CSS, Angular-JS, JQuery, JavaScript, and some custom cascading style sheet is used to make the front-end unique and eye catching. 
The application is using APIs to fetch both local and global weather. It also handles every possible exception in case of failure and display it accordingly. It is able to get the Geo location of the current device and get the local weather based on the longitude and latitude values. It has a daily forecast of 7-days.
# Features and Functional Requirements
This weather application is capable of fetching the real-time data from the APIs. Following are the features and functional requirements of this application.
1.	Get humidity Level along with its status.
2.	Get UV Index in the form of an animating slider.
3.	Get wind speed and wind direction in degrees.
4.	Find feels like weather temperature along with the percentage of clouds.
5.	Show the visibility level with the status.
6.	Find out the air quality along the status.
7.	Fetch daily Forecast of 7-days with expected temperature and feels like temperature in °C.
8.	Display correct time, day, random background image, weather description, city and country name, and rain precipitation in mm.
9.	Get current location of the device (Laptop or Phone), and display the weather based on the latitude and longitude.
10.	Have the ability to search any city around the globe and fetch the weather along with all of the above features. 
11.	Display the accurate weather icon based on the weather codes provided in APIs.
12.	It should be optimized for both desktop and mobile experience.

# Implementation
The front-end of the application is developed using HTML, Bootstrap CSS, and Angular-JS. The design is mainly developed using Bootstrap CSS. Custom CSS is also used for colors and hover effects etc. The design is fully optimized for mobile and desktop version (Using the structuring technique of container, rows, and columns). Some external scripts are also used such as roundSlider, which is being used for visualizing the UV Index range. Iconic representation is used to make the design feel elegant.
The values are set using the JQuery language from textual data to the image sources. The use of API is done using JavaScript and JQuery. The “fetch()” function is used to get the JSON record of weather by passing in either the longitude and latitude, or the city name. 
Due to the lack of free open-source APIs, we used multiple APIs from different websites to get different functionalities such as for just UV Index, we are using an API from Open-Meteo (A free source for weather APIs). For daily forecast of 7-days there is an API provided by OpenWeatherMap. For air quality there was another API by OpenWeatherMap is used to get the concentration of SO2, NO2, PM10, PM2.5, O3, and CO present in the air to determine its quality and give the status based on it, the AQI (Air Quality Index) also helps in determining the quality of the air.  



<img width="315" alt="image" src="https://github.com/Zohaib1397/Z-Weather-Web-app/assets/66197508/06a421e4-0f4a-4747-ba10-27e0240cbaf8">
