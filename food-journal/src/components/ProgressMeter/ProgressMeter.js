import React from 'react'
import * as classes from './ProgressMeter.module.css'
    
const ProgressMeter = ({percent}) =>{
	let meterColor = '#5BCBAC';
	return (
			<div className={classes.progressMeter}>
				<div className={classes.base}></div>
				<div
					className={classes.meter}
					style={{
						width: `${percent <= 100 ? percent : '100'}%`,
						backgroundColor: `${meterColor}`,
					}}></div>
			</div>
		);
    
};
export default ProgressMeter;