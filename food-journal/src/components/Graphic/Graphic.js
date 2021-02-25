import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import * as classes from './Graphic.module.css'

const Graphic = (props) =>{
   const { protein, carbs, fat, calories} = props.nutritionTotal
   const calorieBreakDown={
	   carbs: Math.floor(((carbs*4)/calories)*100), 
	   fat: Math.floor(((fat*9)/calories)*100),
       protein: Math.floor(((protein*4)/calories)*100), 
    }
    let center = !props.breakdown && `${props.percentage}%`
   let doughnutColor = '#CB5B6F';
		if (props.percentage > 25 && props.percentage <= 75) {
			doughnutColor = '#F2E467';
		} else if (props.percentage > 75 && props.percentage <= 100) {
			doughnutColor = '#5BCBAC';
		}

		let state = props.breakdown
			? {
					labels: ['% of Fat', '% of Carbs', '% of Protein'],
					datasets: [
						{
							label: `Caloric Breakdown`,
							backgroundColor: ['#CB5B6F', '#5BCBAC',' #F2E467' ],
							hoverBackgroundColor: ['#CB5B6F','#5BCBAC', '#F2E467' ],
							data: [
								calorieBreakDown.fat,
								calorieBreakDown.carbs,
								calorieBreakDown.protein,
							],
						},
					],
			  }
			: {
					labels: ['% of Calories Consumed', '% of Calories Left'],
					datasets: [
						{
							label: 'Daily Calories',
							backgroundColor: [doughnutColor],
							hoverBackgroundColor: [doughnutColor],
							data: [
								props.percentage,
								100 - props.percentage > 0 ? 100 - props.percentage : 0,
							],
						},
					],
			  };
			
    return (
			<div className={classes.graphic}>
				<h3 className={classes.percentage}>{center}</h3>
				<Doughnut
					data={state}
					options={{
						title: {
							display:  false,
							text: props.breakdown ? `Caloric Breakdown` : `${props.meal} %`,
							fontSize: 20,
						},
						legend: {
							display: false,
							position: 'bottom',
						},
  						maintainAspectRatio: true 
					}}
				/>
			</div>
		);
    
};
export default Graphic;