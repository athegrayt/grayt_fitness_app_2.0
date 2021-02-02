import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Field, reduxForm } from 'redux-form';
import Button from '../../UI/Button/Button';
import { required } from 'redux-form-validators';
import Input from '../../UI/Forms/Input/Input';
import { journalFields } from '../../../containers/Dashboard/DailyJournal/FoodSearch/searchFields';
import * as classes from './FoodSearchPages.module.css';

const FoodSearchSecondPage = (props) => {
	const { food, qty, unit } = props;
	let fields = journalFields.map(({ label, name, type }, i) => {
		let options = null;
		let value = null;
		let validate = required();
		if (type === 'select') {
			validate = null
			options = (
				<option selected value={unit}>
					{unit}
				</option>
			);
		}
		if (type === 'number') {
			value = qty;
		}
		return (
			<Field
				key={`${name}${i}`}
				name={name}
				label={label}
				type={type}
				placeholder={label}
				defaultValue={value}
				{...options}
				component={Input}
				validate={validate}
			/>
		);
	});
	const { handleSubmit, previousPage } = props;
	return (
		<div>
			
			<div onClick={previousPage} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<h3 style={{color: '#000', marginBottom: '0'}}>{food}</h3>
			
			<form onSubmit={handleSubmit} className={classes.foodSearchPage}>
				{fields}
				<Button type='submit' btnType='Success'>
					Add Entry
				</Button>
			</form>
		</div>
	);
};

export default reduxForm({
	form: 'foodSearch', // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	required,
})(FoodSearchSecondPage);
