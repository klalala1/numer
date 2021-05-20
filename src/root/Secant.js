import React,{useState} from 'react';
//import HelmetExport, {Helmet} from "react-helmet";
//import ScriptTag from 'react-script-tag';
//import Parser from 'html-react-parser';
import Desmos from 'desmos'
import { withRouter } from "react-router-dom";
//import Bisection from './Bisection'
//import { MathComponent } from 'mathjax-react'
//import Interpolation from '../Interpolation'
//import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { addStyles, EditableMathField } from 'react-mathquill'
//import evaluatex from 'evaluatex/dist/evaluatex'
//import * as math from 'mathjs'
import latex_to_js from '../method/latex-to-js.js'
import Bisection2 from '../method/a1'
import Button from 'react-bootstrap/Button';
import {compile,parse,derivative} from 'mathjs'
// import './insert.css'
//var Aaaa=latex_to_js('\\frac{1}{\\sqrt{2}}\\cdot 2')
//latex_to_js('\\frac{1}{\\sqrt{2}}\\cdot 2')
//var Aaaa=latex_to_js('((pow(5,2)+5+42)\)/(4+pow(3,4)\)')
//const code1 = math.compile(Aaaa)
//console.log(code1.evaluate() )
/* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];*/
import Assumed from '../method/assumed'
import OnePointMethod from '../method/onepoint.js';
import axios from 'axios'
import { Table } from 'antd';
import "antd/dist/antd.css";
addStyles()
var data=[];
const columns = [
  {
      title: "step",
      dataIndex: "iteration",
      key: "iteration"
  },
  {
      title: "x0",
      dataIndex: "x0",
      key: "x0"
  },
  {
      title: "x1",
      dataIndex: "x1",
      key: "x1"
  },
  {
      title: "x2",
      dataIndex: "x2",
      key: "x2"
  },
  {
      title: "Error",
      key: "error",
      dataIndex: "error"
  }
];

const elt = document.createElement('div')
elt.style.width = '600px'
elt.style.height = '400px'
elt.style.justifyContent = 'center'
elt.style.marginLeft="34%"
const calculator = Desmos.GraphingCalculator(elt,{expressions:false})
calculator.setExpression({ id: 'graph1', latex: localStorage.latex })
//document.body.append(elt)
 
//documen


class Secant extends React.Component {
   
 
    constructor(props) {
      super(props);
      this.state = {value1: '',value2:'',fxx:'(1/2)*(25/x+x)',latex:'\\left(\\frac{1}{2}\\right)\\cdot\\left(\\frac{25}{x}+x\\right)',aa:false};
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      localStorage.username=""
      localStorage.latex=''
    }
 
      EditableMathExample = () => {
      
      return (
        <div><h1>Secant</h1>
          <EditableMathField style={{marginTop:'2%',background: 'white'}}
            latex={this.state.latex}
            onChange={(mathField) => {
              
               this.setState({latex:mathField.latex()})
               this.setState({fxx:latex_to_js(this.state.latex)})
              // 
            }}
          />
          <p>{  }</p><br/>
        </div>
      )
    }

    Example = async ()=> {
      let examp = await axios({
           method: "get",
           url: "http://localhost:8080/Secant",
         }) 
           .then((response) => {
             return response.data;
           })
           .catch((err) => {
             return undefined;
           });
       this.setState({exampledata:examp})
       }

    handleChange(event) {
      this.setState({value1: event.target.value});
      console.log("xl = ",this.state.value1)
      
    }
    handleChange2(event) {
      this.setState({value2: event.target.value});
      console.log(" xr = ",this.state.value2)
      
    }
      secant = (x0,x1,i) => {
        var fx=this.state.fxx;
        var x;console.log(fx); 
       
         
        var node2 = parse(fx)
        var code2;var scope;
        code2 = node2.compile(); 
        scope = {x: x0};var fx0 = code2.evaluate(scope) 
        scope = {x: x1};var fx1 = code2.evaluate(scope) 
        var xnew = x0-(fx0*((x1-x0)/(fx1-fx0)));	
        let err = Math.abs((xnew - x1) / xnew);
        data.push({
          key: i,
          iteration: i,
          x0: x0,
          x1: x1,
          x2: xnew,
          error: err
      })
            
            console.log("x",i+2," = " ,xnew.toFixed(7),"err= ", err.toFixed(7));i=i+1;
    if(err<0.0000001)return;  
    
    else this.secant(x1,xnew,i);
    }
    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      this.setState({value1: this.state.value1,value2:this.state.value2});
      //this.setState({value2: this.state.value2});
      event.preventDefault();
      localStorage.username = this.state.value;
      console.log("aaaa")

