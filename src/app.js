import express from 'express'
import fs from 'fs'

import build from './framebuilder'
import svg from './svg'
import { frameBox } from './blueprint/index'

var app = express()

app.get('/', function(req, res){
  res.send('hello world')
})

app.get('/save/:width/:height', function(req, res) {
  fs.writeFile("test", svg(frameBox(req.params.width, req.params.height)), function(err) {
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
