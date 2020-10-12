import React, { Component, Fragment } from 'react';
import Cockpit from '../../components/Cockpit/Cockpit';
import FoodSearch from '../../components/FoodSearch/FoodSearch';
import JournalEntries from '../../components/JournalEntries/JournalEntries';

class FoodJournal extends Component {
	state = {
		cockpit: {
			date: '',
		},
		foodSearch: {
			food: '',
			foodSelected: false,
			foodList: [],
			amount: '',
			unit: '',
			time: '',
			calories: '',
		},
		journalEntries: [
			{time: '' ,description: '',calories: ''}
		],
	};

	static getDerivedStateFromProps(props, state) {
		const d = new Date();
		const date = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
		state.cockpit.date = date;

		return state;
	}

	componentDidMount() {
		const storedJournalEntries =
			JSON.parse(localStorage.getItem('journalEntries')) || [];
		this.setState({ journalEntries: storedJournalEntries });
	}

	foodSearchHandler = () => {
		const updatedFoodSearch = { ...this.state.foodSearch };
		const food = this.state.foodSearch.food;
		if (food === undefined) {
			alert('Please enter the type of food');
		}
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
				const unit = data.foods[0].serving_unit;
				let calories = data.foods[0].nf_calories;
				const time = data.foods[0].consumed_at;
				const amount = data.foods[0].serving_qty;
				if (amount !== 1) {
					calories = calories / amount;
				}
				updatedFoodSearch.foodSelected = true;
				updatedFoodSearch.unit = unit;
				updatedFoodSearch.calories = calories.toFixed(0);
				updatedFoodSearch.time = time;
				updatedFoodSearch.amount = amount;
				console.log(updatedFoodSearch);
				this.setState({ foodSearch: updatedFoodSearch });
			});
	};
	// };
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
		updatedFoodSearch.amount = event.target.value;
		this.setState({ foodSearch: updatedFoodSearch });
	};
	unitChangeHandler = (event) => {
		const updatedFoodSearch = {
			...this.state.foodSearch,
		};
		updatedFoodSearch.unit = event.target.value;
		this.setState({ foodSearch: updatedFoodSearch });
	};

	addEntryHandler = () => {
		const updatedJournalEntry = [...this.state.journalEntries];
		const { amount, food, unit } = this.state.foodSearch;
		let { time, calories } = this.state.foodSearch;
		time = time.slice(11, 19);
		
		calories = calories * amount
		const deleteRequest = false;
		const description = `${amount} ${unit} of ${food} `;
		updatedJournalEntry.push({ time, description, calories, deleteRequest });
		this.localStorageHandler(updatedJournalEntry);
		this.setState({
			foodSearch: { foodSelected: false },
			journalEntries: updatedJournalEntry,
		});
	};


	deleteHandler = (entryID) => {
		const updatedJournalEntry = [...this.state.journalEntries];
		console.log(`Before: ${updatedJournalEntry}`)
		updatedJournalEntry.splice(entryID, 1);
		console.log(`After: ${updatedJournalEntry}`)
		console.log('delete')
		this.localStorageHandler(updatedJournalEntry);
		this.setState({
			journalEntries: updatedJournalEntry,
		});
	};
	
	localStorageHandler = (updatedJournalEntry) => {
		localStorage.setItem('journalEntries', JSON.stringify(updatedJournalEntry));
	};
	deleteRequestHandler = (entryID) => {
		const updatedJournalEntry = [...this.state.journalEntries];
		updatedJournalEntry[entryID].deleteRequest = !this.state.journalEntries[
			entryID
		].deleteRequest;
		this.setState({
			journalEntries: updatedJournalEntry,
		});
	};

	render() {
		return (
			<Fragment>
				<Cockpit date={this.state.cockpit.date} />
				<FoodSearch
					foodSelected={this.state.foodSearch.foodSelected}
					food={this.state.foodSearch.food}
					amount={this.state.foodSearch.amount}
					unit={this.state.foodSearch.unit}
					changed={this.inputChangeHandler}
					amountChanged={this.amountChangeHandler}
					unitChanged={this.unitChangeHandler}
					clicked={this.foodSearchHandler}
					addEntry={this.addEntryHandler}
				/>
				<JournalEntries
					journalEntries={this.state.journalEntries}
					deleteHandler={this.deleteHandler.bind(this)}
					deleteRequestHandler={this.deleteRequestHandler}
					// deleteRequest={this.state.deleteRequest}
				/>
			</Fragment>
		);
	}
}

export default FoodJournal;
