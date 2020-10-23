import React from 'react'
import JournalEntry from './JournalEntry/JournalEntry'
import classes from './JournalEntries.module.css'
	
	
const JournalEntries =(props)=> {
		const journalEntryList = props.journalEntries;
		console.log(journalEntryList);
		const entries = journalEntryList.map((entry, i) => {
		
		const { serving_qty, food_name, serving_unit, deleteRequest } = entry;
		let { consumed_at, nf_calories } = entry;
		if (serving_qty !== 1) {
			nf_calories = nf_calories / serving_qty;
		}
		consumed_at = consumed_at.slice(11, 19);
		nf_calories = (nf_calories * serving_qty).toFixed(0);
		
		let description = `${serving_qty} ${serving_unit} of ${food_name}`;
		if (food_name === serving_unit) {
			description = `${serving_qty} ${food_name}`;
		}
			return (
				<JournalEntry
					key={consumed_at}
					id={i}
					time={consumed_at}
					description={description}
					calories={nf_calories}
					deleteHandler={() => props.deleteHandler(i)}
					deleteRequestHandler={() => props.deleteRequestHandler(i)}
					deleteRequest={deleteRequest}
				/>
			);
		});
		return <div className={classes.JournalEntries}>{entries}</div>;
};
export default JournalEntries;