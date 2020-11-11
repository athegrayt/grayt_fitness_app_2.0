import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as foodSearchActions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Forms/Input/Input'
import axios from '../../axios-journalEntries';
import classes from './FoodSearch.module.css'
import PropTypes from 'prop-types'

class foodSearch extends Component {
	state = {
		foodSearch: {},
		orderForm: {
			food_name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Ex. Chicken',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			serving_qty: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: '1',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			serving_unit: {
				elementType: 'select',
				elementConfig: {
					options: [{ value: '', displayValue: '' }],
				},
				value: 'fastest',
				validation: {},
				valid: true,
			},
		},
		formIsValid: false,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	checkValidity(value, rules) {
		let isValid = true;
		//Created Validation Rules
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		return isValid;
	}

	foodSearchHandler = () => {
		const food = this.state.orderForm.food_name.value;
		if (food === null) {
			this.setState({ foodSearch: { invalid: true } });
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
					const updatedOrderForm = {
						...this.state.orderForm
					}
					updatedOrderForm.serving_qty.value = nf.serving_qty
					updatedOrderForm.serving_unit.value = nf.serving_unit
					updatedOrderForm.serving_unit.elementConfig.options[0].value = nf.serving_unit
					updatedOrderForm.serving_unit.elementConfig.options[0].displayValue = nf.serving_unit
					console.log(updatedOrderForm);
					this.setState({
						foodSearch: nf,
						orderForm: updatedOrderForm
					})
				}).catch((error) => console.log(error));
		}
	};	

	addEntryHandler = async () => {
		const updatedJournalEntry = this.state.foodSearch;
		await this.setState({
			foodSearch: { foodSelected: false },
			journalEntries: [...this.state.journalEntries, updatedJournalEntry],
		});
		await this.firebaseHandler();
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

	resetHandler= () => {
		const reset = {}
		const resetOrderForm = this.state.orderForm
		resetOrderForm.food_name.value = ''
		this.setState({
			foodSearch: reset,
			orderForm:resetOrderForm 
		})
	}

	render() {
		let foodSearch = null;
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		const foodSearchInputs = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) =>
					this.inputChangedHandler(event, formElement.id)
				}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				valueType={formElement.id}
			/>
		))
		const foodSelect = foodSearchInputs.slice(0, 1)
		this.state.foodSearch.foodSelected
			? (foodSearch = (
					<div className={classes.FoodSearch}>
						{foodSearchInputs}
						<Button btnType="Success" clicked={()=>{this.props.onaddEntry(this.state.foodSearch); this.resetHandler();}}>
							ADD ENTRY
						</Button>
					</div>
			  ))
			: (foodSearch = (
					<div className={classes.FoodSearch}>
						{foodSelect}
						<Button
							btnType="Success"
							clicked={this.foodSearchHandler}
							disabled={!this.state.formIsValid}>
							Next
						</Button>
					</div>
			  ));

		return foodSearch;
	}
};

foodSearch.propTypes = {
    foodSelected: PropTypes.bool,
    value: PropTypes.string,
	amount: PropTypes.number,
	unit: PropTypes.string,
	changed: PropTypes.func,
	clicked: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
	return{
		onaddEntry: (entry) => dispatch(foodSearchActions.addEntry(entry))
	}
}

export default connect(null, mapDispatchToProps)(foodSearch);