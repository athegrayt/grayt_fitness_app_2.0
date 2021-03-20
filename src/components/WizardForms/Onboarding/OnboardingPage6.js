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
						min: 1,
						max: 1000
					})}
				/>
				<p>lbs</p>
			</div>
				{errors.weight?.type === "required" && <p className={classes.error}>Please enter your weight</p>}
				{errors.weight?.type === "min" && <p className={classes.error}>Weight must be greater than 0lbs</p>}
				{errors.weight?.type === "max" && <p className={classes.error}>Weight must be less than 1000lbs</p>}
			<Button type='submit' btnType='Success' style={{width: '40vw'}}>
				Set Weight
			</Button>
		</form>
	);
};

export default OnboardingPage6;
