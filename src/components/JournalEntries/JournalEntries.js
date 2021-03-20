import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';
import JournalEntry from '../JournalEntry/JournalEntry';
import classes from './JournalEntries.module.css';

const JournalEntries = (props) => {
	const {
		date,
		parent,
		breakfast,
		lunch,
		dinner,
		snack,
		meal,
		setPage,
		setFood,
		setMeal,
		setBreakdown,
		setEntryMeal,
	} = props;
	const meals = [breakfast, lunch, dinner, snack];
	const curMeal = meals.filter((mealList) => mealList.name === meal);
	let jrlEntries =
		parent === 'dailyJournal' ? (
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
		) : (
			<div className={classes.empty}>
				<p>We weren't able to find any entries for your {meal} on {date} </p>
				{/* <p> </p> */}
			</div>
		);
	if (curMeal && curMeal[0].entries.length) {
		jrlEntries = (
			<JournalEntry
				parent={parent}
				curMeal={curMeal}
				setPage={setPage}
				setFood={setFood}
				setMeal={setMeal}
				setBreakdown={setBreakdown}
				setEntryMeal={setEntryMeal}
			/>
		);
	}
	return (
		<div className={classes.JournalEntries}>
			<div onClick={() => {
				if(parent===`dailyJournal`){
					props.closeTab()
				}else{
					setPage('dailyRecord');
					setMeal(null)
				}
				}} className={classes[`icon-${parent}`]}>
				<FaAngleLeft color='#9b9b9b' size='2rem' />
			</div>
			{parent === 'dailyJournal' && (
				<div
					className={classes.add}
					onClick={() => setPage('foodSearch')}>
					<RiAddCircleLine color='#9b9b9b' size='2rem' />
				</div>
			)}
			<h3>{meal}</h3>
			<div className={classes.entries}>
			{jrlEntries}
			</div>
		</div>
	);
};

export default JournalEntries;
