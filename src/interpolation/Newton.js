import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from  '@material-ui/core/TextField'

import { withRouter } from "react-router-dom";
import update from 'immutability-helper';
import axios from 'axios'
var set = 3;
const Classes = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));
  var createData = (x, fx) => {
 
    return { x,fx  };
  }
 
class Newton extends React.Component {  
 constructor(props) {
          
        super(props);
       // const Classes = makeStyles();
        this.state = {value: '',value2:'',fx:'',rows:[],HelperText:'',x:[ ],y:[],idd:'',valuee:'',exampledata:''};
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.proterm = this.proterm.bind(this);
        this.dividedDiffTable = this.dividedDiffTable.bind(this);
        this.applyFormula = this.applyFormula.bind(this);
        this.Newton2 = this.Newton2.bind(this);

       // this.updateById = this.updateById(this)
        localStorage.username=""
        localStorage.latex=''
          
          this.setState({value: '3'});
          this.setState({error: 'false'});
          //const error='';
        // const [value, setValue] =  this.useState('3');
        // const [error, setError] =  this.setState(false);
        //const [helperText, setHelperText] = this.useState('Choose wisely');  
        var rows = [
            createData(' ', ' ' ),
            createData(' ', ' ' ),
            createData(' ', ' ' ),
          
            
          ];
        //   const useStyles = this.makeStyles((theme) => ({
        //     formControl: {
        //       margin: theme.spacing(3),
        //     },
        //     button: {
        //       margin: theme.spacing(1, 1, 0, 0),
        //     },
        //   }));
    }
   
  
    async   example() {
      let data = await axios({
   method: "get",
   url: `http://localhost:8080/nd`,
 })
   .then((response) => {

     return response.data;
   })
   .catch((err) => {
     return undefined;
   });
 if (data !== undefined) {
 } 
 
  this.setState({exampledata:data})
}
       
     
      proterm = (  i,   value,   x ) =>
    {
      var pro = 1;
      for (var j = 0; j < i; j++) {
        pro = pro * (value - x[j]);
      }
      return pro;
    } 
    
