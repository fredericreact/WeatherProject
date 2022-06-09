const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res){

const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=935335d81af45262ce48fc472c52fbc5&units=metric"

  https.get(url,function (response){

    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      console.log(temp);
      console.log(description);

    })
  })

  res.send("Hello");
});




app.listen(3000,function(){
  console.log("server listening on port 3000");
});
