import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../UI/Forms/Input/Input'
import * as classes from './OnboardingPages.module.css';
import Button from '../../UI/Button/Button';

const OnboardingPage6 = (props) => {
	const { setWeight, weight } = props;
	const { register, handleSubmit, errors } = useForm();

	return (
		<form
			onSubmit={handleSubmit((values) => setWeight(values.weight))}
			className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h3>How much do you weight?</h3>
			</div>
			<div className={classes.weight}>
				<Input
					key='weight'
					name='weight'
					placeholder='-'
					defaultValue={weight}
					type='tel'
					min='1'
					max='1000'
					register={register({
						required: true,
					})}
				/>
				<p>lbs</p>
				{errors.weight?.type === "required" && "Please enter your weight"}
			</div>
			<Button type='submit' btnType='Success' style={{width: '40vw'}}>
				Set Weight
			</Button>
		</form>
	);
};

export default OnboardingPage6;
