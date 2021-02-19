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
	parent
) => {
	const [nutritionTotal, setNutritionTotal] = useState({});
	const [curTotalCal, setCurTotalCal] = useState(0)
	

	useEffect(() => {
		const meals = [breakfast, lunch, dinner, snack];
		if (meals && !meal && !food) {
			const curNutritionTotal = noMealNoFood(meals);
			setNutritionTotal(curNutritionTotal);
			setCurTotalCal(curNutritionTotal.calories);
		} else if (meals && meal && !food) {
			const curNutritionMeal = noFood(meals, meal);
			setNutritionTotal(curNutritionMeal);
		} else if (meals && !meal && food) {
			const curNutritionFood = noMeal(food);
			setNutritionTotal(curNutritionFood);
		}
	}, [breakfast, lunch, dinner, snack, meal, food]);
	
	return [nutritionTotal, curTotalCal];

	
};

export default useNutritionTotal;
