import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'
import Cockpit from '../../components/Cockpit/Cockpit';
import FoodSearch from '../../components/FoodSearch/FoodSearch';
import Modal from '../../components/UI/Modal/Modal'
import JournalEntries from '../../components/JournalEntries/JournalEntries';
import axios from '../../axios-journalEntries'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class FoodJournal extends Component {
	state = {
		cockpit: {
			date: null,
		},
		// foodSearch: {
		// 	consumed_at: '2020-10-21T18:36:03+00:00',
		// 	deleteRequest: false,
		// 	foodSelected: true,
		// 	food_name: 'beef',
		// 	nf_calories: 247.35,
		// 	nf_cholesterol: 73.95,
		// 	nf_dietary_fiber: 0,
		// 	nf_p: 176.8,
		// 	nf_potassium: 271.15,
		// 	nf_protein: 22.46,
		// 	nf_saturated_fat: 6.6,
		// 	nf_sodium: 53.55,
		// 	nf_sugars: 0,
		// 	nf_total_carbohydrate: 0,
		// 	nf_total_fat: 16.75,
		// 	serving_qty: 3,
		// 	serving_unit: 'oz',
		// 	serving_weight_grams: 85,
		// },
		// journalEntries: null,
	};

	componentDidMount() {
		const d = new Date();
		const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		console.log(d);
		this.setState({ cockpit: { date: date } });

		// axios
		// 	.get('/journalEntries/-MJiNVfRlzMYzhlUWgDe.json')
		// 	.then((response) => {
		// 		this.setState({ journalEntries: response.data });
		// 	})
		// 	.catch((error) => console.log(error));
	}

	// foodSearchHandler = () => {
	// 	let updatedFoodSearch = { ...this.state.foodSearch };
	// 	const food = this.state.foodSearch.food;
	// 	if (food === null) {
	// 		this.setState({ foodSearch: { invalid: true } });
	// 		// alert('Please enter the type of food');
	// 		return;
	// 	} else {
	// 		const endpointSelect = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
	// 		fetch(endpointSelect, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'x-app-id': '5876afdb',
	// 				'x-app-key': process.env.REACT_APP_API_KEY2,
	// 			},
	// 			body: JSON.stringify({
	// 				query: `${food.toLowerCase()}`,
	// 				timezone: 'US/Eastern',
	// 			}),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				console.log(data);
	// 				const nf = Object.keys(data.foods[0])
	// 					.filter((key) => {
	// 						return (
	// 							key.match(/nf_*/) ||
	// 							key.match(/serving*/) ||
	// 							key.match(/consumed*/) ||
	// 							key.match(/food*/)
	// 						);
	// 					})
	// 					.reduce(
	// 						(nfObject, curKey) => ({
	// 							...nfObject,
	// 							[curKey]: data.foods[0][curKey],
	// 						}),
	// 						{}
	// 					);
	// 				nf.deleteRequest = false;
	// 				nf.foodSelected = true;
	// 				updatedFoodSearch = nf;
	// 				console.log(updatedFoodSearch);
	// 				this.setState({
	// 					foodSearch: updatedFoodSearch,
	// 				});
	// 			})
	// 			.catch((error) => console.log(error));
	// 	}
	// };
	foodSearchReTryHandler = () => {
		this.setState({ foodSearch: { invalid: false } });
	};
	inputChangeHandler = (event) => {
		const food = event.target.value;
		const updatedFoodSearch = {
			...this.state.foodSearch,
		};
		updatedFoodSearch.food = food;
		this.setState({ foodSearch: updatedFoodSearch });
	};
	amountChangeHandler = (event) => {
		const updatedFoodSearch = {
			...this.state.foodSearch,
		};
		updatedFoodSearch.serving_qty = event.target.value;
		this.setState({ foodSearch: updatedFoodSearch });
	};
	unitChangeHandler = (event) => {
		const updatedFoodSearch = {
			...this.state.foodSearch,
		};
		updatedFoodSearch.serving_unit = event.target.value;
		this.setState({ foodSearch: updatedFoodSearch });
	};

	// addEntryHandler = async () => {
	// 	const updatedJournalEntry = this.state.foodSearch;
	// 	await this.setState({
	// 		foodSearch: { foodSelected: false },
	// 		journalEntries: [...this.state.journalEntries, updatedJournalEntry],
	// 	});
	// 	await this.firebaseHandler();
	// };

	firebaseHandler = () => {
		const journalEntries = this.state.journalEntries;
		axios
			.put('/journalEntries/-MJiNVfRlzMYzhlUWgDe.json', journalEntries)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
		if (this.props.jrnlEnt) {
			journalEntries = (
				<JournalEntries
					journalEntries={this.props.jrnlEnt}
					deleteHandler={this.deleteHandler.bind(this)}
					deleteRequestHandler={this.deleteRequestHandler}
				/>
			);
		}
		return (
			<Fragment>
				<Modal
					show={this.props.fdSrch.invalid}
					modalClosed={this.foodSearchReTryHandler}>
					<p>Please enter the type of food</p>
				</Modal>
				<Cockpit
					date={this.state.cockpit.date}
					journalEntries={this.props.jrnlEnt}
				/>
				<FoodSearch
					foodSelected={this.props.fdSrch.foodSelected}
					food={this.props.fdSrch.food_name}
					amount={this.props.fdSrch.serving_qty}
					unit={this.props.fdSrch.serving_unit}
					changed={this.inputChangeHandler}
					amountChanged={this.amountChangeHandler}
					unitChanged={this.unitChangeHandler}
					clicked={this.props.onFoodSearch}
					addEntry={this.props.onAddEntry}
				/>
				{journalEntries}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		jrnlEnt: state.journalEntries,
		fdSrch: state.foodSearch,
	};
}

const mapDispatchToProps = dispatch => {
	return{
		onFoodSearch: ()=> dispatch({actionTypes: actionTypes.FOOD_SEARCH}),
		onAddEntry: ()=> dispatch({actionTypes: actionTypes.ADD_ENTRY})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FoodJournal, axios));
