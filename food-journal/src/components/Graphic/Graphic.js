import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import * as classes from './Graphic.module.css'

const Graphic = (props) =>{
   const { protein, carbs, fat, calories} = props.nutritionTotal
   const calorieBreakDown={
       protein: Math.floor(((protein*4)/calories)*100), 
       carbs: Math.floor(((carbs*4)/calories)*100), 
       fat: Math.floor(((fat*9)/calories)*100),
    }
    let center = !props.breakdown && `${props.perOfGoal}%`
   let doughnutColor = '#CB5B6F';
		if (props.perOfGoal > 25 && props.perOfGoal <= 75) {
			doughnutColor = '#F2E467';
		} else if (props.perOfGoal > 75 && props.perOfGoal <= 100) {
			doughnutColor = '#5BCBAC';
		}

		let state = props.breakdown
			? {
					labels: ['% of Protein', '% of Carbs', '% of Fat'],
					datasets: [
						{
							label: `Caloric Breakdown`,
							backgroundColor: ['#CB5B6F', ' #F2E467', '#5BCBAC'],
							hoverBackgroundColor: ['#CB5B6F', '#F2E467', '#5BCBAC'],
							data: [
								calorieBreakDown.protein,
								calorieBreakDown.carbs,
								calorieBreakDown.fat,
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
							data: [props.perOfGoal, (100 - props.perOfGoal)>0 ? 100 - props.perOfGoal: 0],
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