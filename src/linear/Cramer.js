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
import * as math from 'mathjs'
import { withRouter } from "react-router-dom";
import update from 'immutability-helper';
import axios from 'axios'
import { Table as Table2 } from 'antd';
var set = 3;let inputA = [], inputB = [], MatrixA = [], MatrixB = [], A = [], B = [], Answer = [], random = 0;
   var temp = [];
var columns = [
   
  {
      title: "X",
      dataIndex: "x",
      key: "x"
  },
  {
      title: "Value",
      dataIndex: "value",
      key: "value"
  } 
 

];

const Classes = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));
const createData = (x, fx) => {
 
    return { x,fx  };
  }
  //////////////////////////////////////////

  
  ///////////////////////////////////////////
 const cramerrule = (size) => {
 // console.log(document.getElementById("x02").value)
  // const A = [[x11,x12,x13],[x21,x22,x23],[x31,x32,x33]];
	// const A1 = [[b1,x12,x13],[b2,x22,x23],[b3,x32,x33]];
	// const A2 = [[x11,b1,x13],[x21,b2,x23],[x31,b3,x33]];
	// const A3 = [[x11,x12,b1],[x21,x22,b2],[x31,x32,b3]];
	// //console.log(A3)
 
	// var detA = det(A)
	// var detA1 = det(A1)
	// var detA2 = det(A2)
	// var detA3 = det(A3)	
	
	// var X1=detA1/detA,X2=detA2/detA,X3=detA3/detA
        
  //       console.log("x1 = " ,X1,"x2 = " ,X2,"x3 = " ,X3)
  //       return;  

 }
class Cramer extends React.Component {  
      
    
      constructor(props) {
          
        super(props);
       // const Classes = makeStyles();
        this.state = {value: '',value2:'',fx:'',rows:[],HelperText:'',x:[ ],y:[],idd:'',valuee:'',valuesubmit:'',data:[]};
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getIndex =this.getIndex.bind(this);
        this.createMatrix = this.createMatrix.bind(this);
        this.det = this.det.bind(this);
        this.cramer = this.cramer.bind(this)
       // this.updateById = this.updateById(this)
        localStorage.username=""
        localStorage.latex=''
        const initial = {
          size: '',
          showInput: false,
          showAns: false
      };
   

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
   url: `http://localhost:8080/cramer`,
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
   createMatrix = () => {
   
        
        for (let i = 0; i < this.state.valuesubmit; i++) {
            MatrixA[i] = [];
            MatrixB[i] = [];
            for (let j = 0; j < this.state.valuesubmit; j++) {
                let a = parseFloat(document.getElementById("x" + (i ) + "" + (j )).value);
               // console.log(parseFloat(document.getElementById("x" + (i ) + "" + (j )).value))
                MatrixA[i][j] = a;
            }
            let b = parseFloat(document.getElementById("b" + (i )).value);
             console.log(b)
            MatrixB[i][0] = b;
        }
        A = math.matrix(MatrixA);
        B = math.matrix(MatrixB);
     
     
}
  det = (m)  =>{
    return math.det(m);
}
  cramer = () => {
    temp=[];
    this.createMatrix();
    //console.log("SD", B._size[0]);       
    let N = [];
    for (let i = 0; i < B._size[0]; i++) {
        N[i] = i;
    }
     
    let ct = 0;
    while (ct < B._size[0]) {
        let matrix_i = math.subset(A, math.index(N, ct), B);
        let x_i = this.det(matrix_i) / this.det(A);
        // Answer.push(<h1>{'x' + ct + " = "}{x_i}</h1>);
        //console.log("wilehwlie")
        temp.push(({
          key: ct,
          x : ct,
          value: x_i
      }))
      
        ct++;
    }
    
    this.setState({dataa:temp})
  }
  createData(x, fx ) {
        return { x,fx  };
      }
    
  
    
 
    handleRadioChange = (event) => {
      this.setState({x:[]})
    this.setState({value:event.target.value});
    this.setState({HelperText:' '});
    // setError(false);
    console.log('event value',event.target.value)
    console.log('state value',this.state.value)
    };
    
    getIndex  =(id) =>{
    return this.state.x.findIndex(obj => obj.id === id);
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
        for(var j=0;j!=this.state.value;j++){
          this.state.x.push({id:"x"+i+j,value:'' })
        }
    //this.setState({x:this.x.push({id:"x"+i,value:i},)})
    //this.state.x.push({id:"x"+i,value:''})
      }
    for(var i=0;i!=this.state.value;i++){
      this.state.x.push({id:"b"+i,value:''})
    }
    this.setState({valuesubmit:this.state.value})
    this.setState({HelperText:' '});
    console.log(this.state.x)
    //console.log("aaaaa",this.getIndex("x5"))
    console.log(this.state.rows)
    
    }
    
