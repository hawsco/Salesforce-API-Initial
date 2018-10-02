var express = require('express');
var bodyParser = require('body-parser'); 

var sfData = require('./Salesforce/data');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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




