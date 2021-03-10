import React from 'react';
import Input from '../../UI/Forms/Input/Input';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage2 = (props) => {
	const { setName, name } = props;

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>What should we call you?</h2>
				<p>We ask this to make your experience personal.</p>
			</div>
			<div className={classes.btns}>
				<Input placeholder='Ex. Bob Marley' value={name} onChange={event=>setName(event.target.value)}/> 
			</div>
		</div>
	);
};

export default OnboardingPage2;
