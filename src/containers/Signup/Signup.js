import React,{useState} from 'react'
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { Redirect, Link} from 'react-router-dom';
import DatePicker from 'react-date-picker';

import * as actions from '../../store/actions/index';
import './Signup.css';


const validate = values => {
  console.log(values.dob);
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }

  if(!values.dob){
    errors.date = 'Required'
  }

  if(!values.city){
      errors.city = 'Required'
  }else if(!/^[a-z-]*$/i.test(values.city)){
      errors.city = 'Invalid City Name'
  }

  if(!values.password){
      errors.password = 'Required'
  }else if(values.password.length < 6){
      errors.password = 'Length must be greater than or equal to 6'
  }
  
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} placeholder={label} type={type} className='input-field'/>
            {touched && ((error && <span className='warning-msg'>{error}</span>) ||
             (warning && <span className='warning-msg'>{warning}</span>))}
    </div>
  
)

const handleFormSubmit = (props,values,isSignup) => {
  props.onSignup(values.email, values.password, isSignup)
  props.onSetPath()
}

const SignupForm = (props) => {
  const {handleSubmit, pristine, reset, submitting, isAuthenticated, authRedirectPath } = props;
  const [isSignup, setIsSignup] = useState(false);
  const [dob, setDob] = useState(new Date());
  console.log('dob',dob);
  let authRedirect = null;
  if(isAuthenticated){
    authRedirect = <Redirect to={authRedirectPath}/>
  }

  return (
    <>
    {authRedirect}
    <form className='form-container' onSubmit={handleSubmit((values) => handleFormSubmit(props,values, isSignup))} >
      <h5>Create Your Account</h5>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="age" type="number" component={renderField} label="Age"/>
      {/* <Field name='dob' type='date' component={renderField} label='Date of Birth'>       */}
        <DatePicker
            className='input-field'
            // calendarIcon={null}
            // clearIcon={null}
            name='dob'
            required={true}
            value={dob}
            onChange={setDob}/>
      {/* </Field> */}

      <Field name="city" type="text" component={renderField} label="City"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      <div className = 'button-container'>
        <button className = 'form-button' type="submit" disabled={submitting} onClick={() => setIsSignup(!isSignup)}>Submit</button>
        <button className = 'form-button' type="button" disabled={pristine || submitting} onClick={reset}>Cancel</button>
      </div>
      <Link className='signup-link' to = '/login'>Existing User? Log in</Link>
    </form>
    
    </>
  )
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null,
    authRedirectPath : state.auth.authRedirectPath,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onSignup:(email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetPath:() => dispatch(actions.setPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'syncValidation',
  validate,                               
})(SignupForm))
