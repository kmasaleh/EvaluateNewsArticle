var https = require('follow-redirects').https;
const dotenv = require('dotenv');
dotenv.config();
 const  meaningCloud = {
    application_key : process.env.API_KEY
}




function ExecuteApi(url){
   var options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': `/sentiment-2.1?key=${meaningCloud.application_key}&lang=en&url=${url}`,
    'headers': {
    },
    'maxRedirects': 20
  };

  return new Promise( (resolve,reject)=>{
    var req = https.request(options, function (res) {
        var chunks = [];
    
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
    
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          let text = body.toString();
          resolve(text);
        });
    
        res.on("error", function (error) {
          console.error(error);
          reject(error);
        });
      });
    
      req.end();
  });
}


module.exports.ExecuteApi = ExecuteApi;



