import React, { Component } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import LinearRegression from './regression/linearregression'
import MultipleRegression from './regression/multipleregression'
import PolynomialRegression from './regression/polynomialregression'

 /* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];
const linear = ["Cramer's Rule", "Gauss' Elimination", "Gause Jordan", "Matrix Inversion"];
const interpolation = ["Newtion Divide Difference", "Langrange", "Spline"];
const leastsquare = ["Arrays", "LinkedList", "Stack", "Queue"];*/
var list =[ 
  {value:"linear",label:"Linear"},{value:"polynomial",label:"Polynomial"},
  {value:"multiple",label:"Multiple"} 
];
 
class DropDown extends Component {
  
  onChange = (e) => {
     
    this.props.history.push(`/leastsquare/${e.value}`);
  }
  render() {
    return (
      <Select className="Select " options={list} onChange={this.onChange}/> 
     
    );
  }
}

const Menu = withRouter(DropDown);

function LeastSquare() {
  return (
    <BrowserRouter>
      <div>
      <Menu />
        <Route path="/leastsquare/linear" render={() => <h1><LinearRegression/></h1>} />
        <Route path="/leastsquare/polynomial" render={() => <h1><PolynomialRegression/></h1>} />
        <Route path="/leastsquare/multiple" render={() => <h1><MultipleRegression/></h1>} />
 
       
   
       
      </div>
    </BrowserRouter>
  );
}
export default LeastSquare;
 
