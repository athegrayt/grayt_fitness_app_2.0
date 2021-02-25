import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Cockpit from '../../components/Cockpit/Cockpit';
import JournalEntries from '../../components/JournalEntries/JournalEntries';
import FoodSearch from '../../components/FoodSearch/FoodSearch';
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary';
import MealButtons from '../../components/MealButtons/MealButtons';
import useNutritionTotal from '../../hooks/useNutritionTotal';
import DailyJournalContext from '../../context/daily-journal-context';
import Modal from '../../components/UI/Modal/Modal';
import useModal from '../../hooks/useModal';
import * as classes from './DailyJournal.module.css';

const DailyJournal = (props) => {
	const context = useContext(DailyJournalContext);
	const {
		registered,
		token,
		userId,
		breakfast,
		lunch,
		dinner,
		snack,
		deleteEntry,
		initEntries,
	} = context;
	let history = useHistory() 
	const parent = 'dailyJournal'
	const [page, setPage] = useState();
	const [meal, setMeal] = useState();
	const [entryMeal, setEntryMeal] = useState();
	const [food, setFood] = useState();
	const [breakdown, setBreakdown] = useState(false);
	const [curStatus, setCurStatus] = useState(false);
	const status = useModal(curStatus);
	const [nutritionTotal, curTotalCal, percentage] = useNutritionTotal(
		breakfast,
		lunch,
		dinner,
		snack,
		meal,
		food,
		2000
	);

	useEffect(()=>{
		// if(registered){
			const curDate = new Date()
			initEntries(token, userId,curDate);
		// }else{
		// 	history.push('/onboarding')
		// }
	}, [])

	const tabHandler = (status) => {
		setBreakdown(false);
		setCurStatus(!curStatus);
		setPage(null);
		setMeal(null);
	};

	const cssClassesDailyJournal = [
		classes.dailyJournal,
		status && classes.none,
	].join(' ');
	
	return (
		<div className={cssClassesDailyJournal}>
			<Cockpit
				parent={parent}
				breakdown={breakdown}
				curStatus={curStatus}
				nutritionTotal={nutritionTotal}
				curTotalCal={curTotalCal}
				percentage={percentage}
				setBreakdown={(status) => setBreakdown(status)}
				setCurStatus={(status) => setCurStatus(status)}
				setPage={(page) => setPage(page)}
				meal={meal}
				food={food}
				page={page}
			/>
			{!status && (
				<MealButtons
					setPage={(page) => setPage(page)}
					setMeal={(meal) => setMeal(meal)}
					setStatus={(status) => setCurStatus(status)}
				/>
			)}
			<Modal status={status} clicked={() => tabHandler()} parent={parent}>
				{page === 'jrlEntry' && (
					<JournalEntries
						parent={parent}
						meal={meal}
						breakfast={breakfast}
						lunch={lunch}
						dinner={dinner}
						snack={snack}
						setMeal={(meal) => setMeal(meal)}
						setPage={(page) => setPage(page)}
						setFood={(entry) => setFood(entry)}
						setBreakdown={(status) => setBreakdown(status)}
						closeTab={() => tabHandler()}
						setEntryMeal={(entryMeal) => setEntryMeal(entryMeal)}
					/>
				)}
				{page === 'foodSearch' && (
					<FoodSearch previousPage={(page) => setPage(page)} meal={meal} />
				)}
				{page === 'nutriFacts' && (
					<NutritionSummary
						food={food}
						meal={meal}
						parent={parent}
						token={token}
						userId={userId}
						percentage={percentage}
						nutritionTotal={nutritionTotal}
						curTotalCal={curTotalCal}
						calGoal={2000}
						breakdown={breakdown}
						setPage={(page) => setPage(page)}
						setCurStatus={(status) => setCurStatus(status)}
						setBreakdown={(status) => setBreakdown(status)}
						setFood={(food) => setFood(food)}
						setMeal={(meal) => setMeal(meal)}
						entryMeal={entryMeal}
						deleteEntry={deleteEntry}
					/>
				)}
			</Modal>
		</div>
	);
};

export default DailyJournal;
