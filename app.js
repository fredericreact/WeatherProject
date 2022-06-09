const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res){

const url = "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=935335d81af45262ce48fc472c52fbc5&units=metric"

  https.get(url,function (response){

    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon =weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

      console.log(temp);
      console.log(description);
      console.log(icon);


      // res.write a la place de res.send car on ne peut avoir qu'un seul res.send
      res.write("<p>"+description+"</p>");
      res.write("<h1>The temperature is: "+temp+"</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send()
    })
  })

});




app.listen(3000,function(){
  console.log("server listening on port 3000");
});
