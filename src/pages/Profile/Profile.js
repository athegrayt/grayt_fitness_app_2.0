import React, { useContext, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Picker from 'react-scrollable-picker';
import Button from '../../components/UI/Button/Button';
import {
	groupValuesWeight,
	groupValuesGoalWeight,
} from '../../components/WizardForms/Onboarding/OnbaordingPagesUtilities';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import useCalGoal from '../../hooks/useCalGoal';
import * as classes from './Profile.module.css';
import GlobalStateContext from '../../context/global-state-context';

const Profile = (props) => {
	const context = useContext(GlobalStateContext);
	const {
		name,
		weight,
		height,
		age,
		goalWeight,
		activity,
		sex,
		docID,
		logout,
		updateUser,
		updateCurTab,
		loading
	} = context;
	const [goalWeightUpdate, setGoalWeightUpdate] = useState(goalWeight);
	const [weightUpdate, setWeightUpdate] = useState(weight);
	const [status, setStatus] = useState(false);
	const [changeGoal, setChangeGoal] = useState(false);
	const [changeWeight, setChangeWeight] = useState(false);
	const [logoutStatus, setLogoutStatus] = useState(false);
	const valueGroupsGoalWeight = {
		goalWeight: goalWeightUpdate,
	};
	const valueGroupsWeight = {
		weight: weightUpdate,
	};
	const optionGroupsGoalWeight = groupValuesGoalWeight(400);
	const optionGroupsWeight = groupValuesWeight(400);
	const calGoal = useCalGoal(weight, height, age, goalWeight, activity, sex);
	const updateUserWeight = () => {
		updateUser(goalWeightUpdate, weightUpdate, docID);
		setStatus(false);
		setChangeGoal(false);
		setChangeWeight(false);
		setLogoutStatus(false);

	};

	return (
		<div className={classes.profile}>
			<h1>{name}</h1>
			<div className={classes.horizontalLine}> </div>
			<div className={classes.weight}>
				<Button
					type='button'
					btnType='Auth'
					style={{ width: '33vw', textAlign: 'center', padding: '0' }}
					clicked={() => {
						setChangeWeight(true);
						setStatus(true);
					}}>
					<div className={classes.title}>
						<p>Weight:</p>
						<p style={{ color: 'black' }}>{weight}lbs</p>
					</div>
				</Button>
				<div className={classes.verticalLine}> </div>
				<Button
					type='button'
					btnType='Auth'
					style={{ width: '33vw', textAlign: 'center', padding: '0' }}
					clicked={() => {
						setChangeGoal(true);
						setStatus(true);
					}}>
					<div className={classes.title}>
						<p>Goal Weight:</p>
						<p style={{ color: 'black' }}>{goalWeight}lbs</p>
					</div>
				</Button>
			</div>
			<div className={classes.horizontalLine}> </div>
			<div className={classes.calGoal}>
				<h3 style={{ color: '#44C2CA' }}>Daily Caloric Goal:</h3>
				<h3 style={{ marginTop: '0', color: 'black' }}>{calGoal}</h3>
			</div>
			<div className={classes.horizontalLine}> </div>
			<div
				style={{ marginBottom: '5vh' }}
				onClick={() => {
					setLogoutStatus(true);
					setStatus(true);
				}}>
				<FiSettings size='3rem' />
			</div>
			<Modal
				status={status}
				clicked={() => {
					setStatus(false);
					setChangeGoal(false);
					setLogoutStatus(false);
				}}>
				{(changeGoal || changeWeight) && (
					<div className={classes.update}>
						<h3>{`Update your ${changeGoal ? 'Goal' : 'Current'} Weight`}</h3>
						{changeGoal && (
							<Picker
								optionGroups={optionGroupsGoalWeight}
								valueGroups={valueGroupsGoalWeight}
								onChange={(name, value) => {
									setGoalWeightUpdate(value);
								}}
							/>
						)}
						{!changeGoal && (
							<Picker
								optionGroups={optionGroupsWeight}
								valueGroups={valueGroupsWeight}
								onChange={(name, value) => {
									setWeightUpdate(value);
								}}
							/>
						)}
						<Button type='button' btnType='Yield' clicked={updateUserWeight}>
							Update
						</Button>
					</div>
				)}

				{logoutStatus && (
					<div>
						{!loading && (
							<Button
								type='button'
								btnType='Danger'
								clicked={() => {
									updateCurTab('home');
									logout();
								}}>
								Logout
							</Button>
						)}
						{loading && <Loading />}
					</div>
				)}
			</Modal>
		</div>
	);
};
export default Profile;
