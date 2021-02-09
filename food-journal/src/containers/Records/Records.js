import React, {useState} from 'react'
import Calendar from 'react-calendar'
import {connect} from 'react-redux'
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary'
import * as classes from './Records.module.css'
import * as actions from '../../store/actions/index'
import 'react-calendar/dist/Calendar.css';
    
const Records = (props) =>{
   const [value, onChange] = useState(new Date());


		return (
			<div className={classes.Records}>
				<Calendar
					onChange={() => onChange(console.log(value))}
					onClickDay={(value, event) => console.log('Clicked day: ', value)}
					value={value}
					next2Label={null}
					prev2Label={null}
					maxDetail='month'
					minDetail='month'
				/>
				<Button type="button" btnType="Success" clicked={props.setTabStatus(null)}>View Journal Entries: {value.toLocaleDateString()}</Button>
				<Modal
					status={props.status}
					clicked={props.setTabStatus(null)}
					content={'dailyJournal'}>
					<NutritionSummary />
				</Modal>
			</div>
		);
    
};
const mapStateToProps = (state) => {
	return {
		breakdown: state.journalEntries.breakdown,
		status: state.tabBar.modalOpen,
		page: state.tabBar.page,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};
export default connect(mapStateToProps, actions)(Records);