import React, { Component } from 'react';
import logo from '../../assets/images/logo2.png';
import HomeIcon from '../../components/UI/HomeIcon/HomeIcon'
import { FaClipboard, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as classes from './Layout.module.css';
import * as actions from '../../store/actions'

class TabBar extends Component { 
    render() {
		let homeIconClass = this.props.homeIcon ? '#44C9B0' : ' #fff';
		let recordIconClass = this.props.recordIcon
			? classes.selected
			: classes.unselected;
		let settingsIconClass = this.props.settingsIcon
			? classes.selected
			: classes.unselected;
		return (
			<div className={classes.layout}>
				<Link
					to={{
						pathname: '/dashboard',
						icon: 'home',
					}}>
					<img className={classes.logo} src={logo} alt='logo'></img>
				</Link>
				<main className={classes.content}>{this.props.children}</main>
				<div className={classes.tabBar}>
					<div className={classes.icons}>
						<Link
							to={{
								pathname: '/records',
								icon: 'records',
							}}
							onClick={() =>
								this.props.updateCurTab(this.props.location.icon || 'records')
							}>
							<FaClipboard className={recordIconClass} />
						</Link>
						<div className={classes.homeIcon}>
							<Link
								to={{
									pathname: '/dashboard',
									icon: 'home',
								}}
								onClick={() =>
									this.props.updateCurTab(this.props.location.icon || 'home')
								}>
								<HomeIcon
									fill={homeIconClass}
									title='home'
									style={{ width: '75%' }}
								/>
							</Link>
						</div>
						<Link
							to={{
								pathname: '/user-settings',
								icon: 'settings',
							}}
							onClick={() =>
								this.props.updateCurTab(this.props.location.icon || 'settings')
							}>
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
