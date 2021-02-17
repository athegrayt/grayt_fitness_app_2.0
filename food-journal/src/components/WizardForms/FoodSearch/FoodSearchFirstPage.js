import React from 'react';
import {useForm} from 'react-hook-form'
import { FaAngleLeft } from 'react-icons/fa';
import Button from '../../UI/Button/Button'
import Input from '../../UI/Forms/Input/Input';
import * as classes from './FoodSearchPages.module.css'
import useAutoSuggestions from '../../../hooks/useAutoSuggestions';

const FoodSearchFirstPage = (props) => {
	const { previousPage } = props;
	const {register, handleSubmit, reset, watch, errors} = useForm()
	const watchFoodName = watch('food_name');
	let hints = useAutoSuggestions(watchFoodName)
	
	const hintList = hints.map((food, i) => {
		if(i===0){
			return [
				<option disabled selected key={-1} value={-1}>
					Suggestions:
				</option>,
				<option key={i} value={food}>
					{food}
				</option>,
			];
		}
		return(
			<option key={i} value={food}>
			{food}
		</option>
	)})
	
		
	return (
		<div>
			<div onClick={() => previousPage('jrlEntry')} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<form
				onSubmit={handleSubmit(props.onSubmit)}
				className={classes.foodSearchPage}>
				<h3>Food Search</h3>
				<div className={classes.autoComplete}>
					<Input
						name='food_name'
						type='text'
						placeholder='Ex. Tacos'
						register={register({ required: true, maxLength: 50 })}
						value={props.value}
						onChange={props.onChange}
					/>

					<select
						onChange={(event) => {
							reset({food_name: event.target.value})
						}}
						className={
							hintList.length > 0 ? classes.autoCompleteSelect : classes.empty
						}>
						{hintList}
					</select>
				</div>
				<Button type='submit' btnType='Success'>
					Next
				</Button>
			</form>
		</div>
	);
};

export default FoodSearchFirstPage

