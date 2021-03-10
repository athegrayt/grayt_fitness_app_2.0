import React from 'react';
import {useForm} from 'react-hook-form'
import Input from '../UI/Forms/Input/Input';
import Button from '../UI/Button/Button';
import * as classes from './AuthEmail.module.css' 
import {signInFields, signUpFields} from './authFields';
import {withRouter} from 'react-router-dom'


const AuthEmail =(props)=>{
	const { signIn, onSubmit, error } = props;
	let authFields = signIn ? signInFields : signUpFields;
	const {register, handleSubmit} = useForm()
	
 const renderInput = authFields.map(({ label, name, type }, i) => {
	   return (
					<Input
						key={`${name}${i}`}
						type={type}
						placeholder={label}
						name={name}
						register={register({
							required: true,
							error: () => !error,
						})}
					/>
			);
   });

	
		let btnText = signIn ? 'Sign In' :'Register';
		

		return (
			<div className={classes.authPage}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{renderInput}
					{error && <div className={classes.error}>{error}</div>}
					<Button type='submit' btnType='Success'>
						{btnText}
					</Button>
				</form>
			</div>
		);

}

export default withRouter(AuthEmail);
