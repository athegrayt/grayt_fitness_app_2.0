import React, {useState,useEffect, useContext} from 'react'
import Cockpit from '../../containers/Cockpit/Cockpit';
import JournalEntries from './JournalEntries/JournalEntries'
import FoodSearch from '../../components/FoodSearch/FoodSearch'
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary';
import MealButtons from '../../components/MealButtons/MealButtons';
import Modal from '../../components/UI/Modal/Modal';
import DailyJournalContext from '../../context/daily-journal-context'
import useModal from '../../hooks/useModal'
import * as classes from './DailyJournal.module.css'
    
const DailyJournal = (props) => {
	const context = useContext(DailyJournalContext);
	const [page, setPage] = useState()
	const [meal, setMeal] = useState()
	const [breakdown, setBreakdown] = useState()
	const [curStatus, setCurStatus] = useState(false)
	const status = useModal(curStatus)
	useEffect(()=>{
		const { token, userId} = context;
		context.setEntries(token, userId, meal);
	}, [])

    const tabHandler = (status) => {
		setCurStatus(status);
		((status === null && curStatus) && setMeal(null))
		setBreakdown(null);
	};

    
		const cssClassesDailyJournal = [
			classes.dailyJournal, status && classes.none
		].join(' ');
		
		return (
			<div className={cssClassesDailyJournal}>
				<Cockpit 
				breakdown={breakdown} 
				setBreakdown={status=>setBreakdown(status)} 
				tabHandler={tabHandler}
			/>
				{!status && (
					<MealButtons
						setPage={(page) => setPage(page)}
						setMeal={(meal) => setMeal(meal)}
						setStatus={(status) => setCurStatus(status)}
					/>
				)}
				<Modal
					status={status}
					clicked={() => tabHandler()}
					content={'dailyJournal'}>
					{page === 'jrlEntry' && (
						<JournalEntries
							setPageHook={(page) => {
								setPage(page)
							}}
							closeTab={() => tabHandler()}
						/>
					)}
					{page === 'foodSearch' && (
						<FoodSearch previousPage={(page) => setPage(page)} meal={meal} />
					)}
					{page === 'nutriFacts' && (
						<NutritionSummary previousPage={(page) => setPage(page)} />
					)}
				</Modal>
			</div>
		);

};




export default DailyJournal;