import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.open-meteo.com/v1/forecast";

const weatherType = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Light Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",
    77: "Snow Grains",
    80: "Light Rain Showers",
    81: "Moderate Rain Showers",
    82: "Heavy Rain Showers",
    85: "Light Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail"
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.error(error.response.data);
        // console.error(error.message);
    }
})

app.post("/", async (req, res) => {
    try {
        const currentTime = await axios.get(API_URL, {
            params : {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                current: ""
            }
        });
        const result = await axios.get(API_URL,{
            params : {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                minutely_15: ["temperature_2m", "weather_code", "wind_speed_10m", "apparent_temperature", "relative_humidity_2m", "visibility"],
                start_minutely_15: currentTime.data.current.time,
                end_minutely_15: currentTime.data.current.time
            }
        });
        res.render("index.ejs", {
            temperature: Math.ceil(result.data.minutely_15.temperature_2m),
            wind: Math.ceil(result.data.minutely_15.wind_speed_10m),
            humidity: result.data.minutely_15.relative_humidity_2m,
            weatherType: weatherType[result.data.minutely_15.weather_code],
            feelsLike: Math.ceil(result.data.minutely_15.apparent_temperature),
            visibility: Math.ceil(result.data.minutely_15.visibility / 10000)
        });
    } catch (error) {
        console.error(error.response.data);
        // console.error(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});