    handleSubmit2 = (event) => {
      event.preventDefault();
        this.setState({HelperText:''})
       // console.log("aaaaaaaaaaaaaaaaaaaaa")  \
       
        this.cramer();
        this.setState({aa:true})
        }
    handleSubmit3 = async (event) => {
      event.preventDefault();
      this.setState({HelperText:''})
      // console.log("aaaaaaaaaaaaaaaaaaaaa")  \
      await this.example();
      this.setState({value:"3"})
      this.state.x=[];
    this.state.rows=[];
    for(var i =0;i!= this.state.value;i++){
        this.state.rows.push(i);
        for(var j=0;j!=this.state.value;j++){
          this.state.x.push({id:"x"+i+j,value:this.state.exampledata.A[i][j]})
        
        }
    //this.setState({x:this.x.push({id:"x"+i,value:i},)})
    //this.state.x.push({id:"x"+i,value:''})
      }
      for(var i =0;i!= this.state.value;i++){
        this.state.x.push({id:"b"+i,value:this.state.exampledata.B[i]})
      }
    this.setState({valuesubmit:this.state.value})
    for(var i =0;i!= this.state.value;i++){        
      for(var j=0;j!=this.state.value;j++){ 
         document.getElementById('x'+i.toString()+j.toString() ).value=this.state.exampledata.A[i][j] 
      }
      document.getElementById('b'+i.toString()  ).value=this.state.exampledata.B[i] 
       
    } 
    this.setState({valuesubmit:this.state.value})
    this.setState({HelperText:' '});
    console.log(this.state.x)
    //console.log("aaaaa",this.getIndex("x5"))
    console.log(this.state.rows)
   
    this.cramer();
    this.setState({aa:true})
    console.log(this.state.dataa)
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
 
      var i=this.state.valuesubmit
      var row2 = this.state.x.reduce(function (row2, key, index) { 
        return (index % i == 0 ? row2.push([key]) 
          : row2[row2.length-1].push(key)) && row2;
      }, []);
      
      var items = 
     
      row2.map(item => ( 
        <TableRow>{item.map(col => (<TableCell>{ 
          <TextField id={col.id.toString() } label={col.id.toString() } onChange={this.handleTextfieldChange}/>
        }</TableCell> 
        ))
          }
            
      </TableRow>
      ))

      // this.state.x.slice(i1,i2).map(
      //   (item) =>  
      //   <TableCell>{
      //     <TextField id={"x"+item.id.toString()} label={item.id.toString()+item.subid.toString()} />}
      //       <script>{i1=i1+3}</script><script>{i2=i2+3}</script><script>{console.log("i1 = "+i1+" i2 = "+i2)}</script>
           
      // </TableCell>
     
      // )
      // i1=i1+this.state.valuesubmit;i2=i2+this.state.valuesubmit;
          
    
    
  return (
      
    <div style={{height:'130vh',  justifyContent:'center',alignItems:"center" ,textAlign:'center', backgroundColor:'#4158D0',background: 'rgb(52,226,254)',backgroundImage:'linear-gradient(45deg, rgba(214,248,254,0.4181022750897234) 2%, rgba(252,252,252,1) 84%)'}}> '                      '
  
  <div style={{width:'85%',marginTop:'5%',marginLeft:'35%',marginBottom:'5%',  minHeight:'80vh', background:'white',border:"4px solid black" ,justifyContent:'center',alignItems:"center",padding:"10px", width:"30vw",}} > 
    <h1>Cramer's Rule </h1>
    <form onSubmit={this.handleSubmit}>
      <FormControl component="fieldset"   error={this.error} className={Classes.formControl}>
        <FormLabel component="legend">Row :</FormLabel>
        <RadioGroup name="spacing" aria-label="spacing" value={this.state.value} onChange={this.handleRadioChange} row>
                {[ 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel key={value} value={ value.toString()} control={<Radio />} label={ value.toString()}/>
                ))
                }
              </RadioGroup>
              {/* <FormLabel component="legend">Column :</FormLabel>
              <RadioGroup name="spacing" aria-label="spacing" value={this.state.value} onChange={this.handleRadioChange} row>
                {[ 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel key={value} value={ value.toString()} control={<Radio />} label={ value.toString()}/>
                ))
                }
              </RadioGroup> */}
        <FormHelperText>{this.helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={Classes.button}>
          Generate
        </Button>
      </FormControl>
    
    </form>
   <form onSubmit={this.handleSubmit2}>
   <div style={{width:'85%',marginTop:'5%',marginLeft:'7%',marginBottom:'5%'}} >
    <TableContainer style={{width:'50vh'}} component={Paper}>
      <Table className={Classes.table} size="small" aria-label="a dense table">
      
        {/*TEMPLATE DONT DELETE SUS    
        <TableHead>
          <TableRow>
            <TableCell>x </TableCell>
         
            <TableCell>F(x)&nbsp;</TableCell>
       
          </TableRow>
        </TableHead> */}

        {items}
        {/* <TableBody>
        
          {this.state.rows.map((row) => (
            <TableRow key={row.toString()}>
              
              

            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
    <br/>
    <Button type="submit" variant="outlined" color="primary" className={Classes.button}  >
          Submit
        </Button></div>
    </form>
<form onSubmit={this.handleSubmit3}>
    <Button type="submit" variant="outlined" color="primary" className={Classes.button}  >
          Example
        </Button>
</form>
{this.state.aa && <Table2 columns={columns} dataSource={this.state.dataa} style={{ marginTop: '20px', border: '1px solid black' }} />
    } 


    </div></div>
  );
}
}
export default withRouter(Cramer)
 


 



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

 