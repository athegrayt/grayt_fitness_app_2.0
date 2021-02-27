import { useState, useEffect, } from 'react';
import {
	noMealNoFood,
	noFood,
	noMeal,
} from '../shared/nutritionTotalFunctions';

const useNutritionTotal = (
	breakfast,
	lunch,
	dinner,
	snack,
	meal,
	food,
	calGoal
) => {
	const [nutritionTotal, setNutritionTotal] = useState({
		calories: 0,
		carbs: 0,
		protein: 0,
		fat: 0,
	});
	const [curTotalCal, setCurTotalCal] = useState(0)
	const [percent, setPercent] = useState(0)
	

	useEffect(() => {
		const meals = [breakfast, lunch, dinner, snack];
		let curNutritionTotal = 0;
		let percentage = 0
		let totalCal = 0
		if (meals && !meal && !food) {
			curNutritionTotal = noMealNoFood(meals);
			 percentage = Math.round(
				100 * (curNutritionTotal.calories / calGoal)
			) || 0
			totalCal = curNutritionTotal.calories;
		} else if (meals && meal && !food) {
			curNutritionTotal = noFood(meals, meal);
			totalCal = noMealNoFood(meals).calories
			percentage =
				Math.round(100 * (curNutritionTotal.calories / totalCal)) || 0;
		} else if (meals && !meal && food) {
			curNutritionTotal = noMeal(food);
			totalCal = curNutritionTotal.calories
		}
		setPercent(percentage);
		setCurTotalCal(totalCal);
		setNutritionTotal(curNutritionTotal);
	}, [breakfast, lunch, dinner, snack, meal, food, calGoal, curTotalCal]);
	
	return [nutritionTotal, curTotalCal, percent];

	
};

export default useNutritionTotal;
