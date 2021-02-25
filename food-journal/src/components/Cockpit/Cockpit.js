import React from 'react';
import Graphic from '../../components/Graphic/Graphic';
import * as classes from './Cockpit.module.css';

const Cockpit = (props) => {
	const {
		parent,
		food,
		meal,
		page,
		breakdown,
		setBreakdown,
		curStatus,
		setCurStatus,
		setPage,
		nutritionTotal,
		curTotalCal,
		percentage,
	} = props;
	const { calories } = nutritionTotal;

	const clicked = (calories, meal) => {
		console.log('clicked');
		if (
			calories > 0 &&
			!meal &&
			!food &&
			page !== 'foodSearch' &&
			parent === 'dailyJournal'
		) {
			setBreakdown(!breakdown);
			breakdown ? setCurStatus(!curStatus) : setCurStatus(true);
			setPage(!breakdown ? 'nutriFacts' : null);
		} else if (
			calories > 0 &&
			!meal &&
			!food &&
			page !== 'foodSearch' &&
			parent === 'records'
		) {
			setBreakdown(!breakdown);
			setPage(!breakdown ? 'nutriFacts' : 'dailyRecord');
		} else if (calories === 0 && !meal && page !== 'foodSearch') {
			console.log('cal = 0');
			setBreakdown(false);
			setCurStatus(!curStatus);
			setPage('nutriFacts');
		} else if (calories > 0 && meal && page !== 'foodSearch') {
			setBreakdown(!breakdown);
			setPage(!breakdown ? 'nutriFacts' : 'jrlEntry');
		}
	};

	let mealTitle = meal
		? meal.charAt(0).toUpperCase() + meal.slice(1)
		: 'Current';
	let label = `of caloric goal`;
	if (breakdown) {
		label = `${calories} cal`;
	} else if (meal) {
		label = `of consumed calories`;
	}

	console.log('NutritionTotal', nutritionTotal, curTotalCal);
	return (
		<div className={classes[`cockpit-${parent}`]} onClick={() => clicked(calories, meal)}>
			<Graphic
				percentage={percentage}
				breakdown={breakdown}
				nutritionTotal={nutritionTotal}
				meal={mealTitle}
			/>
			<h3>{label}</h3>
		</div>
	);
};

export default Cockpit;
