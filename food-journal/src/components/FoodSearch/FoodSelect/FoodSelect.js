import React from 'react';
import { Button } from 'reactstrap';
import classes from './FoodSelect.module.css';
import PropTypes from 'prop-types';
// import AutoComplete from './AutoComplete/AutoComplete'

const FoodSelect = (props) => {
	return (
		<div className={classes.FoodSelect}>
			<p>Please enter food name:</p>
			<input
				placeholder="ex. Chicken"
				type="text"
				value={props.food}
				onChange={props.changed}
			/>
			<Button color="success" size="lg" onClick={props.clicked}>
				Next
			</Button>
		</div>
	);
};

FoodSelect.prototype = {
	food: PropTypes.string,
	changed: PropTypes.func,
	clicked: PropTypes.func,
};

export default FoodSelect;
