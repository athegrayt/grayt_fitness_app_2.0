import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

    
    
const navigationItems = (props) =>{
   return (
			<ul className={classes.NavigationItems}>
				<NavigationItem exact={props.exact}link="/food-journal">
					Food Journal
				</NavigationItem>
				<NavigationItem link="/nutrition-facts">Nutritional Facts</NavigationItem>
			</ul>
		);
    
};
export default navigationItems;