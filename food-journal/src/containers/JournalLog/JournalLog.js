// const { Component } = require("react");
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as journalLogActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-journalEntries';
import LogEntry from '../../components/LogEntry/LogEntry';
import LogSummary from '../../components/LogSummary/LogSummary';
import classes from './JournalLog.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class JournalLog extends Component {
	state = {
		userInfo: {
			month: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '1', displayValue: 'January' },
						{ value: '2', displayValue: 'Feburary' },
						{ value: '3', displayValue: 'March' },
						{ value: '4', displayValue: 'April' },
						{ value: '5', displayValue: 'May' },
						{ value: '6', displayValue: 'June' },
						{ value: '7', displayValue: 'July' },
						{ value: '8', displayValue: 'August' },
						{ value: '9', displayValue: 'September' },
						{ value: '10', displayValue: 'October' },
						{ value: '11', displayValue: 'November' },
						{ value: '12', displayValue: 'December' },
					],
				},
				value: 'lose',
				prompt: 'Seletct Month',
				validation: {},
				valid: true,
			},
		},
		selectedEntries:[], 
		showEntries: false
	};
	inputChangedHandler = (event, inputIdentifier) => {
		const updatedUserInfo = {
			...this.state.userInfo,
		};
		const updatedFormElement = {
			...updatedUserInfo[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedUserInfo[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedUserInfo) {
			formIsValid = updatedUserInfo[inputIdentifier].valid && formIsValid;
		}

		this.setState({ userInfo: updatedUserInfo, formIsValid: formIsValid });
	};
	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	selectDayHandler =(consumed_at)=>{
		const selectedYear = new Date(consumed_at.slice(0, 10)).getFullYear();
			const selectedMonth = new Date(consumed_at.slice(0, 10)).getMonth()	;
			const selectedDate = new Date(consumed_at.slice(0, 10)).getDate()+1;
			const selectedEntries = this.props.jrlEntry.filter((entry) => {
				return (
					new Date(entry.consumed_at.slice(0, 10)).getFullYear() === selectedYear &&
					new Date(entry.consumed_at.slice(0, 10)).getMonth() === selectedMonth &&
					new Date(entry.consumed_at.slice(0, 10)).getDate()+1 === selectedDate
				);
			});
			console.log(selectedEntries);
			this.setState({selectedEntries: selectedEntries, showEntries: true})
	}

	closeModalHandler = ()=>{
		this.setState({ showEntries: false });
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.userInfo) {
			formElementsArray.push({
				id: key,
				config: this.state.userInfo[key],
			});
		}
		let form = (
			<form onSubmit={this.infoHandler}>
				{formElementsArray.map((formElement, i) => (
					<Fragment>
						<p key={i}>{formElement.config.prompt}</p>
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
					</Fragment>
				))}
				<Button
					btnType="Success"
					disabled={!this.state.formIsValid}
					clicked={this.selectMonthHandler}>
					SELECT
				</Button>
			</form>
		);
		let entries = <Spinner />;
		if (this.props.jrlEntry) {
			const selectedYear = new Date().getFullYear();
			const selectedMonth = +this.state.userInfo.month.value
			const jE = [...this.props.jrlEntry]
			const selectMonthEntries = jE.filter((entry) => {
				return (
					new Date(entry.consumed_at.slice(0, 10)).getFullYear() ===
						selectedYear &&
					new Date(entry.consumed_at.slice(0, 10)).getMonth()+1 === selectedMonth
				);
			})

			console.log(selectMonthEntries);
			if (selectMonthEntries){
				
				const singleDates =[]
				selectMonthEntries.forEach((entry,i)=>{
					singleDates.push(new Date(entry.consumed_at.slice(0, 10)).getDate()+1);
				})
				let uniqueEntries =[...new Set(singleDates)]
				let days=selectMonthEntries.map(entry => {
					return new Date(entry.consumed_at.slice(0, 10)).getDate()+1
				})
				const ans = uniqueEntries.map(num=>{
					let index=days.indexOf(num);
					return selectMonthEntries[index]
				})
				entries = ans.map((entry, i) => {
					return (
						<LogEntry
							key={entry.consumed_at}
							id={i}
							entry={entry}
							deleteRequestHandler={() => this.selectDayHandler(entry.consumed_at)}
						/>
					);
				});
			}else{
				entries=<p>There are no saved entries for this month</p>
			}
		}
		return (
			<div className={classes.JournalLog}>
				{form}
				<Modal
					show={this.state.showEntries}
					modalClosed={this.closeModalHandler}>
					<LogSummary
						jrlEntry={this.state.selectedEntries}
						clicked={() => {
							this.closeModalHandler();
						}}
					/>
				</Modal>
				{entries}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		jrlEntry: state.journalEntries.journalEntries,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onEntryDelete: (id) => dispatch(journalLogActions.entryDelete(id)),
		onInitEntries: (token, userId) =>
			dispatch(journalLogActions.initEntries(token, userId)),
		onfetchInfo: (token, userId) =>
			dispatch(journalLogActions.fetchInfo(token, userId)),
	};
}; 

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(JournalLog, axios));
