import React from 'react';
import { Field, reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux'
import * as actions from '../../../store/actions'
import { FaAngleLeft } from 'react-icons/fa';
import Button from '../../UI/Button/Button'
import { required, inclusion } from 'redux-form-validators';
import Input from '../../UI/Forms/Input/Input';
import {foodField} from '../../../containers/Dashboard/DailyJournal/FoodSearch/searchFields'
import * as classes from './FoodSearchPages.module.css'

const handleOnFormChange = (newValues, dispatch, props, previousValues )=>{
if (newValues !== previousValues && props.dirty){
	console.log(newValues, props.value, props.dirty)
	props.autoComplete(newValues.food_name);
}
}

const FoodSearchFirstPage = (props) => {
	const hints = props.hint.map((food, i) => {
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
	)}).flat();
	let fields = foodField.map(({ label, name, type }, i) => {	
		
		let error = null;
		if (props.errors) {
			error = props.errors[name];
		}
			const validate = [
				required()]	
			if(props.dirty){
				validate.push(inclusion({
						in: props.hint,
						caseSensitive: false,
						message:
							"Sorry, this doesn't seem to be a valid food. Please try again.",
					}))
			} 
		return (
			<Field
				key={`${name}${i}`}
				name={name}
				placeholder={label}
				type={type}
				onChange={() => {
					if (formValueSelector('foodSerach', 'food_name')) {
						props.setHint([]);
					}
				}}
				value={formValueSelector('foodSerach', 'food_name')}
				component={Input}
				validate={validate}
				error={error}
			/>
		);
		});
	const { handleSubmit, previousPage } = props;
	
	return (
		<div>
			<div onClick={() => previousPage('jrlEntry')} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<form onSubmit={handleSubmit} className={classes.foodSearchPage}>
				<h3>Food Search</h3>
				<div className={classes.autoComplete}>
					{fields}
					<select
						onChange={(event) => {
							props.initialize({ food_name: event.target.value });
							props.setHint([]);
						}}
						className={
							hints.length > 0 ? classes.autoCompleteSelect : classes.empty
						}>
						
						{hints}
					</select>
				</div>
				<Button type='submit' btnType='Success'>
					Next
				</Button>
			</form>
		</div>
	);
};

const selector = formValueSelector('foodSearch')


export default connect(state=>{
	const value = selector(state,'food_name')
	return { value, hint: state.journalEntries.hint };
}, actions)(
	reduxForm({
		form: 'foodSearch', // <------ same form name
		destroyOnUnmount: true, // <------ preserve form data
		required, inclusion,
		onChange:handleOnFormChange,
	})(FoodSearchFirstPage)
);
