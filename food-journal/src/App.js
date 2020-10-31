import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import FoodJournal from '../src/containers/FoodJournal/FoodJournal';
import NutritionalFacts from './containers/NutritionFacts/NutritionFacts';
import UserInfo from './containers/UserInfo/UserInfo';


function App () {
		return (
			<BrowserRouter>
			<Layout>
				<Switch>
				<Route path="/food-journal" component={FoodJournal}/>
				<Route path="/nutrition-facts" component={NutritionalFacts}/>
				<Route path="/user-info" component={UserInfo}/>
				</Switch>
			</Layout>
			</BrowserRouter>
			
		);	
}

export default App;
