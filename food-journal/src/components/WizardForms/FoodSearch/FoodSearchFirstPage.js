import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FaAngleLeft } from 'react-icons/fa';
import Button from '../../UI/Button/Button'
import { required } from 'redux-form-validators';
import Input from '../../UI/Forms/Input/Input';
import {foodField} from '../../../containers/Dashboard/DailyJournal/FoodSearch/searchFields'
import * as classes from './FoodSearchPages.module.css'

const FoodSearchFirstPage = (props) => {
    let fields = foodField.map(({ label, name, type }, i) => {	
			return (
				<Field
					key={`${name}${i}`}
					name={name}
					placeholder={label}
					type={type}
					component={Input}
					validate={required()}
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
				{fields}
				<Button type='submit' btnType='Success'>
					Next
				</Button>
			</form>
		</div>
	);
};

export default reduxForm({
	form: 'foodSearch', // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	required,
})(FoodSearchFirstPage);
