import React, { useContext } from 'react';
import {useForm} from 'react-hook-form'
import Input from '../UI/Forms/Input/Input';
import DailyJournalContext from '../../context/daily-journal-context'
// import googleSignIn from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import Button from '../UI/Button/Button';
import * as classes from './AuthEmail.module.css' 
import {signInFields, signUpFields} from './authFields';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

const UserAuth =(props)=>{
	const context = useContext(DailyJournalContext);
	const {signIn} = props
	let authFields = signIn ? signInFields : signUpFields;
	const {register, handleSubmit, watch, errors} = useForm()
	const onSubmit=(values)=>{
	const {email, password} = values
		console.log(values);
		context.auth(email, password, !signIn)
	}

 const renderInput = authFields.map(({ label, name, type }) => {
	   return (
		   <Input
			   key={name}
			   type={type}
			   placeholder={label}
			   name={name}
			   register={register}
			   error={errors[`${name}`]}
		   />
	   );
   });

	
		let btnText = signIn ? 'Sign In' :'Register';
		

		return (
				<div className={classes.authPage}>
					<form onSubmit={handleSubmit(onSubmit)}>
						{renderInput}
						<Button type='submit' btnType="Success">{btnText}</Button>
					</form>
				</div>
			
		);

}

const mapStateToProps = ({auth, err}) => ({
	auth,
	errors: err
})

export default connect(mapStateToProps, actions)(withRouter(UserAuth));
