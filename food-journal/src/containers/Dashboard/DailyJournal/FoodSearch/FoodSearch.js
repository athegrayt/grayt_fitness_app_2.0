import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {foodField,journalFields } from './searchFields'
import FoodSearchFirstPage from '../../../../components/WizardForms/FoodSearch/FoodSearchFirstPage'
import FoodSearchSecondPage from '../../../../components/WizardForms/FoodSearch/FoodSearchSecondPage'
import Input from '../../../../components/UI/Forms/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import { required } from 'redux-form-validators'
import * as actions from '../../../../store/actions/index'
import classes from './FoodSearch.module.css'
	
class FoodSearch extends Component {
	state = {
		page: 1,
	};

	nextPage = () => {
		this.setState({ page: this.state.page + 1 });
	};
	previousPage = ()=>{
		this.setState({ page: this.state.page - 1 });
	}

	onSubmit = (values) => {
			let updatedFoodSearch = { ...this.props.nutriFacts };
			const { serving_qty } = updatedFoodSearch;
			for (let nutritionFact in updatedFoodSearch) {
				if (updatedFoodSearch[nutritionFact] === null) {
					updatedFoodSearch[nutritionFact] = 0;
				}
				if (Number.isFinite(updatedFoodSearch[nutritionFact])) {
					updatedFoodSearch[nutritionFact] = Math.round(
						updatedFoodSearch[nutritionFact] / serving_qty
					);
				}
			}
			updatedFoodSearch.serving_qty = +values.serving_qty;
			const entry = {
				journalEntry: updatedFoodSearch,
				userId: this.props.userId,
			};
			const {meal, token} = this.props;
			console.log(updatedFoodSearch);
			this.props.addEntry(meal, entry, token);
			this.props.previousPage('jrlEntry');
	};

	render() {
		const { page } = this.state;
		const {previousPage} = this.props
		return (
			<div>
				{page === 1 && (
					<FoodSearchFirstPage
						previousPage={previousPage}
						onSubmit={ (values)=>{
							this.nextPage() 
							this.props.searchFood(values['food_name'])
						}
						}
					/>
				)}
				{page === 2 && (
					<FoodSearchSecondPage
						unit={this.props.unit}
						food={this.props.food}
						qty={this.props.qty}
						previousPage={this.previousPage}
						onSubmit={this.onSubmit}
					/>
				)}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		meal: state.journalEntries.meal,
		food: state.journalEntries.foodSelected,
		qty: state.journalEntries.quantity,
		unit: state.journalEntries.unit,
		nutriFacts: state.journalEntries.nutritionFacts,
		userId: state.auth.userId,
		token: state.auth.token,
	};
}

export default connect(
	mapStateToProps,
	actions
)(
	reduxForm({
		form: 'foodSearch',
		destroyOnUnmount: false,
		required,
	})(FoodSearch)
);