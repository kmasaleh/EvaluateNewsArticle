var path = require('path');
const express = require('express');
const app = express();

const dotenv = require('dotenv');

dotenv.config();
const  meaningCloud = {
    application_key : process.env.API_KEY
}

console.log(`Meaning Cloud API Key is ${meaningCloud.application_key}`);
app.use(express.static('dist'))

console.log(__dirname);

app.listen(8080,function(){
    console.log("Server running on port 8080..")
});


app.get('/',function(req,res){
//    res.sendFile('index.html',{root:'D:/Projects/Workshop/WebDev/FrontEnd/Udacity/Frontend Advanced Track/EvaluateNewsArticle/dist/client/views'});
    res.sendFile('index.html');
});
app.get('/api',function(req,res){
    //    res.sendFile('index.html',{root:'D:/Projects/Workshop/WebDev/FrontEnd/Udacity/Frontend Advanced Track/EvaluateNewsArticle/dist/client/views'});
        res.send(`Meaning Cloud API Key is ${meaningCloud.application_key}`);
    });
    
    
