import {compile,parse} from 'mathjs'
 
function Assumed(xl, xr, fx) { 
    
    console.log(fx )
    var x; var node2 = parse(fx)
    var code2;var scope;
   code2 = node2.compile();scope = {x: xl}; 
   var fxl = code2.evaluate(scope) 
   code2 = node2.compile();scope = {x: xr}; 
   var fxr = code2.evaluate(scope) 
   console.log('FXL*FXR= ',fxl*fxr);
   if (fxl * fxr >= 0)
   {
    alert("Please enter valid number");
       return 2;
   }
   else return 1;

} export default Assumed

 