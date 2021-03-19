import React, {useState, useContext} from 'react'
import {useHistory} from "react-router-dom"
import Calendar from 'react-calendar'
import Modal from '../../components/UI/Modal/Modal'
import MealButtons from '../../components/MealButtons/MealButtons';
import JournalEntries from '../../components/JournalEntries/JournalEntries'
import Cockpit from '../../components/Cockpit/Cockpit';
import Loading from '../../components/Loading/Loading';
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary';
import Button from '../../components/UI/Button/Button'
import useNutritionTotal from '../../hooks/useNutritionTotal'
import * as classes from './Records.module.css'
import './Calendar.css';
import dailyJournalContext from '../../context/global-state-context'
    
const Records = (props) =>{
   const context = useContext(dailyJournalContext)
   const {token, userId, breakfast, lunch, dinner, snack, initEntries, updateCurTab, loading, calGoal } = context;
   let history = useHistory()
   const parent = 'records'
	const [value, onChange] = useState(new Date());
	const [page, setPage] = useState('dailyRecord');
	const [meal, setMeal] = useState();
	const [entryMeal, setEntryMeal] = useState();
	const [food, setFood] = useState();
	const [breakdown, setBreakdown] = useState(false);
	const [curStatus, setCurStatus] = useState(false);
	const [nutritionTotal, curTotalCal, percentage] = useNutritionTotal(
		breakfast,
		lunch,
		dinner,
		snack,
		meal,
		food,
		calGoal
	);
   
	const tabHandler = (status) => {
		setBreakdown(false);
		setCurStatus(!curStatus);
		setPage('dailyRecord');
		setMeal(null);
	};

	const content = loading ? (
		<Loading />
	) : (<div className={classes.pastEntry}>
		{curTotalCal > 0 && <Cockpit
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
			parent={parent}
		/>}

	{
		page === 'dailyRecord' && curTotalCal > 0 && (
			<MealButtons
				setPage={(page) => setPage(page)}
				setMeal={(meal) => setMeal(meal)}
				setStatus={(status) => setCurStatus(status)}
			/>
		)
	}
	{
		page === 'dailyRecord' && curTotalCal <= 0 && (
			<div className={classes.empty}>
				<p>Sorry, we weren't able to find any journal entries for </p>
				<p> {value.toLocaleDateString()}</p>
				<p>please try selecting another date.</p>
			</div>
		)
	}
	{
		page === 'jrlEntry' && (
			<JournalEntries
				date={value.toLocaleDateString()}
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
		)
	}
	{
		page === 'nutriFacts' && (
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
			/>
			)
		}
		</div>)
		return (
			<div className={classes.Records}>
				<Calendar
					className='react-calendar'
					onChange={onChange}
					onClickDay={(value, event) => onChange(value)}
					value={value}
					next2Label={null}
					prev2Label={null}
					maxDetail='month'
					minDetail='month'
					maxDate={new Date()}
				/>
				<Button
					type='button'
					btnType='Success'
					style={{
						marginBottom: '20vh',
						width: ' 80%',
						boxShadow: '5px 5px 10px grey',
					}}
					clicked={() => {
						if (
							value.toLocaleDateString() === new Date().toLocaleDateString()
						) {
							updateCurTab('home');
							history.push('/dashboard');
						} else {
							setCurStatus(!curStatus);
							initEntries(token, userId, value);
						}
					}}>
					View Journal Entries: {value.toLocaleDateString()}
				</Button>
				<Modal
					status={curStatus}
					parent={parent}
					clicked={() => {
						setCurStatus(false);
						setPage('dailyRecord');
						setMeal(null);
						setFood(null);
						setBreakdown(false);
					}}>
					{content}
				</Modal>
			</div>
		);
    
};

export default Records;