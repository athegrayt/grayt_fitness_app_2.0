import React from 'react';
import Button from '../../UI/Button/Button';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage3 = (props) => {
	const { setSex, sex } = props;
	
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>How do you identify yourself?</h2>
				<p>
					We ask this to make sure your journey is fun healthy and balanced.
				</p>
			</div>
			<div className={classes.btns}>
				<Button
					type='input'
					btnType={sex === 'male' ? 'Success' : 'Auth'}
					value='male'
					clicked={() => setSex('male')}>
					Male
				</Button>
				<Button
					type='input'
					btnType={sex === 'female' ? 'Success' : 'Auth'}
					value='female'
					clicked={() => setSex('female')}>
					Female
				</Button>
				<Button
					type='input'
					btnType={sex === 'non-binary' ? 'Success' : 'Auth'}
					value='non-binary'
					clicked={() => setSex('non-binary')}>
					Non-Binary
				</Button>
			</div>
		</div>
	);
};

export default OnboardingPage3;
