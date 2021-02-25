import React from 'react';
import Picker from 'react-scrollable-picker';
import { groupValuesGoalWeight } from './OnbaordingPagesUtilities';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage8 = (props) => {
	const { setGoalWeight, goalWeight } = props;
	const valueGroups = {
		goalWeight,
	};
	const optionGroups = groupValuesGoalWeight(400);

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>What is your goal weight?</h2>
				<p>This helps us have a clear vision of the final destination.</p>
			</div>
			<div className={classes.btns} style={{cursor: 'grab'}}>
				<Picker
					optionGroups={optionGroups}
					valueGroups={valueGroups}
					onChange={(name, value) => setGoalWeight(value)}
				/>
			</div>
		</div>
	);
};

export default OnboardingPage8;
