import React, { Component } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
// import './Linear.css';
import Newton from './interpolation/Newton'
import Spline from './interpolation/Spline'
import Lagrange from './interpolation/Lagrange'
 /* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];
const linear = ["Cramer's Rule", "Gauss' Elimination", "Gause Jordan", "Matrix Inversion"];
const interpolation = ["Newtion Divide Difference", "Lagrange", "Spline"];
const leastsquare = ["Arrays", "LinkedList", "Stack", "Queue"];*/
var list =[ 
  {value:"newton",label:"Newtion Divide Difference"},{value:"lagrange",label:"Langrange"},
  {value:"spline",label:"Spline"} 
];
 
class DropDown extends Component {
  
  onChange = (e) => {
     
    this.props.history.push(`/interpolation/${e.value}`);
  }
  render() {
    return (
      <Select className="Select " options={list} onChange={this.onChange}/> 
     
    );
  }
}

const Menu = withRouter(DropDown);

function Interpolation() {
  return (
    <BrowserRouter>
      <div>
      <Menu />
        <Route path="/interpolation/newton" render={() => <Newton/>} />
        <Route path="/interpolation/lagrange" render={() =>  <Lagrange/> } />
        <Route path="/interpolation/spline" render={() => < Spline />} />
      
       
   
       
      </div>
    </BrowserRouter>
  );
}
export default Interpolation;
 
