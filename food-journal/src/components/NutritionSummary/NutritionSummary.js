import React from "react";
import {connect} from 'react-redux'
import { FaAngleLeft } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Button from '../UI/Button/Button'
import CalorieMeter from '../CalorieMeter/CalorieMeter'
import NutritionFact from "../NutritionFact/NutritionFact";
import * as actions from '../../store/actions'
import classes from "./NutritionSummary.module.css";


const NutritionSummary = (props) => {
	const { nutritionBreakdown, calGoal, entry, token, userId, meal } = props;
	let { serving_qty, serving_unit, food_name} = entry;
	const deleteHandler = () => {
		console.log(entry);
		props.deleteEntry(
			token,
			entry.docID,
			userId,
			meal,
			new Date(entry.consumed_at.seconds*1000).toISOString().slice(0, 10)
		);
		props.updateMealEntries(meal, token, userId);
	props.previousPage('jrlEntry');
	props.setBreakdown(null,false)
  }

  let facts = [];
  let empty = false
  if (nutritionBreakdown === null ) {
	if(entry.nf_calories>0){
		for (let name in entry) {
				if (
					name.match(/nf_total_carbohydrate/) ||
					name.match(/nf_total_calories/) ||
					name.match(/nf_total_fat/) ||
					name.match(/nf_protein/)
				) {
					let title = name.includes('total')
						? name.replace(/nf_total|_/g, '')
						: name.replace(/nf_|_/g, '');
					let value = Math.round(entry[name] * serving_qty);
					if (title === 'carbohydrate') {
						title = 'carbs';
					}
					if (entry[name] === 'nf_serving_qty') {
						value = entry[name];
					}
					facts.push({ title, value });
				}
			}
		}else{
			empty = (
				<div className={classes.empty}>
					<p style={{marginTop: '0'}}>Steps to get started:</p>
					<p>1. Close this tab</p>
					<p>
						2. Click on one of the{' '}
							<Button
								style={{ width: '100px' }}
								type='button'
								btnType='Success'>
								Meal
							</Button>
						{' '}
						to start tracking your diet!
					</p>
				</div>
			);
		}	
	} else {
		for (let name in nutritionBreakdown) {
			if(name !== 'calories'){
				let value = nutritionBreakdown[name];
				let title = name;
				facts.push({ title, value });
			}
		}
	}
  facts = facts.map((entry,i) => {
    return(<NutritionFact
				  key={i}
				  name={entry.title}
				  data={entry.value}
				/>)
  })
  let description =
		props.breakdown && nutritionBreakdown
			? `${props.meal ? `${props.meal} % of current calories:` : "Current % of caloric goal:"}`
			: `${serving_qty} ${serving_unit} of ${food_name}`;
  if (food_name === serving_unit && !props.breakdown) {
		description = `${serving_qty} ${food_name}`;
	}
  let calDenominator = props.meal ? props.totalCal : calGoal;
	let content = empty ? (
		empty
	) : (
		<div>
			<h3>{description}</h3>

			{(props.breakdown && nutritionBreakdown) && (
				<CalorieMeter
					percent={Math.round(100 * (nutritionBreakdown.calories / calDenominator))}
				/>
			)}
			<div className={classes.nutritionFacts}>{facts}</div>
			{props.breakdown && nutritionBreakdown ? null : (
				<div className={classes.btn} onClick={() => deleteHandler()}>
					<RiDeleteBin2Line color='#9b9b9b' size='2rem' />
				</div>
			)}
		</div>
	);

  return (
		<div className={classes.nutritionSummary}>
			<div
				onClick={() => {
					if(props.meal){
						props.previousPage('jrlEntry')
					}else{
						props.setTabStatus(false);
					}
					props.setBreakdown(null, false)
				}}
				className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			{content}
		</div>
	);
};

const mapStateToProps = state => {
  return {
		totalCal: state.journalEntries.totalCal,
		calGoal: state.journalEntries.calGoal,
		breakdown: state.journalEntries.breakdown,
		nutritionBreakdown: state.journalEntries.nutritionBreakDown,
		meal: state.tabBar.meal,
		entry: state.journalEntries.curEntry,
		token: state.auth.token,
		userId: state.auth.userId,
	};
}

export default connect(mapStateToProps, actions)(NutritionSummary);
