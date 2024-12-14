# weather-time

WeatherTime - by Adil Sheikh

Provides the user with the weather forecast using public API as per latitude and longitude

About:

WeatherTime is primarily made using express.js and axios with node.js. It takes input from user in latitude and longitude and they are sent to backend. Then an axios get request is made to the public API - Open-Meteo and latitude and longitude are passed as parameters. A response is received from the API provider with the weather information which is then rendered to front-end and provides weather forecast to the user.

How to use:

1. After downloading the files, change directory to the working directory in the terminal.
2. Install packages from npm using command - npm i
3. Run the server using command - nodemon index.js
4. If you don't have nodemon, either install it or use this command in step 3 - node index.js
5. Open the url in the browser, enter latitude and longitude, click on submit and enjoy the weather forecast!

Thanks:

Open-Meteo - for providing the public API which is easy to use and provides detailed weather information!