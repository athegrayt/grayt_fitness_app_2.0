// const { Component } = require("react");
import React, { Component } from 'react';
import axios from '../../axios-journalEntries';
import NutritionFact from '../../components/NutritionFact/NutritionFact';
import classes from './NutritionFacts.module.css'

class NutritionFacts extends Component {
	state = {
		journalEntries: [],
	};

	// componentDidMount() {
	// 	axios
	// 		.get('/journalEntries/-MJiNVfRlzMYzhlUWgDe.json')
	// 		.then((response) => {
    //             console.log(response.data);
	// 			const nutritionFacts = response.data
	// 				.map((entry) => {
	// 					return Object.keys(entry)
	// 						.filter((entry) => {
	// 							return entry.match(/nf_*/);
	// 						})
	// 						.reduce((o, k, i) => ({ ...o, [k]: +entry[k] }), {});
	// 				})
					
	// 			console.log(nutritionFacts);
	// 			this.setState({ journalEntries: nutritionFacts });
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	render() {
		let nutritionFactsSum = null;
		let nutritionPrintOut = null;
		if (this.state.journalEntries.length > 0) {
			nutritionFactsSum = this.state.journalEntries.reduce((total, cur, i) => {
				return Object.keys(total).reduce(
					(o, k, i) => ({ ...o, [k]: total[k] + cur[k] }),
					{}
				);
			});
			nutritionPrintOut = Object.entries(nutritionFactsSum).map((data) => {
                let title =data[0]
                if(data[0].includes("_")){
                   title=data[0].replace(/nf_|_/g, ' ') 
                }
                let amount=(data[1]).toFixed(0)
                return (
                    <NutritionFact name={title} data={amount}/>
					// <div>
					// 	<h1>{data[0]}</h1>
					// 	<p>{data[1]}</p>
					// </div>
				);
			});
		}
		return(
            <div className={classes.NutritionFacts}>
                <h1>Current Nutrition</h1>
                {nutritionPrintOut}
            </div>
        ) ;
	}
}

export default NutritionFacts;
