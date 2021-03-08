var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

let  meaningCloud   = require('./meaning-cloud');
app.use(cors());
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.listen(8080,function(){
    console.log("Server running on port 8080..")
});

app.get('/',function(req,res){
    res.sendFile('index.html');
});


app.post('/api',async function(req,res){
    let url = req.body.url;
    let result = await meaningCloud.ExecuteApi(url);
    //let result = 'typicalApiResponseText';
    console.log(`Meaning Cloud API returned successfully.`);
    console.log(result);
    res.writeHead(200,{'content-type':'application/json'});
    res.end(result);
    });
    
    
