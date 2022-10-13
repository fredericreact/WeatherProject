const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

res.sendFile(__dirname+"/index.html")

});

app.post("/", function(req,res){
  console.log(req);
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey =process.env.API_TOKEN
  const unit ="metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=" +unit

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
        res.write("<h1>The temperature in "+query+" is: "+temp+"</h1>");
        res.write("<img src=" + imageURL + ">")
        res.send()
      })
    })

})



app.listen(3000,function(){
  console.log("server listening on port 3000");
});
