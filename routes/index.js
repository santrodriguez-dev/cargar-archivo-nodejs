var express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())
// var router = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/update-file', function (req, res, next) {
  console.log(req.body);
  
  res.json(req.body)
});


module.exports = app;
