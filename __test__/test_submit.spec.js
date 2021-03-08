import {App} from './../src/client/js/app';
var fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//jest.mock('./../src/client/js/app');
jest.dontMock('fs');
const html = fs.readFileSync(path.resolve(__dirname,'../src/client/views/index.html'));
  


describe("Testing UI Elements",()=>{
    beforeEach(()=>{
        const dom = new JSDOM(html.toString(), { runScripts: "dangerously",QuerySelector: true });
        global.window = dom.window;
        document.documentElement.innerHTML = html.toString();
//        App.mockClear();
     
    });

    afterEach(()=>{
        jest.resetModules();
    });


    it('Click submit button should call getApiResults if url is valid',()=>{
        const getApiResult_Mock = jest.fn();
        document.body.innerHTML =
        `
        <div class="container">
        <div class="form">
            <input id="url" type="text" name="url" value=""  placeholder="Please Enter URL">
            <input type="button" value="Submit" id="submit"/>
            <p id="url-validation" class='url-validation'>Invalid URL !!</p>
            
        
        </div>
        <div class='loader-container'>
            <div class="loader"></div>
        </div>
        
        <div class="results-container">
            <p class="results-label">API Results:</p>
            <div id="results">
                <pre id="json"></pre>
            </div>
        </div>
        </div> 
        `;
        const theApp = new App();
        theApp.getApiResult = getApiResult_Mock ;
        let submit =  document.querySelector('#submit');
        let url =  document.querySelector('#url');
        url.value = 'https://jestjs.io/docs/pt-BR/es6-class-mocks';
   
        var evt = document.createEvent("Event");
        evt.initEvent("click", false, false);
        submit.dispatchEvent(evt);
       expect(theApp.getApiResult).toHaveBeenCalledTimes(1);    
    })

    it('Url should be validated',()=>{
        const getApiResult_Mock = jest.fn();
        const theApp = new App();
        theApp.getApiResult = getApiResult_Mock ;
        let submit =  document.querySelector('#submit');
        let url =  document.querySelector('#url');
        url.value = 'non valid url';
        var evt = document.createEvent("Event");
        evt.initEvent("click", false, false);
        submit.dispatchEvent(evt);

   //     const mockAppInstance = App.mock.instances[0];
     //   const mock_getApiResult =mockAppInstance.getApiResult;
       expect(theApp.getApiResult).not.toBeCalled();    
    });

});

