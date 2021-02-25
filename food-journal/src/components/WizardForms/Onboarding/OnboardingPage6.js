import React from 'react';
import Picker from 'react-scrollable-picker';
import {groupValuesWeight} from './OnbaordingPagesUtilities'
import * as classes from './OnboardingPages.module.css';

const OnboardingPage6 = (props) => {
	const { setWeight, weight } = props;
	const valueGroups = {
		weight
	};
	const optionGroups = groupValuesWeight(400);

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>How much do you weight?</h2>
				<p>This helps us to determine your bmi ( body mass index) 🤓.</p>
			</div>
			<div className={classes.btns}>
				<Picker
					optionGroups={optionGroups}
					valueGroups={valueGroups}
					onChange={(name, value) => setWeight(value)}
				/>
			</div>
		</div>
	);
};

export default OnboardingPage6;
