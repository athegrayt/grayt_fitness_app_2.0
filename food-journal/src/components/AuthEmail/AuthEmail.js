import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {required, email, confirmation} from 'redux-form-validators'
import Input from '../UI/Forms/Input/Input';
// import googleSignIn from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import Button from '../UI/Button/Button';
import * as classes from './AuthEmail.module.css' 
import {signInFields, signUpFields} from './authFields';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
// import validateEmails from '../../utils/validateEmails';
class UserAuth extends Component{

 onSubmit=(values)=>{
   const {email, password} = values
	this.props.auth(email, password, !this.props.signIn)
}

 renderInput = (authFields) => {
   return authFields.map(({ label, name, type }) => {
	   let error = null
	   const validate= [required()]
	   if(this.props.errors){
		   error= this.props.errors[name] 
	   }
	   if(name==='password2'){
		   validate.push(confirmation({field: 'password', fieldLabel: 'password'}))
	   }
	   if(name ==='email'){
		   validate.push(email())
	   }
	   return (
		   <Field
			   key={name}
			   component={Input}
			   type={type}
			   placeholder={label}
			   name={name}
			   validate={validate}
			   error={error}
		   />
	   );
   });
}
	render(){
		let btnText = this.props.signIn ? 'Sign In' :'Register';
		let authFields = this.props.signIn ? signInFields : signUpFields;

		return (
				<div className={classes.authPage}>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						{this.renderInput(authFields)}
						<Button type='submit' btnType="Success">{btnText}</Button>
					</form>
				</div>
			
		);
	}

}

const mapStateToProps = ({auth, err}) => ({
	auth,
	errors: err
})

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'authForm',
	destroyOnUnmount: false,
})(withRouter(UserAuth)));
