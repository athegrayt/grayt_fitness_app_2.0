import React, {Component} from 'react'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import JournalEntry from './JournalEntry/JournalEntry'
import Modal from '../../components/UI/Modal/Modal'
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary'
import classes from './JournalEntries.module.css'
		
class JournalEntries extends Component {
	state={
		showNutrition: false, 
		entry:{}, 
		entryID: null
	}


	deleteRequestHandler = (entryID) => {
		console.log(entryID)
		let newEntry = this.state.entry;
		newEntry = this.props.jrlEntry[entryID]
		this.setState({entry: newEntry, entryID: entryID, showNutrition: true})
		
	};

	closeModalHandler = ()=>{
		this.setState({showNutrition: false})
	}

	render() {
		let entries = <Spinner />;
		if (this.props.jrlEntry) {
			entries = this.props.jrlEntry.map( (entry, i) =>{
				return (
				<JournalEntry
					key={entry.consumed_at}
					id={i}
					entry={entry}
					deleteRequestHandler={() => this.deleteRequestHandler(i)}
				/>
			);
			})
		}
		return(
			<div className={classes.JournalEntries}>
			<Modal show={this.state.showNutrition} modalClosed={this.closeModalHandler}>
				<NutritionSummary entry={this.state.entry} clicked={()=>
					{this.props.onEntryDelete(this.state.entryID);this.closeModalHandler()}}/>
			</Modal>
			{entries}
			</div>);
	}
};

const mapStateToProps = state =>{
	return {
		jrlEntry: state.journalEntries,
	};
}

const mapDispatchToProps = dispatch =>{
	return{
		onEntryDelete: (id) =>
			dispatch({
				type: actionTypes.DELETE_ENTRY, entryID: id
			})
		
	}
} 
export default connect(mapStateToProps, mapDispatchToProps)(JournalEntries);