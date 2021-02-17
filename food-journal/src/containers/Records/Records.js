import React, {useState} from 'react'
import Calendar from 'react-calendar'
import {connect} from 'react-redux'
import Button from '../../components/UI/Button/Button'
import RecordsEntry from '../../components/RecordsEntry/RecordsEntry'
import * as classes from './Records.module.css'
import * as actions from '../../store/actions/index'
import 'react-calendar/dist/Calendar.css';
    
const Records = (props) =>{
   const [value, onChange] = useState(new Date());
		return (
			<div className={classes.Records}>
				<Calendar
					onChange={onChange}
					onClickDay={(value, event) => onChange(value)}
					value={value}
					next2Label={null}
					prev2Label={null}
					maxDetail='month'
					minDetail='month'
				/>
				<Button
					type='button'
					btnType='Success'
					clicked={() => props.setTabStatus(null)}>
					View Journal Entries: {value.toLocaleDateString()}
				</Button>
				<RecordsEntry/>
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