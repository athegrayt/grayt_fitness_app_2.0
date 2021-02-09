import React from 'react';
import Graphic from '../../../components/Graphic/Graphic';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import * as classes from './Cockpit.module.css';

const Cockpit = (props) => {
	const clicked = (calories, meal) => {
		if (calories > 0) {
			props.setBreakdown(nutritionTotal, null);
			props.breakdown ? props.setTabStatus(null) : props.setTabStatus(true);
			props.setPage(!props.breakdown ? 'nutriFacts' : 'jrlEntry');
		}else if (calories === 0 && !meal) {
			props.setTabStatus(true);
			props.setPage('nutriFacts');
		}
	}
	
	const { breakfast, lunch, dinner, snack, nutritionBreakdown } = props;
	const meals = [
		{ meal: breakfast, name: 'breakfast' },
		{ meal: lunch, name: 'lunch' },
		{ meal: dinner, name: 'dinner' },
		{ meal: snack, name: 'snack' },
	];
	const calCount = (meal) => {
		if(meal.length) {
			const mealNutritionTotal = meal
				.map((entry) => {
					return {
						calories: entry.nf_calories * entry.serving_qty,
						carbs: entry.nf_total_carbohydrate * entry.serving_qty,
						protein: entry.nf_protein * entry.serving_qty,
						fat: entry.nf_total_fat * entry.serving_qty,
					};
				})
				.reduce((total, cur) => {
					return {
						calories: Math.round(total.calories + cur.calories),
						carbs: Math.round(total.carbs + cur.carbs),
						protein: Math.round(total.protein + cur.protein),
						fat: Math.round(total.fat + cur.fat),
					};
				});
				console.log(mealNutritionTotal);
			return mealNutritionTotal;
		}
		return {
			calories: 0,
			carbs: 0,
			protein: 0,
			fat: 0,
		};
	};

	let nutritionTotal = meals
		.map((meal) => {
			return calCount(meal.meal);
		})
		.reduce((total, cur) => {
			return {
				calories: Math.round(total.calories + cur.calories),
				carbs: Math.round(total.carbs + cur.carbs),
				protein: Math.round(total.protein + cur.protein),
				fat: Math.round(total.fat + cur.fat),
			};
		});
		props.setTotalCalories(nutritionTotal.calories);
		
	let newCalGoal = props.goal.calorieGoal;
	if (props.meal && !nutritionBreakdown) {
		nutritionTotal = meals
			.filter((meal) => meal.name === props.meal)
			.map((meal) => calCount(meal.meal))[0];
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
	let label = props.breakdown
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
				breakdown={props.breakdown}
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
		nutritionBreakdown: state.journalEntries.nutritionBreakdown,
		breakdown: state.journalEntries.breakdown,
		meal: state.tabBar.meal,
		breakfast: state.journalEntries.breakfast,
		lunch: state.journalEntries.lunch,
		dinner: state.journalEntries.dinner,
		snack: state.journalEntries.snack,
		goal: state.userInfo.userInfo[0],
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, actions)(Cockpit);
