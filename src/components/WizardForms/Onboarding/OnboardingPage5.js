import React from 'react';
import Picker from 'react-scrollable-picker';
import {optionGroupsAge} from './OnbaordingPagesUtilities';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage5 = (props) => {
	const { setAge, age } = props;
	const valueGroups = {
		age,
	};
	

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>How old are you?</h2>
				<p>This helps us to better calibrate your plan.</p>
			</div>
			<div className={classes.btns}>
				<Picker
					optionGroups={optionGroupsAge(100)}
					valueGroups={valueGroups}
					onChange={(name, value) => setAge(value)}
				/>
			</div>
		</div>
	);
};

export default OnboardingPage5;
