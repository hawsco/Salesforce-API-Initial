var express = require('express');
var bodyParser = require('body-parser'); 

var favicon = require('serve-favicon');
var path = require('path');

var sfData = require('./Salesforce/data');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

app.get('/',(req,res)=>{

  res.send('<h1>Salesforce API!!! </h1>')

});

app.get('/data/:type', (req, res) => {


  sfData.accounts(req.params.type).then(

    (data)=>{

      res.send(JSON.stringify(data,undefined,2));
     // console.log({data});
    },
    (err)=>{
      res.status(400).send(err);
    }

  ).catch((err)=>{
    res.status(400).send(err);
  })


 });

 app.listen(port, () => {
  console.log(`Server started at port ${port}..`);
});




