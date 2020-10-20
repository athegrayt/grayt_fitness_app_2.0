import React from 'react'
import classes from './Cockpit.module.css'
    
const Cockpit = (props) => {
    return (
			<div className={classes.Cockpit}>
				{/* <h1>Food Journal:{' '}</h1> */}
				<h1> {props.date}</h1>
			</div>
		);
}

export default Cockpit