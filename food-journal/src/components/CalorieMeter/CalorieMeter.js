import React from 'react'
import * as classes from './CalorieMeter.module.css'
    
const CalorieMeter = ({percent}) =>{
   let meterColor = '#CB5B6F';
		if (percent > 25 && percent <= 75) {
			meterColor = '#F2E467';
		} else if (percent > 75 && percent <= 100) {
			meterColor = '#5BCBAC';
		}
	return (
			<div className={classes.calorieMeter}>
				<div className={classes.base}></div>
				<p
					style={{
						left: `${percent <= 97 ? percent : '94'}%`,
						// top: `${
						// 	percent > 18 && percent < 80 ? `-7vh` : `-75%`
						// }`,
					}}>
					{percent}
				</p>
				<div
					className={classes.meter}
					style={{
						width: `${percent <= 100 ? percent : '100'}%`,
						backgroundColor: `${meterColor}`,
					}}></div>
			</div>
		);
    
};
export default CalorieMeter;