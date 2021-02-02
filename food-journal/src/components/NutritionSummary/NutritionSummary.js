import React from "react";
import {connect} from 'react-redux'
import { FaAngleLeft } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import NutritionFact from "../NutritionFact/NutritionFact";
import * as actions from '../../store/actions/journalEntries'
import classes from "./NutritionSummary.module.css";


const NutritionSummary = (props) => {
  const deleteHandler = () => {
    props.dbUpdate(props.token, props.entry.dbKey, props.userId, props.meal)
    props.previousPage('jrlEntry');
  }

  let { serving_qty, serving_unit, food_name} = props.entry;
  let facts = [];
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
      if (title==='carbohydrate'){
        title = 'carbs'
      }
				if (props.entry[name] === 'nf_serving_qty') {
					value = props.entry[name];
				}
			facts.push({ title, value });
		}
  }
  facts = facts.map((entry,i) => {
    return(<NutritionFact
				  key={i}
				  name={entry.title}
				  data={entry.value}
				/>)
  })
  let description = `${serving_qty} ${serving_unit} of ${food_name}`;
  if (food_name === serving_unit) {
    description = `${serving_qty} ${food_name}`;
  }
  console.log({food_name , serving_unit});
  return (
		<div className={classes.nutritionSummary}>
			<div
				onClick={() => props.previousPage('jrlEntry')}
				className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<h3>{description}</h3>
			<div className={classes.nutritionFacts}>{facts}</div>
			<div className={classes.btn} onClick={()=>deleteHandler()}>
				<RiDeleteBin2Line color='#9b9b9b' size='2rem' />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
  return {
		meal: state.journalEntries.meal,
		entry: state.journalEntries.curEntry,
		token: state.auth.token,
		userId: state.auth.userId,
	};
}

export default connect(mapStateToProps, actions)(NutritionSummary);
