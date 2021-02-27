import React from 'react';
import Button from '../../UI/Button/Button';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage7 = (props) => {
	const { setActivity, activity } = props;

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>What is your daily activity level?</h2>
				<p>
					Let's see how many calories you are already 
					burning on a daily basis.
				</p>
			</div>
			<div className={classes.btns}>
				<Button
					type='input'
					btnType={activity === 'Low' ? 'Success' : 'Auth'}
					value='1.25'
					clicked={() => setActivity('Low')}>
					<p>Low: Desk Job</p>
				</Button>
				<Button
					type='input'
					btnType={activity === 'Moderate' ? 'Success' : 'Auth'}
					value='1.4'
					clicked={() => setActivity('Moderate')}>
					<p>Moderate: Mix of Desk Job and Physical Labor</p>
				</Button>
				<Button
					type='input'
					btnType={activity === 'High' ? 'Success' : 'Auth'}
					value='1.65'
					clicked={() => setActivity('High')}>
					<p>High: Physical Labor</p>
				</Button>
			</div>
		</div>
	);
};

export default OnboardingPage7;
