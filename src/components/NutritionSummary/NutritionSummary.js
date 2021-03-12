import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Button from '../UI/Button/Button';
import CalorieMeter from '../CalorieMeter/CalorieMeter';
import NutritionFact from '../NutritionFact/NutritionFact';
import classes from './NutritionSummary.module.css';

const NutritionSummary = (props) => {
	const {
		deleteEntry,
		entryMeal,
		food,
		meal,
		breakdown,
		nutritionTotal,
		curTotalCal,
		parent,
		percentage,
		setMeal,
		setPage,
		setCurStatus,
		setBreakdown,
		setFood,
		calGoal
	} = props;
	
	const deleteHandler = () => {
		deleteEntry(
			food,
			food.docID,
			entryMeal,
			new Date(food.consumed_at).toISOString().slice(0, 10)
		);
		setFood(null)
		setMeal(entryMeal)
		setPage('jrlEntry');
		setBreakdown(false);
	};

	let facts =
		curTotalCal === 0 ? (
			<div className={classes.empty}>
				<p style={{ marginTop: '0' }}>Steps to get started:</p>
				<p>1. Close this tab</p>
				<p>
					2. Click on one of the{' '}
					<Button style={{ width: '100px' }} type='button' btnType='Success'>
						Meal
					</Button>{' '}
					to start tracking your diet!
				</p>
			</div>
		) : (
			Object.entries(nutritionTotal).map((fact, i) => {
				const name = fact[0];
				const data = fact[1];
				if (i !== 0) {
					return <NutritionFact key={i} name={name} data={data} />;
				}
				return null
			})
		);

	let description = curTotalCal>0 && `Total % of ${calGoal} cal daily goal:`;
	if (meal && !food) {
		description = `${meal} % of consumed calories:`;
	} else if (food) {
		description = `${food.serving_qty} ${food.serving_unit} of ${food.food_name}`;
		if (food.food_name === food.serving_unit && breakdown) {
			description = `${food.serving_qty} ${food.food_name}`;
		}
	}
	
	return (
		<div className={classes.nutritionSummary}>
			<div
				onClick={() => {
					if (meal && parent === 'dailyJournal') {
						setPage('jrlEntry');
						// setMeal(null)
					}else if (meal && parent === `records`){
						setPage('jrlEntry')
					} else if (food) {
						setMeal(entryMeal);
						setPage('jrlEntry');
					} else if (parent === 'records' && !food && !meal) {
						setPage('dailyRecord');
					} else {
						setCurStatus(false);
					}
					setBreakdown(false);
					setFood(null);
				}}
				className={classes[`icon-${parent}`]}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<div>
				<div className={classes[`description-${parent}`]}>
				<h3>{description}</h3>
				</div>

				{((breakdown && !food && !meal && curTotalCal > 0) ||(breakdown && !food && meal && curTotalCal > 0)) && (
					<CalorieMeter percent={percentage} />
				)}
				<div className={classes.nutritionFacts}>{facts}</div>
				{(breakdown && food && parent==='dailyJournal') && (
					<div className={classes.btn} onClick={() => deleteHandler()}>
						<RiDeleteBin2Line color='#9b9b9b' size='2rem' />
					</div>
				)}
			</div>
		</div>
	);
};

//
export default NutritionSummary;
