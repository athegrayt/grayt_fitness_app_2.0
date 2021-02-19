export const calCount = (meal) => {
	if (meal.length) {
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
		return mealNutritionTotal;
	}
	return {
		calories: 0,
		carbs: 0,
		protein: 0,
		fat: 0,
	};
};

export const noMealNoFood = (meals)=>{
    console.log('meals && !meal && !food');
		const curNutrition = meals
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
            return curNutrition
}

export const noFood =(meals, meal)=>{
    console.log('meals && meal && !food');
	const curNutrition = meals
			.filter((item) => item.name === meal)
			.map((meal) => calCount(meal.entries))[0];
		return curNutrition 
}

export const noMeal = (food) =>{
    console.log('meals && !meal && food');
		const curNutrition = {
			calories: food.nf_calories,
			carbs: food.nf_total_carbohydrate,
			protein: food.nf_protein,
			fat: food.nf_total_fat,
		};
        return curNutrition
}