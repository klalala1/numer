import React, { Component } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import NameForm from './root/bisection'
  import FalsePosition from './root/FalsePosition'
import OnePoint from './root/OnePoint'
// import EnhancedTable from './root/show'
// import Bisection from "./backup/Bisection";
import Secant from "./root/Secant";
import Newton from "./root/NewtonRahpson";
// import DenseTable from './root/show'
var list =[ 
  {value:"bisection",label:"Bisection"},{value:"falseposition",label:"False Postion"},
  {value:"onepoint",label:"One-Point Iteration"},{value:"newton",label:"Newton Rahpson"},{value:"secant",label:"Secant"} 
];
class DropDown extends Component {
  
  onChange = (e) => {
     
    this.props.history.push(`/root/${e.value}`);
  }
  render() {
    return (
      <Select options={list} onChange={this.onChange}/> 
     
    );
  }
}

const Menu = withRouter(DropDown);

function Root() {
  return (
    <BrowserRouter>
      <div>
      <Menu />
        <Route path="/root/bisection" render={() => <NameForm/> } />
        <Route path="/root/falseposition" render={() => <FalsePosition />} />
        <Route path="/root/onepoint" render={() => <OnePoint/>} />
        <Route path="/root/newton" render={() => <Newton/>} />
        <Route path="/root/secant" render={() => <Secant/>} />
   
       
      </div>
    </BrowserRouter>
  );
}
export default Root;
 
