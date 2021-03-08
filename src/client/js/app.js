/**
 * @class - Represents the App model.
 */
export class App {
    /**
     * @constructor
     * @description - Hooks the essential event handlers.
     */
    constructor(){
        console.log(`class App ctor() called........`);
        this.submitButton = document.querySelector('#submit');
        this.urlInput = document.querySelector('#url');
        this.urlErrorMsg = document.querySelector('#url-validation');
        this.resultDiv = document.getElementsByClassName('results-container')[0];
        this.loader = document.getElementsByClassName('loader')[0];
        
        this.score = document.querySelector('#score .tagValue');
        this.agreement = document.querySelector('#agreement .tagValue');
        this.subjectivity = document.querySelector('#subjectivity .tagValue');
        this.confidence =  document.querySelector('#confidence .tagValue');
        this.irony = document.querySelector('#irony .tagValue');

        let That =this;
        this.submitButton.addEventListener('click',function(){
            if(That.checkUrlValidation())
                That.getApiResult();
        });
        this.urlInput.addEventListener('keydown',function(evt){
            let ok = That.checkUrlValidation();
            if(evt.key==="Enter"){
                if(ok)
                That.getApiResult();
            }
        });
        this.urlInput.addEventListener('change',(evt)=>{
            That.checkUrlValidation();
        });

    }


    checkUrlValidation(){
         let text = this.urlInput.value;   
         let result =this.is_valid_url(text);

         this.resultDiv.style.display ='none';
         if(result){
             this.urlErrorMsg.style.display  ='none';
             this.submitButton.style.display  ='inline-block';
         }
         else{
            this.urlErrorMsg.style.display  ='block';
            this.submitButton.style.display  ='none';
         }
         return result;
    }


    is_valid_url(str){
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
          return true;
        else
          return false;
    }

     getApiResult(){

        this.loader.style.display ='block';
        this.resultDiv.style.display='none';
/*
        setTimeout(()=>{
            this.resultDiv.style.display ='block';
            document.getElementById("json").innerHTML = `
            const init = {
                method: 'POST',
                credintials : 'same-origin',
                headers: {'content-type':'application/json'},
                body:JSON.stringify(payload)
            };
            `;  
            this.loader.style.display ='none';
        },4000);

*/
        //const url = `${self.origin}/api?url=${this.urlInput.value}`; 

        const payload = {
            url : this.urlInput.value
        };

        //Push it to the Server.
        const init = {
            method: 'POST',
            credintials : 'same-origin',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(payload)
        };
        /*        */  
        fetch('/api',init)
        .then(response=>  response.text())
        .then(data=>{
                let object  = JSON.parse(data);
                let tagsInfo = {
                    score:object.score_tag,
                    agreement:object.agreement,
                    subjectivity:object.subjectivity,
                    confidence:object.confidence,
                    irony:object.irony
                }
                this.updateTags(tagsInfo);

                
/*
"score_tag":"NEU",
"agreement":"DISAGREEMENT",
"subjectivity":"SUBJECTIVE",
"confidence":"86",
"irony":"NONIRONIC",
*/

                
                
                
                
                
                let json = JSON.stringify(object,null,2);
                this.resultDiv.style.display ='block';
                document.getElementById("json").innerHTML = json;  
                this.loader.style.display ='none';
            })
    }

    updateTags(info){
        this.score.innerHTML = info.score;
        this.agreement.innerHTML =info.agreement ;
        this.subjectivity.innerHTML = info.subjectivity;
        this.confidence.innerHTML = info.confidence;
        this.irony.innerHTML = info.irony;
    }
}

