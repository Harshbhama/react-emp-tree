import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DropdownList from 'react-widgets/lib/DropdownList';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { Field, reduxForm } from 'redux-form';
import { colors } from '@material-ui/core';

const age = ''
const colorsData = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

const validate = values => {
    const errors = {}
    const requiredFields = [
      'name',
      'reportsto',
      'position'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    
    
    if(values.reportsto !== undefined && values.position !== undefined && values.reportsto.substring(0,2) === values.position.substring(0,2)){
      errors.reportsto = 'Reporting and position cannot have same designation'
      errors.position = 'Reporting and position cannot have same designation'

    }
    return errors
  }

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ color: 'black' }}
    >
      {'Copyright © '}
      <Link color="inherit">
        GTaxPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '13px',
  },
  multilineColor: {
    color: 'black',
  },
}));
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (

  <TextField
    margin="normal"
    fullWidth
    label={label}
    autoFocus
    error={touched && error}
    helperText={error}
    {...input}
    {...custom}
    InputLabelProps={{
      style: { color: 'black', fontSize: '14px', },
    }}
  />
);


const renderDropDown = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  
  <FormControl style={{width: '100%'}}>
     <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
    <Select
    labelId="demo-simple-select-helper-label"
    id="demo-simple-select-error"
    // value={age}
    label={label}
      autoFocus
      error={touched && error}
      helperText={error}
      {...input}
      {...custom}
      InputLabelProps={{
        style: { color: 'black' },
      }}
    // onChange={handleChange}
  > 

  {custom.val.map((name, index) => (
      <MenuItem key={index} value={name} >
        {name}
      </MenuItem>
    ))}
</Select>
<FormHelperText style={{color: 'red'}}>{error}</FormHelperText>
</FormControl>
);



class Profile extends React.Component {
  constructor(props){
      super(props)
      this.state={
        reportsTo: "",
        currentPosition: ""
      }
  }
  async componentDidMount(){

    var reportsToArray = [], currentPosArray = []
    var pmCounter = 0, tlCounter = 0
    this.props.position.map((val, index) => {
      if(val.pos === "CEO" || val.pos === "PM"){
        reportsToArray.push(val.name)
      }
      if(val.pos === "PM"){
        pmCounter += 1
      }
      if(val.pos === "TL"){
        tlCounter += 1
      }
    })
    currentPosArray = [`PM${pmCounter+1}`, `TL${tlCounter+1}` ]
    
  

    this.setState({
      reportsTo: reportsToArray,
      currentPosition: currentPosArray
    })
  }
  
  render(){
    
    const { handleSubmit } = this.props;
    return (
  
        <div >
        <div>
           <Typography style={{fontFamily: 'GT-Walsheim-medium', fontSize: '30px',whiteSpace: 'nowrap', textAlign: 'center', color: 'darkslategray', paddingBottom: '15px'}}>1.Fill form to add profiles.</Typography>          
        </div>

          <form  style={{width: '140%',  display: 'flex', marginLeft: '-120px', paddingLeft: '3%', paddingRight: '3%', backgroundColor: 'white', borderRadius: '20px' }} onSubmit={handleSubmit}>
            <div style={{width: '35%  '}}>
            <Field
              name="name"
              component={renderTextField}
              label="Name of Employee *"
              style={{ paddingTop: '6%' }}
            />
            </div>
            <div style={{width: '35%', paddingLeft: '3%', paddingTop: '15px'}}>
            { this.state.reportsTo &&
              <Field
              name="reportsto"
              component={renderDropDown}
              val={this.state.reportsTo}
              label="Reports To *"
              style={{paddingTop: '20px'}}
            />}
            </div>
            <div style={{width: '35%', paddingLeft: '3%', paddingTop: '15px'}}>
            {this.state.currentPosition && <Field
              name="position"
              component={renderDropDown}
              val={this.state.currentPosition}
              label="Current Postion *"
              style={{ paddingTop: '20px' }}
            />}
            </div>
           
            <div style={{marginLeft: '3%', paddingTop: '4%'}}>
              <Button
                type="submit"
                variant="contained"
                style={{backgroundColor: '#00A7B5', color: 'white'}}
              >
                ADD
              </Button>
  
            </div>
          </form>
        </div>
        
    
    );
  }
  
};
export default reduxForm({
  form: 'Profile', // a unique identifier for this form
  validate
})(Profile);
// export default SignIn
