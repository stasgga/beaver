import express from 'express'
import fs from 'fs'

import build from './framebuilder'
import svg from './svg'
import { frameBox, basicFrame } from './blueprint/index'

import cors from 'cors'

var app = express()

app.use(cors())

var path = process.env.PWD


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
})

app.get('/basic/:width/:height', function(req, res) {
  let filename = `${path}/cache/${req.params.width}-${req.params.height}.json`
  let data = {}
  fs.exists(filename, (exists) => {
    if(exists) {
      data = require(filename)
    } else {
      data = basicFrame(req.params.width, req.params.height)
      fs.writeFile(filename,JSON.stringify(data), function(err) {
        if(err) { return console.log(err) }
        console.log("The file was saved!")
      })
    }
    res.send(data)
  })
})

app.get('/get', function(req, res) {
  res.download('test', 'frame.svg')
})

app.listen(4000);