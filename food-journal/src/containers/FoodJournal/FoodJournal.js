import React, { Component, Fragment } from 'react';
import Cockpit from '../../components/Cockpit/Cockpit';
import FoodSearch from '../../components/FoodSearch/FoodSearch';
import Modal from '../../components/UI/Modal/Modal'
import JournalEntries from '../../components/JournalEntries/JournalEntries';
import axios from '../../axios-journalEntries'
import Spinner from '../../components/UI/Spinner/Spinner'

class FoodJournal extends Component {
	state = {
		cockpit: {
			date: null,
		},
		foodSearch: {},
		journalEntries: [],
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

	foodSearchHandler = () => {
		let updatedFoodSearch = { ...this.state.foodSearch };
		const food = this.state.foodSearch.food;
		if (food === null) {
			this.setState({foodSearch:{invalid: true}})
			// alert('Please enter the type of food');
			return;
		} else {
			const endpointSelect = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
			fetch(endpointSelect, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-app-id': '5876afdb',
					'x-app-key': process.env.REACT_APP_API_KEY2,
				},
				body: JSON.stringify({
					query: `${food.toLowerCase()}`,
					timezone: 'US/Eastern',
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					const nf = Object.keys(data.foods[0])
						.filter((key) => {
							return (
								key.match(/nf_*/) ||
								key.match(/serving*/) ||
								key.match(/consumed*/) ||
								key.match(/food*/)
							);
						})
						.reduce(
							(nfObject, curKey) => ({
								...nfObject,
								[curKey]: data.foods[0][curKey],
							}),
							{}
						);
					nf.deleteRequest = false;		
					nf.foodSelected = true;
					updatedFoodSearch = nf;
					this.setState({
						foodSearch: updatedFoodSearch,
					});
				})
				.catch((error) => console.log(error));
		}
	};
	foodSearchReTryHandler = () => {
		this.setState({ foodSearch: { invalid: false } });
	}
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

	addEntryHandler = async () => {
		const updatedJournalEntry = this.state.foodSearch;
		await this.setState({
			foodSearch: { foodSelected: false },
			journalEntries: [...this.state.journalEntries, updatedJournalEntry],
		});
		await this.firebaseHandler()
	};

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
				<Modal
					show={this.state.foodSearch.invalid}
					modalClosed={this.foodSearchReTryHandler}>
					<p>Please enter the type of food</p>
				</Modal>
				<Cockpit date={this.state.cockpit.date} />
				<FoodSearch
					foodSelected={this.state.foodSearch.foodSelected}
					food={this.state.foodSearch.food_name}
					amount={this.state.foodSearch.serving_qty}
					unit={this.state.foodSearch.serving_unit}
					changed={this.inputChangeHandler}
					amountChanged={this.amountChangeHandler}
					unitChanged={this.unitChangeHandler}
					clicked={this.foodSearchHandler}
					addEntry={this.addEntryHandler}
				/>
				{journalEntries}
			</Fragment>
		);
	}
}

export default FoodJournal;
