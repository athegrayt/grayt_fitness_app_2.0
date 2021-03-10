import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Graytfitness from './hoc/Layout/GraytFitness/Graytfitness';
import Onboarding from './pages/Onboarding/Onboarding';
import DailyJournal from './pages/DailyJournal/DailyJournal';
import Records from './pages/Records/Records';
import Profile from './pages/Profile/Profile';
import GlobalContext from './context/global-state-context';
import Auth from './pages/Auth/Auth';
import Landing from './components/Landing/Landing';

const App = () => {
	const context = useContext(GlobalContext);
	const { registered, token, authCheckState } = context;
	useEffect(() => {
		authCheckState();
	}, [registered]);

	let routes = (
		<Switch>
			{!token && (
				<Switch>
					<Route path='/' exact component={Landing} />
					<Route path='/auth' exact component={Auth} />
					<Redirect to='/auth' />
				</Switch>
			)}
			{token && registered && (
				<Graytfitness>
					<Route path='/dashboard' component={DailyJournal} />
					<Route path='/records' component={Records} />
					<Route path='/profile' component={Profile} />
					<Redirect to='/dashboard' />
				</Graytfitness>
			)}
			{token && !registered && (
				<Switch>
					<Route path='/onboarding' component={Onboarding} />
					<Redirect to='/onboarding' />
				</Switch>
			)}
		</Switch>
	);

	return <BrowserRouter>{routes}</BrowserRouter>;
};

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.),
//   };
// };

export default App;
