import React from 'react';
import * as classes from './Input.module.css';

const Input = ({ input, label, type, placeholder, error, min}) => {
	return (
		<div 
		>
			<input
				{...input}
				id={label}
				placeholder={placeholder}
				type={type}
				className={classes.form__field}
				min={min}
			/>
			<span className='red-text'>{error}</span>
		</div>
	);
};
export default Input;
