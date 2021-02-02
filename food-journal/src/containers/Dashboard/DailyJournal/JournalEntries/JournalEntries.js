import React, { Component} from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';
import Button from '../../../../components/UI/Button/Button';
import JournalEntry from '../../../../components/JournalEntry/JournalEntry'
import { FaAngleLeft } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';
import classes from './JournalEntries.module.css';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../../axios-journalEntries';

class JournalEntries extends Component {
	state = {
		entryID: null,
	};

	componentDidMount() {
		// this.props.onInitEntries(this.props.token, this.props.userId);
		this.props.fetchInfo(this.props.token, this.props.userId);
	}

	deleteRequestHandler = (entryID) => {
		const todayYear = new Date().getFullYear();
		const todayMonth = new Date().getMonth();
		const todayDate = new Date().getDate();
		const curDayEntries = this.props.jrlEntry.filter((entry) => {
			return (
				new Date(entry.consumed_at.slice(0, 10)).getFullYear() === todayYear &&
				new Date(entry.consumed_at.slice(0, 10)).getMonth() === todayMonth &&
				new Date(entry.consumed_at.slice(0, 10)).getDate() + 1 === todayDate
			);
		});
		let newEntry = curDayEntries[entryID];
		entryID = newEntry.consumed_at;
		this.setState({ entry: newEntry, entryID: entryID, showNutrition: true });
	};

	closeModalHandler = () => {
		this.setState({ showNutrition: false });
	};

	render() {
		let entries = <Spinner />;
		if (this.props[`${this.props.meal}`]) {
			const todayDate = new Date().toUTCString().slice(0, 15);
			const curDayEntries = this.props[`${this.props.meal}`].filter((entry) => {
				const date = new Date(entry.consumed_at.slice(0, 10))
					.toUTCString()
					.slice(0, 15);
				return date === todayDate;
			});
			if (curDayEntries.length) {
				entries = curDayEntries.map((entry, i) => {
					return (
						<Button
							style={{ margin: '1vh 0' }}
							type='button'
							btnType='Success'
							key={entry.consumed_at}
							id={i}
							clicked={() => {
								this.props.setPage('nutriFacts')
								this.props.setEntries(entry,'entry')
							}}
							deleteRequestHandler={() => this.deleteRequestHandler(i)}>
							<JournalEntry entry={entry} />
						</Button>
					);
				});
			} else {
				entries = (
					<div>
						<p>There's nothing like a fresh start!</p>
						<p>
							Make your first journal entry above to start tracking your diet!
						</p>
					</div>
				);
			}
		}
		return (
			<div className={classes.JournalEntries}>
				<div
					onClick={() => this.props.closeTab()}
					className={classes.icon}>
					<FaAngleLeft color='#9b9b9b' size='2rem' />
				</div>
				<div
					className={classes.add}
					onClick={() => this.props.setPage('foodSearch')}>
					<RiAddCircleLine color='#9b9b9b' size='2rem' />
				</div>
				<div className={classes.entries}>{entries}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		meal: state.journalEntries.meal,
		breakfast: state.journalEntries.breakfast,
		lunch: state.journalEntries.lunch,
		dinner: state.journalEntries.dinner,
		snack: state.journalEntries.snack,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};


export default connect(
	mapStateToProps,
	actions
)(withErrorHandler(JournalEntries, axios));
