#!/bin/env node
var express = require('express');
var sinesp = require('sinesp-nodejs');
var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('site', 'https://github.com/wgenial/consulta-placa');

app.get("/", function(req, res, next) {
  res.redirect(app.get('site'));
});

app.get("/:plate", function(req, res, next) {
  var plate = req.params.plate.replace(/\-/g,'');
  sinesp.consultaPlaca(plate, function(response) {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    res.json(response);
  });
});

app.listen(app.get('port'), app.get('ip'), function() {
  return console.log("Listening on " + app.get('port') + "\nPress CTRL-C to stop server.");
});

exports = module.exports = app;