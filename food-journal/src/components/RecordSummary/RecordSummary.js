import React from 'react'
import {connect} from 'react-redux'
// import CalorieMeter from '../CalorieMeter/CalorieMeter'
import Graphic from '../Graphic/Graphic'
// import NutritionFact from '../NutritionFact/NutritionFact';
import {calCount} from '../../shared/nutritionTotalFunctions'
import classes from './RecordSummary.module.css';
import * as actions from '../../store/actions'
    
const RecordSummary = (props) =>{
   const { breakfast, lunch, dinner, snack, nutritionBreakdown } = props;
		const meals = [
			{ meal: breakfast, name: 'breakfast' },
			{ meal: lunch, name: 'lunch' },
			{ meal: dinner, name: 'dinner' },
			{ meal: snack, name: 'snack' },
		];
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
    if (nutritionBreakdown) {
        nutritionTotal = {
            calories: nutritionBreakdown.nf_calories,
            carbs: nutritionBreakdown.nf_total_carbohydrate,
            protein: nutritionBreakdown.nf_protein,
            fat: nutritionBreakdown.nf_total_fat,
        };
    }

    let perOfGoal = Math.round(100 * (nutritionTotal.calories / newCalGoal));

    return (
			<div className={classes.recordSummary} 
            // onClick={()=>props.setBreakdown(nutritionTotal, null)}
            >
				<div className={classes.graphics}>
					<Graphic
						perOfGoal={perOfGoal}
						breakdown={props.breakdown}
						nutritionTotal={nutritionTotal}
						// meal={meal}
					/>
				</div>
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

export default connect(mapStateToProps, actions)(RecordSummary);