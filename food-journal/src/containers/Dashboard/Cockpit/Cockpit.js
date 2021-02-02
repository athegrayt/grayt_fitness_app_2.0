import React from 'react';
import Graphic from '../../../components/Graphic/Graphic'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions'
import * as classes from './Cockpit.module.css'

const Cockpit = (props) => {
	const {breakfast, lunch, dinner, snack}= props
	const meals = [{meal: breakfast, name: 'breakfast'}, {meal: lunch, name: 'lunch'}, {meal: dinner, name:'dinner'}, {meal: snack, name: 'snack'}]
	const calCount = (meal) => {	
		const todayDate = new Date().toUTCString().slice(0, 16);
		const curDayEntries = meal.filter((entry) => {
			const date = new Date(entry.consumed_at.slice(0, 10))
			.toUTCString()
			.slice(0, 16);
			return date === todayDate;
		})
		if(!curDayEntries.length){
			return {
				calories: 0,
				carbs: 0,
				protein: 0,
				fat: 0,
			};
		}else{
			const mealNutritionTotal = curDayEntries
				.map((entry) => {
					return {
						calories: entry.nf_calories,
						carbs: entry.nf_total_carbohydrate,
						protein: entry.nf_protein,
						fat: entry.nf_total_fat,
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
		return mealNutritionTotal
		}
		}	
	
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
		
	let newCalGoal = props.goal.calorieGoal;
	if(props.meal){
		nutritionTotal =meals
		.filter((meal) => meal.name === props.meal)
		.map((meal) => calCount(meal.meal))[0];
	}
	console.log(nutritionTotal);
	let perOfGoal = Math.round(100 * (nutritionTotal.calories / newCalGoal));;
	let meal = props.meal
		? props.meal.charAt(0).toUpperCase() + props.meal.slice(1)
		: "Today's";	
    
return (
	<div
		className={classes.cockpit}
		onClick={() => props.setBreakdown(nutritionTotal)}>
		<Graphic
			perOfGoal={perOfGoal}
			breakdown={props.breakdown}
			nutritionTotal={nutritionTotal}
		/>
		<h3>{meal} Caloric Intake</h3>
	</div>
);
}

const mapStateToProps = (state) => {
	return {
		breakdown: state.journalEntries.breakdown,
		meal: state.journalEntries.meal,
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