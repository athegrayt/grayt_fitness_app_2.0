import React from 'react'
import Modal from '../UI/Modal/Modal';
import Cockpit from '../../containers/Cockpit/Cockpit'
// import RecordSummary from '../RecordSummary/RecordSummary';
// import * as classes from './RecordsEntry.module.css'
import * as actions from '../../store/actions'
    
const RecordsEntry = (props) =>{
   const {curStatus, setCurStatus} = props
	return (
		<Modal
			status={curStatus}
			records={true}
			clicked={() => setCurStatus(false)}>
			<Cockpit
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
		</Modal>
	);
    
};

export default RecordsEntry