import React from 'react';
import  Button  from '../../UI/Button/Button';
import classes from './FoodSelect.module.css';
import PropTypes from 'prop-types';
// import AutoComplete from './AutoComplete/AutoComplete'

const FoodSelect = (props) => {
	let button = null
	// if(props.food !== undefined){
	// 	console.log(props.food);
		button =
			<Button btnType="Success" clicked={props.clicked} disabled={!props.food}>
				Next
			</Button>
	// }
	console.log(props.food)
	return (
		<div className={classes.FoodSelect}>
			<p>Please enter food name:</p>
			<input
				placeholder="ex. Chicken"
				type="text"
				value={props.food}
				onChange={props.changed}
			/>
			{button}
		</div>
	);
};

FoodSelect.prototype = {
	food: PropTypes.string,
	changed: PropTypes.func,
	clicked: PropTypes.func,
};

export default FoodSelect;
