import React, { Component } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import Root from './Root';
import Linear from './linear';
import Interpolation from './interpolation'
import LeastSquare from './leastsquare';
//import Bisection from './root/Bisection'
 /* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];
const linear = ["Cramer's Rule", "Gauss' Elimination", "Gause Jordan", "Matrix Inversion"];
const interpolation = ["Newtion Divide Difference", "Langrange", "Spline"];
const leastsquare = ["Arrays", "LinkedList", "Stack", "Queue"];*/
var list =[ 
    {value:"root",label:"Root of Equation"},{value:"linear",label:"Linear Equation"},
    {value:"interpolation",label:"Interpolation"},{value:"leastsquare",label:"Least Square"} 
  ];
class DropDown extends Component {
  onChange = (e) => {
    this.props.history.push(`/${e.value}`);
  }
  render() {
    return (
      <Select options={list} onChange={this.onChange}>
         
     
      </Select>
    );
  }
}

const Menu = withRouter(DropDown);

function App() {
  return (
    <BrowserRouter>
      <div>
      <Menu />
        <Route path="/root" render={() => <Root/>} />
        <Route path="/linear" render={() => <Linear/>} />
        <Route path="/interpolation" render={() => <Interpolation/>} />
        <Route path="/leastsquare" render={() => <LeastSquare/>} />
       

      </div>
    </BrowserRouter>
  );
}
export default App;
 
