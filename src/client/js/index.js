import './../styles/base.scss';
import './../styles/main.scss';
import './../styles/form.scss';
import './../styles/header.scss';
import './../styles/footer.scss';
import {App} from './app';

import logo from './../assets/nlp.png';


/*
export{
    bootStrap
}
*/
export function bootStrap(){
    console.log(`bootStrap() called........`);
    if(window &&  window.Application!=null){
        console.log(`Application already  exist ...`);
        return ;
    }

        window.onload = function(){ 
            console.log(`window onload ...`);
            window.Application=new App();
    }
    console.log(`window onload registered  ...`);
};

bootStrap();