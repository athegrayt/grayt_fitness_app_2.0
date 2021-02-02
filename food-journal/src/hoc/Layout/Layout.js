import React, { Component } from 'react';
import logo from '../../assets/images/logo2.png';
import logoIcon from '../../assets/images/homeIcon.png'
import { FaClipboard, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as classes from './Layout.module.css';
import * as actions from '../../store/actions/tabBar'

class TabBar extends Component { 
    render() {
		let homeIconClass = this.props.homeIcon
			? classes.selected
			: classes.unselected;
		let recordIconClass = this.props.recordIcon
			? classes.selected
			: classes.unselected;
		let settingsIconClass = this.props.settingsIcon
			? classes.selected
			: classes.unselected;
		return (
			<div className={classes.layout}>
				<main className={classes.content}>
					<Link
				to={{
					pathname: '/dashboard',
					icon: 'home',
				}}>
				<img className={classes.logo} src={logo} alt='logo'></img>
			</Link>
					{this.props.children}
				</main>
				<div className={classes.tabBar}>
					<div className={classes.icons}>
						<Link
							to={{
								pathname: '/user-records',
								icon: 'records',
							}}>
							<FaClipboard className={recordIconClass} />
						</Link>
						<div className={classes.homeIcon}>
						<Link
							to={{
								pathname: '/dashboard',
								icon: 'home',
							}}>
							<img src={logoIcon} alt='home' style={{width: '75%'}} className={homeIconClass} />
						</Link>
						</div>
						<Link
							to={{
								pathname: '/user-settings',
								icon: 'settings',
							}}>
							<FaUser className={settingsIconClass} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		homeIcon: state.tabBar.icons.home,
		recordIcon: state.tabBar.icons.records,
		settingsIcon: state.tabBar.icons.settings,
		jeop: state.tabBar.jeopardy,
	};
};
export default connect(mapStateToProps, actions)(TabBar);
