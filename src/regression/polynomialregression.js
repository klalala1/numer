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
import axios from 'axios'
import { withRouter } from "react-router-dom";
import update from 'immutability-helper';
import regression from 'regression';
// import axios from "axios";
var set = 3;  var data; var global='aaaa';
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

class PolynomialRegression extends React.Component {  
 constructor(props) {
          
        super(props);
       // const Classes = makeStyles();
        this.state = {value: '',value2:'',fx:'',rows:[],HelperText:'',x:[ ],y:[],idd:'',valuee:'',xi:0,xxx:[],exampledata:'' };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this)
        this.handleSubmit3 = this.handleSubmit3.bind(this)

       // this.updateById = this.updateById(this)
        localStorage.username=""
        localStorage.latex=''
          
          
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
 
    }
    async   example() {
         data = await axios({
      method: "get",
      url: `http://localhost:8080/pr`,
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


    polynomialregression() {
      
      var xArr = [];
      var yArr = [];   
      // var order = document.getElementById('xx').value
          for (let i = 0; i !=this.state.valuesubmit; i++) {
            
              xArr[i  ] = [];
              yArr[i  ] = [];
              let b = parseFloat(this.state.x[i].value);
              let c = parseFloat(this.state.y[i].value);
              
              xArr[i ][0] = b;
              xArr[i ][1] = c;
              console.log(b);console.log(c)
          }      
          // var result = regression.polynomial(xArr , { order: order });
          var result = regression.polynomial(xArr);
          console.log(result)
                 
         
          document.getElementById('ans').innerHTML=result.string;
      
  }
   


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
        this.polynomialregression()
        
       // console.log(parseFloat(this.state.x[1].value) )
 
         
        }
    handleSubmit3 = async (event) => {
          event.preventDefault()
          await this.example();
          this.setState({value:this.state.exampledata.col.toString()})
          this.state.x=[];
          this.state.rows=[];
          for(var i =0;i!= this.state.value;i++){
              this.state.rows.push(i);
          //this.setState({x:this.x.push({id:"x"+i,value:i},)})
          this.state.x.push({id:"x"+i,value:this.state.exampledata.X[i]})
          this.state.y.push({id:"y"+i,value:this.state.exampledata.Y[i]})
   
        
         
          this.setState({valuesubmit:this.state.value})
          //
          
          }
          for(var i =0;i!= this.state.value;i++){
          document.getElementById('x'+i).value=this.state.x[i].value
          document.getElementById('y'+i).value=this.state.y[i].value
          }
          // document.getElementById('xx').value=this.state.exampledata.Xi
          this.setState({valuesubmit:this.state.value})
          this.polynomialregression()
          
   }
    handleTextfieldChange = (event) => {
        this.setState({idd:event.target.id});
       
        this.setState({valuee:event.target.value})
         
        //const newArray = update(this.state.x, { [indexx]: {$set: ' '} });
        var indexx = this.getIndex(event.target.id)
        const newArray = update(this.state.x, { [indexx]:   {$set:{id:event.target.id,value:event.target.value} }}  );
       // newArray = update(this.state.x, { id: {$set: ' '} });
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
      
       
    //    this.updateById({id: this.state.idd, value: " "})
    
        
    }
    handleTextfieldChangey = (event) => {
       
       
      //const newArray = update(this.state.x, { [indexx]: {$set: ' '} });
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
    
     
  //    this.updateById({id: this.state.idd, value: " "})
  
      
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
    // },.
 
    render() {
  return (
      <div style={{height:'100%',display:'flex' , justifyContent:'center',alignItems:"center" ,textAlign:'center', backgroundColor:'#4158D0',background: 'rgb(52,226,254)',backgroundImage:'linear-gradient(45deg, rgba(214,248,254,0.4181022750897234) 2%, rgba(252,252,252,1) 84%)'}}> 
      <div style={{ marginTop:'4%',marginBottom:'4%', minHeight:'80vh', background:'white',border:"4px solid black" ,justifyContent:'center',alignItems:"center",padding:"10px", width:"30vw",}} > 
       Polynomial Regression 
    <form onSubmit={this.handleSubmit}>
      <FormControl component="fieldset"   error={this.error} className={Classes.formControl}>
        <FormLabel component="legend">Rows :</FormLabel>
        <RadioGroup   name="spacing" aria-label="spacing" value={this.state.value} onChange={this.handleRadioChange} row>
                {[ 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel   id={ 'aaa'}  key={value} value={ value.toString()} control={<Radio />} label={ value.toString()}/>
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
   <div  style={{width:'85%',marginTop:'5%',marginLeft:'7%',marginBottom:'5%'}}  >
    <TableContainer component={Paper}>
      <Table style= {{}} className={Classes.table} size="small" aria-label="a dense table">
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

        {/* <TableBody>
           
           <TableRow  >
             
             <TableCell  component="th" scope="row">
               {<TextField  id={"xx"} label={"order" } onChange={this.handleTextfieldChange}/>}
             </TableCell>
             
         
              
           </TableRow>
         
       </TableBody> */}

      </Table>
    </TableContainer>
    {/* //////////////////////////////////////// */}
    
 
    </div>
    {/* ///////////////////////////////////////////////////////// */}
    <Button type="submit" variant="outlined" color="primary" className={Classes.button}   >
          Submit
        </Button>
    </form>
    <br/>
  <form onSubmit={this.handleSubmit3}>
  <Button type="submit" variant="outlined" color="primary" className={Classes.button}   >
          Example
        </Button>
  </form>
  <div id='ans'> 
 
   </div>
    </div>
    </div>
  );
}
}
export default withRouter(PolynomialRegression)
 


 



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

 