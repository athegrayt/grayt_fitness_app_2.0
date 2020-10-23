import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import FoodJournal from '../src/containers/FoodJournal/FoodJournal';
import NutritionalFacts from './containers/NutritionFacts/NutritionFacts'



function App () {
		return (
			<BrowserRouter>
			<Layout>
				<Route path="/food-journal" component={FoodJournal}/>
				<Route path="/nutrition-facts" component={NutritionalFacts}/>
			</Layout>
			</BrowserRouter>
			
		);	
}

export default App;
