import React from 'react';
import Calendar from 'react-calendar';
import '../../../pages/Records/Calendar.css';
import * as classes from './OnboardingPages.module.css';

const OnboardingPage5 = (props) => {
	const { setBirthdate, birthdate } = props;
	const userBirthdate = birthdate || new Date(1985, 1, 1);
	
	return (
		<div className={classes.OnboardingPages}>
			<div className={classes.question}>
				<h3>What is your date of birth?</h3>
			</div>
			<div className={classes.calender}>
				<Calendar
					className='react-calendar'
					onChange={setBirthdate}
					onClickDay={(birth) => setBirthdate(birth)}
					value={userBirthdate}
					next2Label={null}
					prev2Label={null}
					defaultView='decade'
					maxDate={new Date()}
				/>
			</div>
		</div>
	);
};

export default OnboardingPage5;
