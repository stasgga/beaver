var express = require('express')
var app = express()
var fs = require('fs')

var frame = require('./src/framebuilder')
var svg = require('./src/svg')

app.get('/', function(req, res){
  res.send('hello world')
})

app.get('/save/:width/:height', function(req, res) {
  fs.writeFile("test", svg.wrapper(frame.build(req.params.width, req.params.height)), function(err) {
    if(err) {
      return console.log(err)
    }
    console.log("The file was saved!")
  })
  res.send('saved')
});

app.get('/get', function(req, res) {
  res.download('test', 'frame.svg')
})

app.listen(4000)
