// function one(xi,i) {
// 	var xi1=1/4+(xi/2);


        
// 	let err = Math.abs((xi1 - xi) / xi1);
        
//         console.log("x",i," = " ,xi1.toFixed(7),"err= ", err.toFixed(7));i=i+1;
// if(err<0.0000001)return;  

// else one(xi1,i);
// }

 
// one(0,0); 
import {compile,parse} from 'mathjs'
 
function OnePointMethod(xi, i) {
   
    var fx=localStorage.fx;
    var x;console.log(fx); 
    var node2 = parse(localStorage.fx)
    var code2;var scope;
    code2 = node2.compile();scope = {x: xi}; 
    var xinew = code2.evaluate(scope) 
    let err = Math.abs((xinew - xi ) / xinew); 

    //console.log("xl = ", xl.toFixed(7), "xr = ", xr.toFixed(7), "xm = ", xmnew.toFixed(7), "err= ", err.toFixed(7));
    console.log("x",i," = " ,xinew.toFixed(7),"err= ", err.toFixed(7));i=i+1;
    if(err<0.0000001)return;  
else OnePointMethod(xinew,i);
 


}export default OnePointMethod;
