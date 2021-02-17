import React from 'react'
import Button from '../UI/Button/Button'
import * as classes from './MealButtons.module.css'

const MealButtons = (props) =>{
   const mealSelectHandler = (meal, page) => {
		props.setMeal(meal)
		props.setPage(page);
		props.setCurStatus(true);
	};
    return (
			<div className={classes.mealButtons}>
				{['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
					const upperCaseName = meal.charAt(0).toUpperCase() + meal.slice(1);
					return (
						<Button
							key={meal}
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