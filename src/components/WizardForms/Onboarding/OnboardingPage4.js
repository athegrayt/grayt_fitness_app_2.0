import React from 'react';
import Slider from 'react-rangeslider';
import * as classes from './OnboardingPages.module.css';
import './Slider.css';

const OnboardingPage4 = (props) => {
	const { setHeight, height } = props;
	
	const formatFeet = foot => foot + 'ft'
	const formatInches = inches => inches + 'in'
	const feet = Math.floor(height / 12)
	const inches =height % 12 > 0 ? height % 12 : 0 
	console.log({height, feet, inches})
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h3>How tall are you?</h3>
			</div>
			<div className={classes.height}>
				<div style={{fontWeight:'700'}}>
					{formatFeet(feet)}
					{'  '}
					{formatInches(inches)}
				</div>
				<div className='slider custom-labels'>
					<Slider
						min={1}
						max={6}
						value={feet}
						format={formatFeet}
						onChange={(value) => value<=6 && setHeight(value * 12 + inches)}
					/>
				</div>
				<div className='slider custom-labels'>
					<Slider
						className='rangeslider'
						min={0}
						max={12}
						value={inches }
						format={formatInches}
						onChange={(value) => value<12 && (feet<=6) && setHeight(feet*12 + value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default OnboardingPage4;
