import React from 'react';
import * as classes from './AutoComplete.module.css';
import {connect} from 'react-redux'

const AutoComplete = ({ input, label, value, type, placeholder, onChange, hint }) => {
	let autoHint = null
	
    return (
		<div>
			<input
				{...input}
				id={label}
				placeholder={placeholder}
				value={value}
				onChange={autoHint}
				type={type}
				className={classes.form__field}
			/>
			
		</div>
	);
};

const mapStateToProps = state =>{
    return{
        
    }
}

export default connect(mapStateToProps)(AutoComplete);
