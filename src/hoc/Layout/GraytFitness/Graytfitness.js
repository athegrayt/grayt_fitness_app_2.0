import React, { useContext } from 'react';
import DailyJournalContext from '../../../context/global-state-context'
import logo from '../../../assets/images/logo2.png';
import HomeIcon from '../../../components/UI/HomeIcon/HomeIcon'
import { FaClipboard, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as classes from './Graytfitness.module.css';


const GraytFitness =(props)=> { 
	const context = useContext(DailyJournalContext)	
	const {curTab, updateCurTab}=context
	let homeIconClass = curTab === 'home' ? '#44C9B0' : ' #fff';
	let recordIconClass = curTab === 'records'
			? classes.selected
			: classes.unselected;
	let settingsIconClass = curTab === 'settings'
			? classes.selected
			: classes.unselected;
		return (
			<div className={classes.layout}>
				<Link
					to={{
						pathname: '/dashboard',
						icon: 'home',
					}}
					onClick={() => updateCurTab('home')}>
					<img className={classes.logo} src={logo} alt='logo'></img>
				</Link>
				<main className={classes.content}>{props.children}</main>
				<div className={classes.tabBar}>
					<div className={classes.icons}>
						<Link
							to={{
								pathname: '/records',
								icon: 'records',
							}}
							onClick={() => updateCurTab('records')}>
							<FaClipboard className={recordIconClass} />
						</Link>
						<div className={classes.homeIcon}>
							<Link
								to={{
									pathname: '/dashboard',
									icon: 'home',
								}}
								onClick={() => updateCurTab('home')}>
								<HomeIcon
									fill={homeIconClass}
									title='home'
									style={{ width: '75%' }}
								/>
							</Link>
						</div>
						<Link
							to={{
								pathname: '/profile',
								icon: 'settings',
							}}
							onClick={() => updateCurTab('settings')}>
							<FaUser className={settingsIconClass} />
						</Link>
					</div>
				</div>
			</div>
		);
	
}

export default GraytFitness;
