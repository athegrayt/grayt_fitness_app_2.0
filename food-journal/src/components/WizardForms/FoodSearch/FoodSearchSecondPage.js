import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form'; 
import Button from '../../UI/Button/Button';
import Input from '../../UI/Forms/Input/Input';
import * as classes from './FoodSearchPages.module.css';

const FoodSearchSecondPage = (props) => {
	const { food, qty, unit, previousPage, onSubmit } = props;
	const { register, handleSubmit, errors } = useForm();

	return (
		<div className={classes.foodSearchSecondPage}>
			<div onClick={previousPage} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<div className={classes.info}>
				<h3>FOOD:</h3>
				<h3>{food}</h3>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.foodSearchPage}>
				<div className={classes.info}>
					<h3>Amount:</h3>
					<div style={{ width: '15vw' }}>
						<Input
							key='serving_qty'
							name='serving_qty'
							type='number'
							placeholder='Ex. 1'
							register={register}
							defaultValue={qty}
							min='0'
							error={errors['serving_qty']}
						/>
					</div>
				</div>
				<div className={classes.info}>
					<h3>Unit:</h3>
					<h3 style={{ color: '#000' }}>{unit}</h3>
				</div>
				<Button type='submit' btnType='Success' style={{ margin: '2vh auto' }}>
					Add Entry
				</Button>
			</form>
		</div>
	);
};

export default FoodSearchSecondPage;
