import React from 'react'
import Button from '../UI/Button/Button'
import * as classes from './MealButtons.module.css'

const MealButtons = (props) =>{
   	const meals = ['breakfast', 'lunch', 'dinner','snack']
	const mealSelectHandler = (meal, page) => {
		console.log(meal)
		props.setMeal(meal)
		props.setPage(page);
		props.setStatus(true);
	};
    return (
			<div className={classes.mealButtons}>
				{meals.map((meal,i) => {
					const upperCaseName = meal.charAt(0).toUpperCase() + meal.slice(1);
					return (
						<Button
							key={`${meal.name}${i}`}
							type='text'
							btnType='Dashboard'
							clicked={() => mealSelectHandler(meal, 'jrlEntry')}>
							{upperCaseName}
						</Button>
					);
				})}
			</div>
		);
    
};

export default MealButtons;