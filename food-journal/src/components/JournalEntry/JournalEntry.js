import React from 'react'
import classes from './JournalEntry.module.css'
import PropTypes from 'prop-types'
        
const JournalEntry = (props) =>{
	
			const { serving_qty, food_name, serving_unit} = props.entry;
			let { consumed_at, nf_calories } = props.entry;
			if (serving_qty !== 1) {
				nf_calories = nf_calories / serving_qty;
			}
			consumed_at = consumed_at.slice(11, 19);
			nf_calories = (nf_calories * serving_qty).toFixed(0);

			let description = `${serving_qty} ${serving_unit} of ${food_name}`;
			if (food_name === serving_unit) {
				description = `${serving_qty} ${food_name}`;
			};
			
	return (
			<div id={props.id} className={classes.JournalEntry} onClick={props.deleteRequestHandler}>
				<p>{consumed_at}</p>
				<p>{description}</p>
				<p>cal: {nf_calories}</p>
			</div>
		);
    
}
JournalEntry.propTypes={
	deleteRequest: PropTypes.bool,
	deleteRequestHandler: PropTypes.func,
	deleteHandler: PropTypes.func,
	time: PropTypes.string,
	description: PropTypes.string, 
	calories: PropTypes.number,
	id: PropTypes.number
}

export default JournalEntry;