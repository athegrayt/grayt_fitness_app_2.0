import React from "react";
import {connect} from 'react-redux'
import { FaAngleLeft } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Button from '../UI/Button/Button'
import NutritionFact from "../NutritionFact/NutritionFact";
import * as actions from '../../store/actions'
import classes from "./NutritionSummary.module.css";


const NutritionSummary = (props) => {
  const deleteHandler = () => {
    props.dbUpdate(props.token, props.entry.dbKey, props.userId, props.meal)
	props.previousPage('jrlEntry');
	props.setBreakdown(null,false)
  }

  let { serving_qty, serving_unit, food_name} = props.entry;
  let facts = [];
  let empty = false
  if (props.nutritionBreakdown === null ) {
	if(props.entry.nf_calories>0){
		for (let name in props.entry) {
				if (
					name.match(/nf_total_carbohydrate/) ||
					name.match(/nf_total_fat/) ||
					name.match(/nf_protein/)
				) {
					let title = name.includes('total')
						? name.replace(/nf_total|_/g, '')
						: name.replace(/nf_|_/g, '');
					let value = Math.round(props.entry[name] * serving_qty);
					if (title === 'carbohydrate') {
						title = 'carbs';
					}
					if (props.entry[name] === 'nf_serving_qty') {
						value = props.entry[name];
					}
					facts.push({ title, value });
				}
			}
		}else{
			empty = (
				<div className={classes.empty}>
					<p>Steps to get started:</p>
					<p>1. Close this tab</p>
					<p>
						2. Click on one of the{' '}
							<Button
								style={{ width: '100px' }}
								type='button'
								btnType='Success'>
								Meal Name
							</Button>
						{' '}
						to start tracking your diet!
					</p>
				</div>
			);
		}	
	} else {
		for (let name in props.nutritionBreakdown) {
			if(name !== 'calories'){
				let value = props.nutritionBreakdown[name];
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
		props.breakdown && props.nutritionBreakdown
			? `${props.meal ? props.meal.toUpperCase() : "CURRENT"}`
			: `${serving_qty} ${serving_unit} of ${food_name}`;
  if (food_name === serving_unit && !props.breakdown) {
		description = `${serving_qty} ${food_name}`;
	}
  
	let content = empty ? (
		empty
	) : (
		<div>
			<h3>{description}</h3>
			<div className={classes.nutritionFacts}>{facts}</div>
			<div className={classes.btn} onClick={() => deleteHandler()}>
				<RiDeleteBin2Line color='#9b9b9b' size='2rem' />
			</div>
		</div>
	);

  return (
		<div className={classes.nutritionSummary}>
			<div
				onClick={() => {
					props.meal
						? props.previousPage('jrlEntry')
						: props.setTabStatus(false);
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
		breakdown: state.journalEntries.breakdown,
		nutritionBreakdown: state.journalEntries.nutritionBreakDown,
		meal: state.tabBar.meal,
		entry: state.journalEntries.curEntry,
		token: state.auth.token,
		userId: state.auth.userId,
	};
}

export default connect(mapStateToProps, actions)(NutritionSummary);
