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
	const [nutritionTotal, setNutritionTotal] = useState({});
	const [curTotalCal, setCurTotalCal] = useState(0)
	const [percent, setPercent] = useState(0)
	

	useEffect(() => {
		const meals = [breakfast, lunch, dinner, snack];
		if (meals && !meal && !food) {
			const curNutritionTotal = noMealNoFood(meals);
			const percentage = Math.round(
				100 * (curNutritionTotal.calories / calGoal)
			) || 0
			setPercent(percentage);
			setNutritionTotal(curNutritionTotal);
			setCurTotalCal(curNutritionTotal.calories);
		} else if (meals && meal && !food) {
			const curNutritionMeal = noFood(meals, meal);
			const percentage = Math.round(
				100 * (curNutritionMeal.calories / curTotalCal)
			) || 0
			setPercent(percentage);
			setNutritionTotal(curNutritionMeal);
		} else if (meals && !meal && food) {
			const curNutritionFood = noMeal(food);
			setNutritionTotal(curNutritionFood);
		}
	}, [breakfast, lunch, dinner, snack, meal, food, calGoal, curTotalCal]);
	
	return [nutritionTotal, curTotalCal, percent];

	
};

export default useNutritionTotal;
