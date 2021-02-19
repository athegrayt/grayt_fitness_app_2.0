import React, { useContext } from 'react';
import Graphic from '../../components/Graphic/Graphic';
import useNutritionTotal from '../../hooks/useNutritionTotal';
import DailyJournalContext from '../../context/daily-journal-context';
import * as classes from './Cockpit.module.css';

const Cockpit = (props) => {
	const context = useContext(DailyJournalContext);
	const { breakfast, lunch, dinner, snack } = context;
	const { food, meal, breakdown, setBreakdown, tabHandler, setPage } = props;
	const [nutritionTotal, curTotalCal] = useNutritionTotal(
		breakfast,
		lunch,
		dinner,
		snack,
		meal,
		food,
		'cockpit'
	);
	
	const clicked = (calories, meal) => {
		console.log('clicked');
		if (calories > 0) {
			setBreakdown(null);
			breakdown ? tabHandler(null) : tabHandler(true);
			setPage(!breakdown ? 'nutriFacts' : 'jrlEntry');
		} else if (calories === 0 && !meal) {
			tabHandler(true);
			setPage('nutriFacts');
		}
	};

	let newCalGoal = 2000;
	let perOfGoal = Math.round(100 * (curTotalCal / newCalGoal));

	let mealTitle = meal
		? meal.charAt(0).toUpperCase() + meal.slice(1)
		: 'Current';
	let label = breakdown ? `${nutritionTotal.calories} cal` : `of caloric goal`;
	console.log('NutritionTotal',nutritionTotal);
	return (
		<div
			className={classes.cockpit}
			onClick={() => clicked(nutritionTotal.calories, meal)}>
			<Graphic
				perOfGoal={perOfGoal}
				breakdown={breakdown}
				nutritionTotal={nutritionTotal}
				meal={mealTitle}
			/>
			<h3>{label}</h3>
		</div>
	);
};

export default Cockpit;
