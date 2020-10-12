import React from 'react'
import FoodSelected from './FoodSelected/FoodSelected' 
import FoodSelect from './FoodSelect/FoodSelect' 
import PropTypes from 'prop-types'

const foodSearch = (props) =>{
    let foodSearch = null;
		props.foodSelected
			? foodSearch = 
					<FoodSelected
						food={props.food}
						amount={props.amount}
						unit={props.unit}
						amountChanged={props.amountChanged}
					unitChanged={props.unitChanged}
						addEntry={props.addEntry}
					/>
			  
		: foodSearch = 
					<FoodSelect
						value={props.food}
						changed={props.changed}
						clicked={props.clicked}
					/>
			  
    return foodSearch
        
        
        

    
};

foodSearch.propTypes = {
    foodSelected: PropTypes.bool,
    value: PropTypes.string,
	amount: PropTypes.number,
	unit: PropTypes.string,
	changed: PropTypes.func,
	clicked: PropTypes.func,
};

export default foodSearch;