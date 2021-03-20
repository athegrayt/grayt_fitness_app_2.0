import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../UI/Forms/Input/Input';
import Button from '../../UI/Button/Button';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage8 = (props) => {
	const { setGoalWeight, goalWeight } = props;
	const { register, handleSubmit, errors } = useForm();
	
	return (
		<form
			onSubmit={handleSubmit((values) => setGoalWeight(values.weight))}
			className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>What is your goal weight?</h2>
			</div>
			<div className={classes.weight}>
				<Input
					key='weight'
					name='weight'
					placeholder='-'
					value={goalWeight}
					type='tel'
					max='1000'
					min='1'
					register={register({
						required: true,
						min: 1,
						max: 1000
					})}
				/>
				<p>lbs</p>
			</div>
				{errors.weight?.type === "required" && <p className={classes.error}>Please enter your goal weight</p>}
				{errors.weight?.type === "min" && <p className={classes.error}>Weight must be greater than 0lbs</p>}
				{errors.weight?.type === "max" && <p className={classes.error}>Weight must be less than 1000lbs</p>}
			<Button type='submit' btnType='Success' style={{ width: '40vw' }}>
				Set Goal Weight
			</Button>
		</form>
	);
};

export default OnboardingPage8;