      dividedDiffTable = (  x ,   y ,   n) =>
    {
      for (var i = 1; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
          y[j][i] = (y[j][i - 1] - y[j + 1]
                [i - 1]) / (x[j] - x[i + j]);
        }
      }
    } 
    
      applyFormula = (value,x ,y ,n) =>
    {
      var sum = y[0][0];
    
      for (var i = 1; i < n; i++) {
      sum = sum + (this.proterm(i, value, x) * y[0][i]);
      }
      return sum;
    }
     
      Newton2 = () =>{
       //console.log(document.getElementById("y0").value);console.log(document.getElementById("x0").value)
    
      // number of inputs given
      var n = this.state.valuesubmit;
      var value, sum;
      var y=[];var x=[]; 
      //  var y = [];
      for(var i=0;i!=n;i++){ 
        y.push([parseFloat(document.getElementById("y"+i.toString()).value),0]) ; 
      }console.log(y)
    //   let y = [
    //     [12, ],
    //     [13, ],
    //     [14, ],
    //     [16, ] 
     
    // ];
    
    for(var i=0;i!=n;i++){
      x[i]= parseFloat(document.getElementById("x"+(i)).value); 
    }console.log(x)
    // var x  = [ 5, 6, 9, 11 ];
     
      // y[0][0] = 12;
      // y[1][0] = 13;
      // y[2][0] = 14;
      // y[3][0] = 16;
     
      this.dividedDiffTable(x, y, n);
     
      value = this.state.x[-1] 
     console.log('value ='+value)
     console.log('x ='+x)
     console.log('y ='+y)
     console.log('n ='+n)
 
      console.log(this.applyFormula(value, x, y, n));
      document.getElementById('ans').innerHTML=this.applyFormula(value, x, y, n);
    }
    
 
    handleRadioChange = (event) => {
    this.setState({value:event.target.value});
    this.setState({HelperText:' '});
    // setError(false);
    console.log('event value',event.target.value)
    console.log('state value',this.state.value)
    };
    
    getIndex  =(id) =>{
    return this.state.x.findIndex(obj => obj.id === id);
    }
    getIndexy  =(id) =>{
      return this.state.y.findIndex(obj => obj.id === id);
      }
    
    //  updateById = obj => {
    //     const { id } = obj;
    //     // here we check if new object has the same id as the old one
    //     // we replace old one with new
        
    //     return this.state.x.map(x => x.id === id ? obj : x)
    //   }
    handleSubmit = (event) => {
    event.preventDefault();
    
    this.state.x=[];
    this.state.rows=[];
    for(var i =0;i!= this.state.value;i++){
        this.state.rows.push(i);
    //this.setState({x:this.x.push({id:"x"+i,value:i},)})
    this.state.x.push({id:"x"+i,value:''})
    this.state.y.push({id:"y"+i,value:''})
    }
    this.setState({HelperText:' '});
    console.log(this.state.x)
    //console.log("aaaaa",this.getIndex("x5"))
    console.log(this.state.rows)
    this.setState({valuesubmit:this.state.value})
    
    }
    
    handleSubmit2 = (event) => {
        event.preventDefault()
        this.setState({HelperText:''})
        
         
      this.Newton2()
        
         
        }
        handleSubmit3 = async (event) => {
          event.preventDefault()
          await this.example();
          this.setState({value:"5"})
          this.state.valuesubmit=this.state.value;
          this.state.x=[];
          this.state.rows=[];
          this.state.x[-1]=this.state.exampledata.Xi;
          for(var i =0;i!= this.state.value;i++){
              this.state.rows.push(i);
          //this.setState({x:this.x.push({id:"x"+i,value:i},)})
          this.state.x.push({id:"x"+i,value:this.state.exampledata.X[i]})
          this.state.y.push({id:"y"+i,value:this.state.exampledata.Y[i]})
    
           this.setState({helperText:''})
          } 
     
          for(var i =0;i!= this.state.value;i++){
          document.getElementById('x'+i).value=this.state.x[i].value
          document.getElementById('y'+i).value=this.state.y[i].value

          }
          document.getElementById('xx' ).value=this.state.exampledata.Xi
          console.log(this.state.x)
          this.Newton2();
 
   }
    handleTextfieldChange = (event) => {
        this.setState({idd:event.target.id});
        this.setState({valuee:event.target.value})
         
        //const newArray = update(this.state.x, { [indexx]: {$set: 'kuy'} });
        var indexx = this.getIndex(event.target.id)
        const newArray = update(this.state.x, { [indexx]:   {$set:{id:event.target.id,value:event.target.value} }}  );
       // newArray = update(this.state.x, { id: {$set: 'kuy'} });
        this.setState({x:newArray})
        console.log(this.state.x)
       // this.setState({value:event.target.value});
        // this.setState({x.id.event.target.id:event.target.value})
        ////// this.setState(update(this.state    ,   { x:{ id: {$set: this.state.x.value} }}))
        // const newState = update(this.state , {
        //     open: {
        //       8: {$set: false}
        //     }
        //   })
      
       
    //    this.updateById({id: this.state.idd, value: "fuck"})
    
        
    }
    handleTextfieldChangey = (event) => {
       
       
      //const newArray = update(this.state.x, { [indexx]: {$set: 'kuy'} });
      var indexy = this.getIndexy(event.target.id)
      const newArray = update(this.state.y, { [indexy]:   {$set:{id:event.target.id,value:event.target.value} }}  );
     // newArray = update(this.state.x, { id: {$set: 'kuy'} });
      this.setState({y:newArray})
      console.log(this.state.y)
     // this.setState({value:event.target.value});
      // this.setState({x.id.event.target.id:event.target.value})
      ////// this.setState(update(this.state    ,   { x:{ id: {$set: this.state.x.value} }}))
      // const newState = update(this.state , {
      //     open: {
      //       8: {$set: false}
      //     }
      //   })
    
     
  //    this.updateById({id: this.state.idd, value: "fuck"})
  
      
  }
    // for(var i = set ;i!=event.target.value;)
    // {   if(set===true){break;}
    //     if(i<set){
            
    //     }
    //     if(i>set){

    //     }
    // }

    // if (value === 'best') {
    //   setHelperText('You got it!');
    //   setError(false);
    // } else if (value === 'worst') {
    //   setHelperText('Sorry, wrong answer!');
    //   setError(true);
    // } else {
    //   setHelperText('Please select an option.');
    //   setError(true);
    // }
 
    render() {
  return (
    <div style={{height:'100%',display:'flex' , justifyContent:'center',alignItems:"center" ,textAlign:'center', backgroundColor:'#4158D0',background: 'rgb(52,226,254)',backgroundImage:'linear-gradient(45deg, rgba(214,248,254,0.4181022750897234) 2%, rgba(252,252,252,1) 84%)'}}>' '
      <div style={{ marginTop:'4%',marginBottom:'4%', minHeight:'80vh',    background:'white',border:"4px solid black" ,justifyContent:'center',alignItems:"center",padding:"10px", width:"30vw",}}  >
       <h1  style={{textAlign:'center'}}> Newton Divided Difference </h1>
    <form onSubmit={this.handleSubmit}>
      <FormControl component="fieldset"   error={this.error} className={Classes.formControl}>
        <FormLabel component="legend">Rows :</FormLabel>
        <RadioGroup name="spacing" aria-label="spacing" value={this.state.value} onChange={this.handleRadioChange} row>
                {[ 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel key={value} value={ value.toString()} control={<Radio />} label={ value.toString()}/>
                ))
                }
              </RadioGroup>
        <FormHelperText>{this.helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={Classes.button}>
          Generate
        </Button>
      </FormControl>
    
    </form>
   <form onSubmit={this.handleSubmit2}>
     <div style={{width:'85%',marginTop:'5%',marginLeft:'7%',marginBottom:'5%'}} >
    <TableContainer   component={Paper}>
      <Table className={Classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>x </TableCell>
         
            <TableCell>F(x)&nbsp;</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <TableRow key={row.toString()}>
              
              <TableCell component="th" scope="row">
                {<TextField id={"x"+row.toString()} label={"x"+row.toString()} onChange={this.handleTextfieldChange}/>}
              </TableCell>
              
              <TableCell   >{
                  <TextField id={"y"+row.toString()} label={"y"+row.toString()} onChange={this.handleTextfieldChangey} />}
              </TableCell>
               
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* //////////////////////////////////////// */}
   
    <TableContainer style={{width:'10vh',marginTop:'10px',marginBottom:'10px'}} component={Paper}>
      <Table className={Classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>x </TableCell>
         
             
       
          </TableRow>
        </TableHead>
        <TableBody>
           
            <TableRow  >
              
              <TableCell component="th" scope="row">
                {<TextField id={"xx"} label={"x" } onChange={this.handleTextfieldChange}/>}
              </TableCell>
              
          
               
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    {/* ///////////////////////////////////////////////////////// */}
    <Button type="submit" variant="outlined" color="primary" className={Classes.button}   >
          Submit
        </Button>
        </div>
    </form>
    <form onSubmit={this.handleSubmit3}>
    <Button type="submit" variant="outlined" color="primary" className={Classes.button}   >
          Example
        </Button>
    </form>
    <h1 id='ans'> </h1>
    </div>
    </div>
  );
}
}
export default withRouter(Newton)
 


 



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

 