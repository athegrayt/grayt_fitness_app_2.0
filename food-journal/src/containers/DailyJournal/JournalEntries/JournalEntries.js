import React, { useContext } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';
import DailyJournalContext from '../../../context/daily-journal-context';
import JournalEntry from '../../../components/JournalEntry/JournalEntry';
import classes from './JournalEntries.module.css';

const JournalEntries = (props) => {
	const context = useContext(DailyJournalContext);
	const { breakfast, lunch, dinner, snack } = context;
	const meals = [breakfast, lunch, dinner, snack];
	const { meal } = props;
	const curMeal = meals.filter((mealList) => mealList.name === meal);
	let jrlEntries = (
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
	);
	if (curMeal && curMeal[0].entries.length) {
		jrlEntries = (
			<JournalEntry
				curMeal={curMeal}
				setPage={props.setPage}
				setFood={props.setFood}
				setMeal={props.setMeal}
			/>
		);
	}
	return (
		<div className={classes.JournalEntries}>
			<div onClick={() => props.closeTab()} className={classes.icon}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			<div className={classes.add} onClick={() => props.setPage('foodSearch')}>
				<RiAddCircleLine color='#9b9b9b' size='2rem' />
			</div>
			{jrlEntries}
		</div>
	);
};

export default JournalEntries;
