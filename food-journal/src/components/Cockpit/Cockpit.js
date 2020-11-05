import React, {Component} from 'react'
import classes from './Cockpit.module.css' 

    
class Cockpit extends Component {
	state = {
		date: null,
		calGoal: 2000,
		journalEntries:[
		{
			consumed_at: '2020-10-21T18:36:03+00:00',
			deleteRequest: false,
			foodSelected: true,
			food_name: 'beef',
			nf_calories: 247.35,
			nf_cholesterol: 73.95,
			nf_dietary_fiber: 0,
			nf_p: 176.8,
			nf_potassium: 271.15,
			nf_protein: 22.46,
			nf_saturated_fat: 6.6,
			nf_sodium: 53.55,
			nf_sugars: 0,
			nf_total_carbohydrate: 0,
			nf_total_fat: 16.75,
			serving_qty: 3,
			serving_unit: 'oz',
			serving_weight_grams: 85,
		},
	]
	};

	componentDidMount() {
		const d = new Date();
		const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		console.log(d);
		this.setState({ date: date });
	}

	render() {
		let calorieTotal = 0;

		if (this.state.journalEntries !== null) {
			calorieTotal = this.state.journalEntries
				.map((entry) => {
					return entry.nf_calories;
				})
				.reduce((total, cur) => {
					return total + cur;
				});
		}

		return (
			<div className={classes.Cockpit}>
				<h1> {this.state.date}</h1>
				<h3>Calories: {calorieTotal}/{this.state.calGoal}</h3>
			</div>
		);
	}
}

export default Cockpit