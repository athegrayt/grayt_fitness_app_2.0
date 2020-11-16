import React from 'react';
import classes from './LogEntry.module.css';

const LogEntry = (props) => {
	let { consumed_at, nf_calories, serving_qty } = props.entry;
	consumed_at = consumed_at.slice(0, 10);
	nf_calories = (nf_calories * serving_qty).toFixed(0);

	return (
		<div
			id={props.id}
			className={classes.LogEntry}
			onClick={props.deleteRequestHandler}>
			<p>{consumed_at}</p>
			<p>cal: {nf_calories}</p>
		</div>
	);
};

export default LogEntry;
