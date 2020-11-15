import React from 'react'
import Button from '../UI/Button/Button'
import NutritionFact from '../NutritionFact/NutritionFact'
import classes from './NutritionSummary.module.css'
    
const NutritionSummary = (props) => {
    const {serving_qty, serving_unit, food_name} = props.entry
    const facts = [];
	for (let name in props.entry) {
		if (name.match(/nf_*/g)) {
			const title = name.replace(/nf_|_/g, ' ');
			facts.push(
				<NutritionFact
					key={props.entry.consumed_at}
					name={title}
					data={props.entry[name]}
				/>
			);
		}
	}
	let description = `${serving_qty} ${serving_unit} of ${food_name}`;
	if (food_name === serving_unit) {
		description = `${serving_qty} ${food_name}`;
	}
	return (
		<div
			style={{
				textAlign: 'center',
			}}>
			<h1>{description}</h1>
			<div className={classes.NutritionSummary}>{facts}</div>
			<Button btnType="Danger" clicked={props.clicked}>
				DELETE
			</Button>
		</div>
	);
};;
export default NutritionSummary;