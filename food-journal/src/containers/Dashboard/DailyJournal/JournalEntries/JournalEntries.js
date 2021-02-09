import React, { Component} from 'react';
import { connect } from 'react-redux';
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
		this.props.fetchInfo(this.props.token, this.props.userId);
	}

	deleteRequestHandler = (entry) => {
		this.props.deleteEntry(
			this.props.token,
			entry.docID,
			this.props.userId,
			this.props.meal,
			entry.consumed_at.toISOString().slice(0, 10)
		);
	};

	render() {
		const curDayEntries = this.props[`${this.props.meal}`];
		let entries = (
					<div className={classes.empty}>
						<p>There's nothing like a fresh start!</p>
						<p>
							Click on the{' '}
							<span>
								<RiAddCircleLine color='#9b9b9b' size='1rem' />
							</span>{' '}
							above to start tracking your diet!
						</p>
					</div>
				) 
		if (curDayEntries && curDayEntries.length) {
			entries = curDayEntries.map((entry, i) => {
				return (
					<Button
						style={{ margin: '1vh 0' }}
						type='button'
						btnType='Success'
						key={entry.consumed_at}
						id={i}
						clicked={() => {
							this.props.setPage('nutriFacts');
							this.props.setEntries(entry, 'entry');
							this.props.setBreakdown(null, true);
						}}
						deleteRequestHandler={() => this.deleteRequestHandler(entry)}>
						<JournalEntry entry={entry} />
					</Button>
				);
			});
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
		meal: state.tabBar.meal,
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
