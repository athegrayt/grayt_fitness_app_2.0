import React from 'react'
import { connect } from 'react-redux';
import Modal from '../UI/Modal/Modal';
import RecordSummary from '../RecordSummary/RecordSummary';
import * as classes from './RecordsEntry.module.css'
import * as actions from '../../store/actions'
    
const RecordsEntry = (props) =>{
   
	return (
			<Modal
				status={props.status}
				records={true}
				clicked={() => props.setTabStatus(null)}>
				<RecordSummary />
                
			</Modal>
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
export default connect(mapStateToProps, actions)(RecordsEntry)