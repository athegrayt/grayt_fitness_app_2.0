import React from 'react';
import Picker from 'react-scrollable-picker';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage4 = (props) => {
	const { setHeight, height } = props;
    const initHeight = 68
    const valueGroups = {
			feet: Math.floor(height / 12) || Math.floor(initHeight / 12),
			inches: height % 12 || initHeight % 12,
		};
    console.log(height, valueGroups);
    const optionGroups= {
        feet:[{value: 1, label: '1 ft'},
            {value: 2, label: '2 ft'},
            {value: 3, label: '3 ft'},
            {value: 4, label: '4 ft'},
            {value: 5, label: '5 ft'},
            {value: 6, label: '6 ft'}
        ],
        inches:[
            {value: 1, label: '1 in'},
            {value: 2, label: '2 in'},
            {value: 3, label: '3 in'},
            {value: 4, label: '4 in'},
            {value: 5, label: '5 in'},
            {value: 6, label: '6 in'},
            {value: 7, label: '7 in'},
            {value: 8, label: '8 in'},
            {value: 9, label: '9 in'},
            {value: 10, label: '10 in'},
            {value: 11, label: '11 in'},
        ]
    }

    const heightHandler = (name, value) => {
			let feet = Math.floor((height || initHeight) / 12);
			let inches = (height || initHeight) % 12;
			if (name === 'feet') {
				feet = value;
			}
			if (name === 'inches') {
				inches = value;
			}
			return feet * 12 + inches;
		};
        
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h2>How tall are you?</h2>
				<p>This helps us to define your body shape and calibrate your plan.</p>
			</div>
			<div className={classes.btns}>
				<Picker
					optionGroups={optionGroups}
					valueGroups={valueGroups}
					onChange={(name, value) => setHeight(heightHandler(name, value))}
				/>
			</div>
		</div>
	);
};

export default OnboardingPage4;