       data=[];
      this.secant(this.state.value1,this.state.value2,0)
      calculator.setExpression({ id: 'graph1', latex: this.state.latex })
      this.setState({aa:true})
      document.getElementById('calc').append(elt)
  
       
     
      console.log("xl = ",this.state.value1,"xr = ",this.state.value2)
     // this.props.history.push(`/root/bisection/graph`);
       
     // const elt = document.createElement("div")
     // elt.style.width = '600px'
     // elt.style.height = '400px'
      //const calculator = Desmos.GraphingCalculator(elt)
      //calculator.destroy();
      //calculator.setExpression({ id: 'graph1', latex: this.state.value })
      
      
      
     //<MathComponent tex={localStorage.username} />
     //console.log(this.state.value)
      // console.log(localStorage.latex) 
     /*<div style={{ margin:'50px',border:'12px solid pink',width:'50vw',height:'500px',
         padding:'50px',display:'flex',justifyContent:'center',alignItems:'center' }}> 
          <Button style={{marginRight:'50px'}} type="submit" value="Submit" variant="primary">Submit</Button>{' '}*/
    
    }
    handleSubmit2 = async (event) => {
      event.preventDefault();data=[]
      await this.Example();
      this.setState({value1:this.state.exampledata.x0});
      this.setState({value2:this.state.exampledata.x1});  
      this.setState({fxx:this.state.exampledata.fx})
      this.setState({latex:this.state.exampledata.latex})
      this.secant(this.state.value1,this.state.value2,0);console.log(this.state.latex)
      calculator.setExpression({ id: 'graph1', latex: this.state.latex})
      this.setState({aa:true})
      
      document.getElementById('x0').value = this.state.exampledata.x0;
      document.getElementById('x1').value = this.state.exampledata.x1;
      
    document.getElementById('calc').append(elt)
    console.log(this.state.exampledata)
    }
    render() {
        
      return (
   <div style={{height:'100vh',  justifyContent:'center',alignItems:"center" ,textAlign:'center', backgroundColor:'#4158D0',background: 'rgb(52,226,254)',backgroundImage:'linear-gradient(45deg, rgba(214,248,254,0.4181022750897234) 2%, rgba(252,252,252,1) 84%)'}}> ''
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
           <this.EditableMathExample />
        <form onSubmit={this.handleSubmit} >
          <label>
            x0 : 
            <input type="text" id="x0" value={this.state.value1} onChange={this.handleChange} />
             {/* xr : */}
             {/* <input type="text" value2={this.state.value2} onChange={this.handleChange2} /> */}
          </label>
          <label>
            x1 : 
            <input type="text" id="x1" value={this.state.value2} onChange={this.handleChange2} />
             {/* xr : */}
             {/* <input type="text" value2={this.state.value2} onChange={this.handleChange2} /> */}
          </label>
          <br/>
          <Button style={{margin:'1%'}} type="submit" value="Submit" variant="primary">Submit</Button>{' '}
          <div id={'calc'}/>
           
        </form>
        <form onSubmit={this.handleSubmit2}>
        <Button style={{margin:'1%'}} type="submit" value="Submit" variant="primary">Example</Button>{' '}
        </form>
        {this.state.aa && <Table columns={columns} dataSource={data} style={{ marginTop: '20px', border: '1px solid black' }} />
    }
    </div>  
 
      );
    }
  }
  export default  withRouter(Secant)