// function bi(xl, xr, x1) {
//     var fxl = xl-(1/43);
//     var fxr = xr-(1/43);
// var x1new = ((xl*fxr)-(xr*fxl))/(fxr-fxl);
//     var fx1 = x1-(1/43);
//     if ((fx1 * fxr) < 0) {
//         xl = x1;   
//     } else if ((fx1 * fxr) > 0) {
//         xr = x1;
//     } 
// let err = Math.abs((x1new - x1) / x1new); 
//     console.log("xl = ", xl.toFixed(7), "xr = ", xr.toFixed(7), "x1 = ", x1new.toFixed(7), "err= ", err.toFixed(7));
// if(err<0.0000001)return;  
// else bi(xl, xr, x1new);
// }
// bi(0.02, 0.03, 0);
import {compile,parse} from 'mathjs'
import {  Table } from 'antd';
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X1",
        dataIndex: "x1",
        key: "x1"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
let data = [];

function FalseMethod(xl, xr, x1,ct) {
   
    var fx=localStorage.fx;
    var x;console.log(fx);
    var node2 = parse(localStorage.fx)
    var code2;var scope;
    //var fxl = (Math.pow(xl, 4)) - 13;
   // var fxr = (Math.pow(xr, 4)) - 13;
   // var fxm = (Math.pow(xmnew, 4)) - 13;
   code2 = node2.compile();scope = {x: xl}; 
   var fxl = code2.evaluate(scope) 
   code2 = node2.compile();scope = {x: xr}; 
   var fxr = code2.evaluate(scope) 
   var x1new =((xl*fxr)-(xr*fxl))/(fxr-fxl);
   
   code2 = node2.compile();scope = {x: x1new}; 
   var fx1 = code2.evaluate(scope) 
   
    if ((fx1 * fxr) < 0) {
        xl = x1new;   
    } else if ((fx1 * fxr) > 0) {
        xr = x1new;
    } 
let err = Math.abs((x1new - x1 ) / x1new); 
    //console.log("xl = ", xl.toFixed(7), "xr = ", xr.toFixed(7), "xm = ", xmnew.toFixed(7), "err= ", err.toFixed(7));
    
    data.push({
        key: ct,
        iteration: ct - 1,
        xl: xl,
        xr: xr,
        x1: x1new,
        error: err.toFixed(16),
    })
    console.log("falseeeexl = ",parseFloat(xl).toFixed(7), "xr = ", parseFloat(xr).toFixed(7), "x1new = ",parseFloat(x1new).toFixed(7), "err= ", parseFloat(err).toFixed(7));  
 
    if(err<0.0000001)return;  
else FalseMethod(xl, xr, x1new,ct++);
 


}export default FalseMethod;
