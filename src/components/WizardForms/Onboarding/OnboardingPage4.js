import React from 'react';
import Slider from 'react-rangeslider';
import * as classes from './OnboardingPages.module.css';
import './Slider.css';

const OnboardingPage4 = (props) => {
	const { setHeight, height } = props;
	console.log(height)
	
	const formatFeet = foot => foot + 'ft'
	const formatInches = inches => inches + 'in'

	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h3>How tall are you?</h3>
			</div>
			<div className={classes.height}>
				<div style={{fontWeight:'700'}}>
					{formatFeet(Math.floor(height / 12))}
					{'  '}
					{formatInches(height % 12)}
				</div>
				<div className='slider custom-labels'>
					<Slider
						min={0}
						max={6}
						value={Math.floor(height / 12)}
						format={formatFeet}
						handleLabel={Math.floor(height / 12)}
						onChange={(value) => setHeight(value * 12 + (height % 12))}
					/>
				</div>
				<div className='slider custom-labels'>
					<Slider
						className='rangeslider'
						min={0}
						max={12}
						value={height % 12}
						format={formatInches}
						handleLabel={height % 12}
						onChange={(value) => setHeight(height - (height % 12) + value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default OnboardingPage4;
