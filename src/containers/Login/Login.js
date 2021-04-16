import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import '../Signup/Signup.css';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
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
    	<input {...input} placeholder={label} type={type} className = 'input-field'/>
      		{touched && ((error && <span className='warning-msg'>{error}</span>) || (warning && <span className='warning-msg'>{warning}</span>))}
    </div>

)

const handleFormSubmit = (props, values,) => {
  props.onLogin(values.email, values.password)
}

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting , isAuthenticated, authRedirectPath} = props;
  let authRedirect = null;
  if(isAuthenticated){
    authRedirect = <Redirect to={authRedirectPath}/>
  }
  return (
    <>
      {authRedirect}
      <form className='form-container' onSubmit={handleSubmit((values) => handleFormSubmit(props, values))} >
    		<h5>Login to your account</h5>
    	  <Field name="email" type="email" component={renderField} label="email"/>
        <Field name="password" type="password" component={renderField} label="Password"/>
    	  <Link className='signup-link' to = '/signup'>Forgot Password?</Link>
        <div className = 'button-container'>
          <button className = 'form-button' type="submit" disabled={submitting}>Submit</button>
          <button className = 'form-button' type="button" disabled={pristine || submitting} onClick={reset}>Cancel</button>
        </div>
          <div className='signup-link'>
          {/* <p>Don't have an account yet? </p> */}
          <Link to = '/signup'>Don't have an account yet? Create an account</Link>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.auth.token !== null,
    authRedirectPath : state.auth.authRedirectPath,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    onLogin:(email, password) => dispatch(actions.auth(email, password, false))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'syncValidation',
  validate,
})(LoginForm))