import React, { Component } from 'react'
import Cockpit from './Cockpit/Cockpit'
import DailyJournal from './DailyJournal/DailyJournal'
import {connect} from 'react-redux'
import * as classes from './Dashboard.module.css'
import * as actions from '../../store/actions'

class Dashboard extends Component{
   
    componentDidMount=()=>{
        const { token, userId, location} = this.props
        this.props.initEntries(token, userId);
        this.props.updateCurTab(location.icon || "home");
    }
    render(){
        return(
            <div className={classes.dashboard}>
                <Cockpit/>
                <DailyJournal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        meal: state.tabBar.meal,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, actions)(Dashboard);