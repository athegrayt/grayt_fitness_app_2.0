import React from 'react'
import classes from './Cockpit.module.css'
    
const Cockpit = (props) => {
	
	let calorieTotal= 0 
	
	if (props.journalEntries !== null){
		
		calorieTotal = props.journalEntries
			.map((entry) => {
				return entry.nf_calories;
			})
			.reduce((total, cur, i) => {
				return total + cur;
			});
	}
	
	return (
		<div className={classes.Cockpit}>
			<h1> {props.date}</h1>
			<h3>Calories: {calorieTotal}/2000</h3>
		</div>
	);
}

export default Cockpit