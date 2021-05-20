import {compile,parse} from 'mathjs'
 
function Bisection2(xl, xr, xm ) {
    
    var xmnew = (xl + xr) / 2;
    var fx=localStorage.fx;
    var x;console.log(fx);var node2 = parse(localStorage.fx)
    var code2;var scope;
    //var fxl = (Math.pow(xl, 4)) - 13;
   // var fxr = (Math.pow(xr, 4)) - 13;
   // var fxm = (Math.pow(xmnew, 4)) - 13;
   code2 = node2.compile();scope = {x: xl}; 
   var fxl = code2.evaluate(scope) 
   code2 = node2.compile();scope = {x: xr}; 
   var fxr = code2.evaluate(scope) 
   code2 = node2.compile();scope = {x: xmnew}; 
   var fxm = code2.evaluate(scope) 
  

   
    if ((fxm * fxr) < 0) {
        xl = xmnew;   
    } else if ((fxm * fxr) > 0) {
        xr = xmnew;
    } 
let err = Math.abs((xmnew - xm) / xmnew); 
    //console.log("xl = ", xl.toFixed(7), "xr = ", xr.toFixed(7), "xm = ", xmnew.toFixed(7), "err= ", err.toFixed(7));
    console.log("xl = ",parseFloat(xl).toFixed(7), "xr = ", parseFloat(xr).toFixed(7), "xm = ",parseFloat(xm).toFixed(7), "err= ", parseFloat(err).toFixed(7));  
    //localStorage.Ans.push({i:i,xl:xl,xr:xr,xm:xm}) 
    //console.log(localStorage.ans)
     
 
  
    if(err<0.0000001)return;  
else Bisection2(xl, xr, xmnew);
 


}export default Bisection2;


 