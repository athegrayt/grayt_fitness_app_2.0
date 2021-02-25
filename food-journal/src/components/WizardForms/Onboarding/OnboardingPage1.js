import React from 'react';
import Button from '../../UI/Button/Button';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage1 = (props) => {
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>Let's learn alittle about you.</h2>
				<p>Help up customized your experience! </p>
                <p>There are only 7 questions!</p>
			</div>
		</div>
	);
};

export default OnboardingPage1;
