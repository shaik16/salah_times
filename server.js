const express = require('express');
const bodyParser=require('body-parser');
const request=require('request');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT||"3000", () => {
    console.log(`Server started on port`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});


app.post('/', (req, res) => {
    var current_location=req.body.location;
    var time=req.body.time;
    console.log(time);
    
    request("https://muslimsalat.com/"+current_location+"/"+time+".json?key=bb0ed6858bcada962e0ec0640b721e97",(err,response,body) =>{
        var data=JSON.parse(body);
        var fajr=data.items[0].fajr;
        var zuhar=data.items[0].dhuhr;
        var asar=data.items[0].asr;
        var maghrib=data.items[0].maghrib;
        var isha=data.items[0].isha;
        var loc=data.query;
        var direction=data.qibla_direction;
        res.send("<center><h1>Location: "+current_location.toUpperCase()+"</h1><h4>FAJR: "+fajr+"</h4><h4>ZUHAR: "+zuhar+"</h4><h4>ASAR: "+asar+"</h4><h4>MAGHRIB: "+maghrib+"</h4><h4>ISHA: "+isha+"</h4><h3>Qibla Direction: "+direction+"DEG</h3></center>");
    })
    
});