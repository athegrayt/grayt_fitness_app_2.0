import React from 'react';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage1 = (props) => {
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h1>Let's create your profile.</h1>
				<p>Help us customize your experience! </p>
                <h3>There are only 7 questions!</h3>
			</div>
		</div>
	);
};

export default OnboardingPage1;
