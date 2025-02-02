import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Registration from '../../hoc/Layout/Registration/Registration';
import OnboardingPage1 from '../../components/WizardForms/Onboarding/OnboardingPage1';
import OnboardingPage2 from '../../components/WizardForms/Onboarding/OnboardingPage2';
import OnboardingPage3 from '../../components/WizardForms/Onboarding/OnboardingPage3';
import OnboardingPage4 from '../../components/WizardForms/Onboarding/OnboardingPage4';
import OnboardingPage5 from '../../components/WizardForms/Onboarding/OnboardingPage5';
import OnboardingPage6 from '../../components/WizardForms/Onboarding/OnboardingPage6';
import OnboardingPage7 from '../../components/WizardForms/Onboarding/OnboardingPage7';
import OnboardingPage8 from '../../components/WizardForms/Onboarding/OnboardingPage8';
import OnboardingPage9 from '../../components/WizardForms/Onboarding/OnboardingPage9';
import * as classes from './Onboarding.module.css';
import useCalGoal from '../../hooks/useCalGoal';
import dailyJournalContext from '../../context/global-state-context';
import ProgressMeter from '../../components/ProgressMeter/ProgressMeter';
import Loading from '../../components/Loading/Loading';

const Onboarding = (props) => {
	const context = useContext(dailyJournalContext);
	let history = useHistory()
	const { userId, addUser, registered, loading, name } = context;
	const [userName, setUserName] = useState(name);
	const [page, setPage] = useState(1);
	const [birthdate, setBirthdate] = useState();
	const [sex, setSex] = useState();
	const [height, setHeight] = useState(68);
	const [weight, setWeight] = useState();
	const [goalWeight, setGoalWeight] = useState(weight);
	const [activity, setActivity] = useState();
	const cur = new Date();
	const diff = cur - birthdate; // This is the difference in milliseconds
	const age = Math.floor(diff / 31557600000); 
	const calGoal = useCalGoal(weight, height, age, goalWeight, activity, sex);

	useEffect(()=>{
		if(registered){
			history.push('/')
		}
	})

	return (
		<Registration
			page={page}
			name={userName}
			setPage={setPage}
			sex={sex}
			height={height}
			birthdate={birthdate}
			weight={weight}
			activity={activity}
			goalWeight={goalWeight}
			submit={() =>{
				addUser({
					name:userName,
					height,
					age,
					activity,
					sex,
					weight,
					goalWeight,
					calGoal,
					userId,
				})
			}
			}>
				{loading && <Loading/>}
			{!loading && <div className={classes.onboarding}>
				{page !== 9 && (
					<ProgressMeter percent={Math.round(((page - 1) / 7) * 100)} />
				)}
				{page === 1 && <OnboardingPage1 />}
				{page === 2 && (
					<OnboardingPage2 name={userName} setName={(value) => setUserName(value)} />
				)}
				{page === 3 && (
					<OnboardingPage3 sex={sex} setSex={(sex) => setSex(sex)} />
				)}
				{page === 4 && (
					<OnboardingPage4
						height={height}
						setHeight={(height) => setHeight(height)}
					/>
				)}
				{page === 5 && (
					<OnboardingPage5 setBirthdate={(value) => setBirthdate(value)} birthdate={birthdate} />
				)}
				{page === 6 && (
					<OnboardingPage6
						weight={weight}
						setWeight={(value) => setWeight(value)}
					/>
				)}
				{page === 7 && (
					<OnboardingPage7
						setActivity={(value) => setActivity(value)}
						activity={activity}
					/>
				)}
				{page === 8 && (
					<OnboardingPage8
						setGoalWeight={(value) => setGoalWeight(value)}
						goalWeight={goalWeight}
					/>
				)}
				{page === 9 && (
					<OnboardingPage9
						setPage={(value) => setPage(value)}
						name={userName}
						sex={sex}
						height={height}
						age={age}
						weight={weight}
						activity={activity}
						goalWeight={goalWeight}
					/>
				)}
			</div>}
		</Registration>
	);
};

export default Onboarding;
