import React, {useState, useContext} from 'react'
import DailyJournalContext from '../../context/global-state-context'
import FoodSearchFirstPage from '../WizardForms/FoodSearch/FoodSearchFirstPage'
import FoodSearchSecondPage from '../WizardForms/FoodSearch/FoodSearchSecondPage'
import * as classes from './FoodSearch.module.css'
import useFoodSearch from '../../hooks/useFoodSearch'
	
const FoodSearch =(props)=> {
	const [page, setPage] = useState(1)
	const [food, setFood] = useState()
	const [quantity, unit, nutrition] = useFoodSearch(food)
	const context = useContext(DailyJournalContext)
	const onSubmit = (values) => {
			let updatedFoodSearch = { ...nutrition };
			for (let nutritionFact in updatedFoodSearch) {
				if (updatedFoodSearch[nutritionFact] === null) {
					updatedFoodSearch[nutritionFact] = 0;
				}
				if (Number.isFinite(updatedFoodSearch[nutritionFact])) {
					updatedFoodSearch[nutritionFact] = Math.round(
						updatedFoodSearch[nutritionFact] / quantity
					);
				}
			}
			updatedFoodSearch.serving_qty = +values.serving_qty;
			updatedFoodSearch.userId=context.userId
			const entry = updatedFoodSearch
			const {token} = context
			const {meal} = props;
			context.addEntry(meal, entry, token);
			props.previousPage('jrlEntry');

	};

		return (
			<div className={classes.foodSearch}>
				{page === 1 && (
					<FoodSearchFirstPage
						previousPage={() => props.previousPage('jrlEntry')}
						onSubmit={(values) => {
							setFood(values['food_name']);
							setPage(page + 1);
						}}
					/>
				)}
				{page === 2 && (
					<FoodSearchSecondPage
						unit={unit}
						food={food}
						qty={quantity}
						previousPage={()=>setPage(page - 1)}
						onSubmit={onSubmit}
					/>
				)}
			</div>
		);
};


export default FoodSearch
