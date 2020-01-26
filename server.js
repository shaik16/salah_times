const express = require('express');
const bodyParser=require('body-parser');
const request=require('request');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT||"3000", () => {
    console.log(`Server started on port`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});
app.get('/index.js', (req, res) => {
    res.sendFile(__dirname+"/index.js");
});


app.post('/', (req, res) => {
    var current_location=req.body.location;
    var time=req.body.time;    
    request("https://muslimsalat.com/"+current_location+"/"+time+".json?key=bb0ed6858bcada962e0ec0640b721e97",(err,response,body) =>{
            var data=JSON.parse(body);
            var status=data.status_description;
            var status2=data.status_valid;
            if(status=="Failed." || status2!=1){
                res.sendFile(__dirname+"/error.html")
                app.post('/failure', (req, res) => {
                    res.redirect('/');
                });
            }
            else{
                var fajr=data.items[0].fajr;
                var zuhar=data.items[0].dhuhr;
                var asar=data.items[0].asr;
                var maghrib=data.items[0].maghrib;
                var isha=data.items[0].isha;
                var loc=data.query;
                var direction=data.qibla_direction;
                var country=data.country;
                var state=data.state;
                var city=data.city;
                res.send("<center><h1>Location Entered: "+loc.toUpperCase()+"</h1><h4>FAJR: "+fajr+"</h4><h4>ZUHAR: "+zuhar+"</h4><h4>ASAR: "+asar+"</h4><h4>MAGHRIB: "+maghrib+"</h4><h4>ISHA: "+isha+"</h4><h3>Qibla Direction: "+direction+"DEG</h3><h4>COUNTRY: "+country+"<h4><h4>STATE: "+state+"<h4><h4>CITY: "+city+"<h4></center>");
            }
    })
    
});





