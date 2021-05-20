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
//import Bisection2 from '../method/a1'
import Button from 'react-bootstrap/Button';
// import './insert.css'
import { Table } from 'antd';
import Assumed from '../method/assumed'
import "antd/dist/antd.css";
import axios from 'axios'
const math = require('mathjs')
//var Aaaa=latex_to_js('\\frac{1}{\\sqrt{2}}\\cdot 2')
//latex_to_js('\\frac{1}{\\sqrt{2}}\\cdot 2')
//var Aaaa=latex_to_js('((pow(5,2)+5+42)\)/(4+pow(3,4)\)')
//const code1 = math.compile(Aaaa)
//console.log(code1.evaluate() )
/* const root = ["Bisection","False Postion","One-Point Iteration","Newton Rahpson","Secant"];*/
addStyles()
var fxx='x^4-13';var temp=[]
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

 
 
const elt = document.createElement('div')
elt.style.width = '600px'
elt.style.height = '400px'
elt.style.justifyContent = 'center'
elt.style.marginLeft="34%"
const calculator = Desmos.GraphingCalculator(elt,{expressions:false})
calculator.setExpression({ id: 'graph1', latex: localStorage.latex })
//document.body.append(elt)
 
//documen


class FalsePosition extends React.Component {
   
 
    constructor(props) {
      super(props);
      this.state = {value1: '',value2:'',aa:false,latex:'\\left(x^4\\right)-13',fxx:'x^4-13',data:[]};
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      localStorage.username=""
      localStorage.latex=''
    }
 
    EditableMathExample = () => {
     
 
      return (
        <div> 
          <EditableMathField style={{marginTop:'2%',background: 'white'}}
           latex={this.state.latex}
            onChange={(mathField) => {
           
              
               this.setState({latex:mathField.latex()})
               this.setState({fxx:latex_to_js(this.state.latex)})
      console.log(this.state.fxx)
              // 
            }}
          />
          <p>{ }</p><br/>
        </div>
      )
    }
    handleChange(event) {
      this.setState({value1: event.target.value});
      console.log("xl = ",this.state.value1)
      
    }
    handleChange2(event) {
      this.setState({value2: event.target.value});
      console.log("xr = ",this.state.value2)
      
    }
    Example = async ()=> {
      let examp = await axios({
           method: "get",
           url: "http://localhost:8080/Falseposition",
         }) 
           .then((response) => {
             return response.data;
           })
           .catch((err) => {
             return undefined;
           });
       this.setState({exampledata:examp})
       }
   

     FalseMethod = (xl, xr, x1,ct) => {
   
       
      console.log(fxx);
      var node2 = math.parse(this.state.fxx)
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
      
      temp.push({
          key: ct,
          iteration: ct - 1,
          xl: xl,
          xr: xr,
          x1: x1new,
          error: err.toFixed(16),
      })
      console.log("falseeeexl = ",parseFloat(xl).toFixed(7), "xr = ", parseFloat(xr).toFixed(7), "x1new = ",parseFloat(x1new).toFixed(7), "err= ", parseFloat(err).toFixed(7));  
      ct++;
      if(err<0.0000001||ct>=100){this.setState({data:temp}); return;}  
      
    else this.FalseMethod(xl, xr, x1new,ct);
    
    }
    handleSubmit(event) {this.setState({data :[] })
      //alert('A name was submitted: ' + this.state.value);
      this.setState({value1: this.state.value1,value2:this.state.value2});
      //this.setState({value2: this.state.value2});
      event.preventDefault();
      localStorage.username = this.state.value;
       
      if(Assumed(this.state.value1,this.state.value2,this.state.fxx)===1){
        
      this.FalseMethod(this.state.value1,this.state.value2,0,1)
      calculator.setExpression({ id: 'graph1', latex: this.state.latex })
       
      }
      else{ }
      
      this.setState({aa:true})
      console.log(this.state.aa)
      console.log("xl = ",this.state.value1,"xr = ",this.state.value2)
     // this.props.history.push(`/root/bisection/graph`);
       
     // const elt = document.createElement("div")
     // elt.style.width = '600px'
     // elt.style.height = '400px'
      //const calculator = Desmos.GraphingCalculator(elt)
      //calculator.destroy();
      //calculator.setExpression({ id: 'graph1', latex: this.state.value })
      //document.body.append(elt)
      document.getElementById('calc').append(elt)
      
     //<MathComponent tex={localStorage.username} />
     //console.log(this.state.value)
      // console.log(localStorage.latex) 
     /*<div style={{ margin:'50px',border:'12px solid pink',width:'50vw',height:'500px',
         padding:'50px',display:'flex',justifyContent:'center',alignItems:'center' }}> 
          <Button style={{marginRight:'50px'}} type="submit" value="Submit" variant="primary">Submit</Button>{' '}*/
    
    }
    handleSubmit2 = async (event) =>{  
      event.preventDefault();
      this.setState({data:[]})
       await this.Example();
       this.setState({value1:this.state.exampledata.xL});this.setState({value2:this.state.exampledata.xR});
       this.setState({fxx:this.state.exampledata.fx})
       if(Assumed(this.state.value1,this.state.value2,this.state.fxx)===1){
       
         this.FalseMethod(this.state.value1,this.state.value2,0,0 )
         calculator.setExpression({ id: 'graph1', latex: this.state.latex})
         this.setState({aa:true})
         
         
         }
         else{calculator.destroy()}
          
         console.log(this.state.data)
         console.log("xl = ",this.state.value1,"xr = ",this.state.value2)
         document.getElementById('x0').value = this.state.value1
         document.getElementById('x1').value = this.state.value2
         document.getElementById('calc').append(elt)
       console.log(this.state.exampledata)
     
     }
  
    render() {
        
      return (
   <div style={{height:'100vh',  justifyContent:'center',alignItems:"center" ,textAlign:'center', backgroundColor:'#4158D0',background: 'rgb(52,226,254)',backgroundImage:'linear-gradient(45deg, rgba(214,248,254,0.4181022750897234) 2%, rgba(252,252,252,1) 84%)'}}> ''
    <h1>False Position </h1>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
           <this.EditableMathExample />
        <form onSubmit={this.handleSubmit} >
          <label>
            x0 : 
            <input type="text" id = 'x0' value1={this.state.value1} onChange={this.handleChange} />
             x1 :
             <input type="text" id='x1' value2={this.state.value2} onChange={this.handleChange2} />
          </label>
         <br/>
          <Button style={{margin:'1%'}} type="submit" value="Submit" variant="primary">Submit</Button>{' '}
          <div id={'calc'}   />
        </form>
        <form onSubmit={this.handleSubmit2}>
        <Button style={{margin:'1%'}} type="submit" value="Submit" variant="primary">Example</Button>
        </form>
        {this.state.aa && <Table columns={columns} dataSource={this.state.data} style={{ marginTop: '20px', border: '1px solid black' }} />
    }
    </div>  
 
      );
    }
  }
  export default  withRouter(FalsePosition)