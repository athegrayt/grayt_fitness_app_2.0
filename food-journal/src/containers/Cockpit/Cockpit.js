import React, {useEffect, useContext} from 'react';
import Graphic from '../../components/Graphic/Graphic';
import DailyJournalContext from '../../context/daily-journal-context'
import { connect } from 'react-redux';
import {calCount} from '../../shared/utility'
import * as actions from '../../store/actions';
import * as classes from './Cockpit.module.css';

const Cockpit = (props) => {
	const context = useContext(DailyJournalContext);

	const {
		breakfast,
		lunch,
		dinner,
		snack,
		setNutritionBreakdown,
		nutritionBreakdown,
	} = context;
	const meals = [breakfast, lunch, dinner, snack];
	const {
		// nutritionBreakdown,
		setTotalCalories,
	} = props;
	useEffect(() => {
		setTotalCalories(nutritionTotal.calories);
	}, []);
	const clicked = (calories, meal) => {
		if (calories > 0) {
			setNutritionBreakdown(nutritionTotal);
			nutritionBreakdown ? props.tabHandler(null) : props.tabHandler(true);
			props.setPage(!nutritionBreakdown ? 'nutriFacts' : 'jrlEntry');
		}else if (calories === 0 && !meal) {
			props.tabHandler(true);
			props.setPage('nutriFacts');
		}
	}
	
	
	let nutritionTotal = meals
		.map((meal) => {
			return calCount(meal.entries);
		})
		.reduce((total, cur) => {
			return {
				calories: Math.round(total.calories + cur.calories),
				carbs: Math.round(total.carbs + cur.carbs),
				protein: Math.round(total.protein + cur.protein),
				fat: Math.round(total.fat + cur.fat),
			};
		});
		console.log(nutritionTotal);
		
	let newCalGoal = props.goal.calorieGoal;
	if (props.meal && !nutritionBreakdown) {
		nutritionTotal = meals
			.filter((meal) => meal.name === props.meal)
			.map((meal) => calCount(meal.entries))[0];
	}
	if(nutritionBreakdown){
		nutritionTotal = {
			calories: nutritionBreakdown.nf_calories,
			carbs: nutritionBreakdown.nf_total_carbohydrate,
			protein: nutritionBreakdown.nf_protein,
			fat: nutritionBreakdown.nf_total_fat,
		};;
	}

	let perOfGoal = Math.round(100 * (nutritionTotal.calories / newCalGoal));
		
	let meal = props.meal
		? props.meal.charAt(0).toUpperCase() + props.meal.slice(1)
		: "Current";
	let label = nutritionBreakdown
		? `${nutritionTotal.calories} cal`
		: `of caloric goal`;
		
		return (
			<div
				className={classes.cockpit}
				onClick={() => {
					clicked(nutritionTotal.calories, props.meal);
				}}>
				<Graphic
					perOfGoal={perOfGoal}
					breakdown={nutritionBreakdown}
					nutritionTotal={nutritionTotal}
					meal={meal}
				/>
				<h3>{label}</h3>
			</div>
		);
};

const mapStateToProps = (state) => {
	return {
		totalCal: state.journalEntries.totalCal,
		// nutritionBreakdown: state.journalEntries.nutritionBreakdown,
		// breakdown: state.journalEntries.breakdown,
		// meal: state.tabBar.meal,
		// breakfast: state.journalEntries.breakfast,
		// lunch: state.journalEntries.lunch,
		// dinner: state.journalEntries.dinner,
		// snack: state.journalEntries.snack,
		goal: state.userInfo.userInfo[0],
		// token: state.auth.token,
		// userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, actions)(Cockpit);
