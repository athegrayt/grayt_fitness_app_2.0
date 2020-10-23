import React from 'react'
import classes from './NavigationItems.module.css'
// import NavigationItem from './NavigationItem/NavigationItem'
import {NavLink} from 'react-router-dom'
    
    
const navigationItems = (props) =>{
   return (
			<ul className={classes.NavigationItems}>
				<NavLink to="/food-journal">
					Food Journal
				</NavLink>
				<NavLink to="/nutrition-facts">Nutritional Facts</NavLink>
			</ul>
		);
    
};
export default navigationItems;