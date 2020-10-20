import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button'
import classes from './FoodSelected.module.css';

const foodSelected = (props) => {
	return (
		<div className={classes.FoodSelected}>
			<div className={classes.foodInfo}>
				<input
					type="number"
					value={props.amount}
					onChange={props.amountChanged}
				/>
				<input type="select" value={props.unit} onChange={props.unitChanged} />
			</div>
			<div className={classes.foodInfo}>
				<h2>{props.food}</h2>
				<Button btnType="Success" clicked={props.addEntry}>
					ADD ENTRY
				</Button>
			</div>
		</div>
	);
};

foodSelected.propTypes = {
	amount: PropTypes.number,
	unit: PropTypes.string,
	food: PropTypes.string,
	amountChanged: PropTypes.func,
	unitChanged: PropTypes.func,
};

export default foodSelected;
