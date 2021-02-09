import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Field, reduxForm } from 'redux-form';
import Button from '../../UI/Button/Button';
import { required, format } from 'redux-form-validators';
import Input from '../../UI/Forms/Input/Input';
import { journalFields } from '../../../containers/Dashboard/DailyJournal/FoodSearch/searchFields';
import * as classes from './FoodSearchPages.module.css';

const FoodSearchSecondPage = (props) => {
	const { food, qty, unit } = props;
	let fields = journalFields.map(({ label, name, type }, i) => {
		let value = null;
		let error = null
		if (props.errors) {
			error = props.errors[name];
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
				component={Input}
				validate={[
					required(),
					// format({ with: /\d/i }),
					format({ without: /-/i, message: 'Please enter a valid amount.' }),
				]}
				min='0'
				error={error}
			/>
		);
	});
	const { handleSubmit, previousPage } = props;
	return (
		<div className={classes.foodSearchSecondPage}>
			<div onClick={previousPage} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<div className={classes.info}>
				<h3>FOOD:</h3>
				<h3>{food}</h3>
			</div>

			<form onSubmit={handleSubmit} className={classes.foodSearchPage}>
				<div className={classes.info}>
					<h3>Amount:</h3>
					<div style={{ width: '15vw' }}>{fields}</div>
				</div>
				<div className={classes.info}>
					<h3>Unit:</h3>
					<h3 style={{ color: '#000' }}>{unit}</h3>
				</div>
				<Button type='submit' btnType='Success'style={{margin: '2vh auto'}}>
					Add Entry
				</Button>
			</form>
		</div>
	);
};

export default reduxForm({
	form: 'foodSearch', // <------ same form name
	destroyOnUnmount: true, // <------ preserve form data
	required, format,
})(FoodSearchSecondPage);
