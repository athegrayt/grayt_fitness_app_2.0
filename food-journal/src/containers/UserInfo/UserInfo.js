import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './UserInfo.module.css';
import axios from '../../axios-journalEntries';
import Input from '../../components/UI/Forms/Input/Input'

class UserInfo extends Component {
	state = {
		userInfo: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			// street: {
			// 	elementType: 'input',
			// 	elementConfig: {
			// 		type: 'text',
			// 		placeholder: 'Street',
			// 	},
			// 	value: '',
			// 	validation: {
			// 		required: true,
			// 	},
			// 	valid: false,
			// 	touched: false,
			// },
			// zipCode: {
			// 	elementType: 'input',
			// 	elementConfig: {
			// 		type: 'text',
			// 		placeholder: 'Zip Code',
			// 	},
			// 	value: '',
			// 	validation: {
			// 		required: true,
			// 		minLength: 5,
			// 		maxLength: 5,
			// 	},
			// 	valid: false,
			// 	touched: false,
			// },
			// country: {
			// 	elementType: 'input',
			// 	elementConfig: {
			// 		type: 'text',
			// 		placeholder: 'Country',
			// 	},
			// 	value: '',
			// 	validation: {
			// 		required: true,
			// 	},
			// 	valid: false,
			// 	touched: false,
			// },
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your E-mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			appUseReason: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'lose', displayValue: 'Lose Weight' },
						{ value: 'maintain', displayValue: 'Maintain Weight' },
						{ value: 'gain', displayValue: 'Gain Weight' },
					],
				},
				value: 'lose',
				prompt: 'What is your main reason for wanting to track your calories',
				validation: {},
				valid: true,
			},
			caloriesKnown: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'yes', displayValue: 'Yes' },
						{ value: 'no', displayValue: 'No' },
					],
				},
				value: 'Yes',
				prompt: 'Do you already have an idea of your daily calorie amount?',
				validation: {},
				valid: true,
			},
		},
		formIsValid: false,
		loading: false,
	};

	infoHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.userInfo) {
			formData[formElementIdentifier] = this.state.userInfo[
				formElementIdentifier
			].value;
		}
		axios
			.post('/dataInfo.json', formData)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/food-journal');
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
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
		//Created Validation Rules
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid;
		}
		return isValid;
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
					))
				}
				<Button
					btnType="Success"
					disabled={!this.state.formIsValid}
					clicked={this.infoHandler}>
					SAVE
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.UserInfo}>
				<h4>Enter your Account Information</h4>
				{form}
			</div>
		);
	}
}

export default UserInfo;