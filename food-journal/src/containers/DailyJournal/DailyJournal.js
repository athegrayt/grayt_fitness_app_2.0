import React, {useState} from 'react'
import Cockpit from '../../containers/Cockpit/Cockpit';
import JournalEntries from './JournalEntries/JournalEntries'
import FoodSearch from '../../components/FoodSearch/FoodSearch'
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary';
import MealButtons from '../../components/MealButtons/MealButtons';
import Modal from '../../components/UI/Modal/Modal';
import useModal from '../../hooks/useModal'
import * as classes from './DailyJournal.module.css'
    
const DailyJournal = (props) => {
	// const context = useContext(DailyJournalContext);
	// const { token, userId } = context;
	const [page, setPage] = useState()
	const [meal, setMeal] = useState()
	const [food, setFood] = useState()
	const [breakdown, setBreakdown] = useState(false)
	const [curStatus, setCurStatus] = useState(false)
	const status = useModal(curStatus)
	
	// useEffect(()=>{
	// 	context.setEntries(token, userId);
	// }, [])

    const tabHandler = (status) => {
		setCurStatus(status);
		((status === null && curStatus) && setMeal(null))
		setBreakdown(null);
		setMeal(null)
	};

    
		const cssClassesDailyJournal = [
			classes.dailyJournal, status && classes.none
		].join(' ');
		return (
			<div className={cssClassesDailyJournal}>
				<Cockpit
					breakdown={breakdown}
					setBreakdown={(status) => {
						status === null ? setBreakdown(!breakdown) : setBreakdown(status);
					}}
					tabHandler={(status) => tabHandler(status)}
					meal={meal}
					food={food}
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
							meal={meal}
							setMeal={(meal) => setMeal(meal)}
							setPage={(page) => setPage(page)}
							setFood={(entry) => setFood(entry)}
							closeTab={() => tabHandler()}
						/>
					)}
					{page === 'foodSearch' && (
						<FoodSearch previousPage={(page) => setPage(page)} meal={meal} />
					)}
					{page === 'nutriFacts' && (
						<NutritionSummary
							previousPage={(page) => setPage(page)}
							food={food}
							// token={token}
							// userId={userId}
							// meals={meals}
							breakdown={breakdown}
							setPage={(page) => setPage(page)}
							setCurStatus={(status) => setCurStatus(status)}
							setBreakdown={(status) => setBreakdown(status)}
							setFood={(food) => setFood(food)}
						/>
					)}
				</Modal>
			</div>
		);

};




export default DailyJournal;