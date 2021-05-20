import React, { useState,Component } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
// import './Linear.css';
import Cramer from './linear/Cramer'
import Gausseelim from './linear/GaussElim'
import GausseJordan from './linear/GaussJordan'
import ConjugateGradient from './linear/ConjugateGradient'
import Jacobi from './linear/Jacobi'
import LU from './linear/LU'
import GaussSeidel from './linear/GaussSeidel'

 /* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];
const linear = ["Cramer's Rule", "Gauss' Elimination", "Gause Jordan", "Matrix Inversion"];
const interpolation = ["Newtion Divide Difference", "Langrange", "Spline"];
const leastsquare = ["Arrays", "LinkedList", "Stack", "Queue"];*/
var list =[ 
  {value:"cramer",label:"Cramer's Rule"},{value:"elim",label:"Gauss' Elimination"},
  {value:"gaussseidel",label:"Gauss-Seidel"},{value:"jordan",label:"Gause Jordan"},
  {value:"conjugategradient",label:"Conjugate Gradient"} ,{value:"jacobi",label:"Jacobi"},
  {value:"lu",label:"LU"}
];
 
class DropDown extends Component {
  
  onChange = (e) => {
     
    this.props.history.push(`/linear/${e.value}`);
  }
  render() {
    return (
      <Select className="Select " options={list} onChange={this.onChange}/> 
     
    );
  }
}

const Menu = withRouter(DropDown);

function Linear() {
  return (
    <BrowserRouter>
      <div>
      <Menu />
        <Route path="/linear/cramer" render={() => <Cramer />} />
        <Route path="/linear/elim" render={() => <Gausseelim/>} />
        <Route path="/linear/jordan" render={() => <GausseJordan/>} />
        <Route path="/linear/gaussseidel" render={() => <GaussSeidel/>} />
        <Route path="/linear/conjugategradient" render={() => <ConjugateGradient/>} />
        <Route path="/linear/jacobi" render={() => <Jacobi/>} />
        <Route path="/linear/lu" render={() => <LU/>} />
       
   
       
      </div>
    </BrowserRouter>
  );
}
export default Linear;
 
