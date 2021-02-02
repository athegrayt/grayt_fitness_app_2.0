import React, { Component } from 'react'
import Cockpit from './Cockpit/Cockpit'
import FoodSearch from './DailyJournal/FoodSearch/FoodSearch'
import DailyJournal from './DailyJournal/DailyJournal'
import JournalEntries from './DailyJournal/JournalEntries/JournalEntries'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'

class Dashboard extends Component{
   
    componentDidMount=()=>{
        const { token, userId, location} = this.props
        this.props.initEntries(token, userId);
        this.props.updateCurTab(location.icon || "home");
    }
    render(){
        return(
            <div>
                <Cockpit/>
                <DailyJournal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        meal: state.journalEntries.meal,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, actions)(Dashboard);