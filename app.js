const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res)=>{
    
    const query = req.body.cityName;
    const key = "290e37d625b8b74e9a7208fda2afef90" 
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ key + "&units=" + unit; 
    https.get(url, (response) => {
    response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDiscription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imgUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
        res.write("<p> The weather is currently " + weatherDiscription + "</p>")
        res.write("<h1> The wheaterh of "+ query +" is " + temp + "</h1>");
        res.write("<img src =" + imgUrl + ">");
        res.send();
    })
})
})

// 

app.listen("3000", ()=>{
    console.log("Server 3000");
});






// 290e37d625b8b74e9a7208fda2afef90