import React, { Component, Fragment } from 'react';
import Cockpit from '../../components/Cockpit/Cockpit';
import FoodSearch from '../FoodSearch/FoodSearch';
import JournalEntries from '../../components/JournalEntries/JournalEntries';
import axios from '../../axios-journalEntries'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class FoodJournal extends Component {
	state = {
		cockpit: {
			date: null,
		},
		journalEntries: null,
	};

	componentDidMount() {
		
		const d = new Date();
		const date = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
		console.log(d)
		this.setState({cockpit: {date: date}})
		
		axios
			.get(
				'/journalEntries/-MJiNVfRlzMYzhlUWgDe.json'
			)
			.then((response) => {
				this.setState({ journalEntries: response.data });
			})
			.catch((error) => console.log(error));
	}

	// inputChangeHandler = (event) => {
	// 	console.log(event);
	// 	const food = event.target.value;
	// 	const updatedFoodSearch = {
	// 		...this.state.foodSearch,
	// 	};
	// 	updatedFoodSearch.food = food;
	// 	this.setState({ foodSearch: updatedFoodSearch });
	// };
	// amountChangeHandler = (event) => {
	// 	const updatedFoodSearch = {
	// 		...this.state.foodSearch,
	// 	};
	// 	updatedFoodSearch.serving_qty = event.target.value;
	// 	this.setState({ foodSearch: updatedFoodSearch });
	// };
	// unitChangeHandler = (event) => {
	// 	const updatedFoodSearch = {
	// 		...this.state.foodSearch,
	// 	};
	// 	updatedFoodSearch.serving_unit = event.target.value;
	// 	this.setState({ foodSearch: updatedFoodSearch });
	// };

	

	deleteHandler = async (entryID) => {
		const updatedJournalEntry = this.state.journalEntries;
		updatedJournalEntry.splice(entryID, 1);
		await this.setState({
			journalEntries: updatedJournalEntry,
		});
		await this.firebaseHandler();
	};

	deleteRequestHandler = (entryID) => {
		console.log(entryID);
		const updatedJournalEntry = this.state.journalEntries;
		console.log(updatedJournalEntry);
		if (updatedJournalEntry[entryID]) {
			updatedJournalEntry[entryID].deleteRequest = !this.state.journalEntries[
				entryID
			].deleteRequest;
		}
		this.setState({
			journalEntries: updatedJournalEntry,
		});
	};

	render() {
		let journalEntries = <Spinner />;
		if (this.state.journalEntries) {
			journalEntries = (
				<JournalEntries
					journalEntries={this.state.journalEntries}
					deleteHandler={this.deleteHandler.bind(this)}
					deleteRequestHandler={this.deleteRequestHandler}
				/>
			);
		}
		return (
			<Fragment>
				<Cockpit date={this.state.cockpit.date}
				journalEntries={this.state.journalEntries} />
				<FoodSearch/>
				{journalEntries}
			</Fragment>
		);
	}
}

export default withErrorHandler(FoodJournal, axios);
