const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '1dea2c68593d6bd760ab9df38371bddc';

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index', {weatherT: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
	console.log(error);
        res.render('index', {weatherT: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weatherT: weatherText, error: null});
      
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
