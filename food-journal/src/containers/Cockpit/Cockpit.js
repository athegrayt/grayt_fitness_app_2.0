import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './Cockpit.module.css' 

    
class Cockpit extends Component {
	state = {
		date: null,
	};

	componentDidMount() {
		const d = new Date();
		const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		console.log(d);
		this.setState({ date: date });
	}

	render() {
		let calorieTotal = 0;

		if (this.props.jrlEntry.length !== 0) {
			calorieTotal = this.props.jrlEntry
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
				<h3>Calories: {calorieTotal}/{this.props.goal}</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return{
		jrlEntry: state.journalEntries,
		goal: state.calGoal
	}
}

export default connect(mapStateToProps)(Cockpit)