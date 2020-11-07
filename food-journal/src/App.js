import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import FoodSearch from '../src/containers/FoodSearch/FoodSearch';
import Cockpit from './components/Cockpit/Cockpit'
import JournalEntries from './components/JournalEntries/JournalEntries'
import NutritionalFacts from './containers/NutritionFacts/NutritionFacts';
import UserInfo from './containers/UserInfo/UserInfo';


function App () {
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route
							path="/food-journal"
							render={() => (
								<Fragment>
									<Cockpit />
									<FoodSearch />
									<JournalEntries />
								</Fragment>
							)}
						/>
						<Route path="/nutrition-facts" component={NutritionalFacts} />
						<Route path="/user-info" component={UserInfo} />
					</Switch>
				</Layout>
			</BrowserRouter>
		);	
}

export default App;
