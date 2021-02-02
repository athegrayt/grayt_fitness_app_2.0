import React from 'react';
import * as classes from './Input.module.css';

const Input = ({ input, label, value, type, placeholder, onChange, error}) => {
	return (
		<div 
		>
			<input
				{...input}
				id={label}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type}
				className={classes.form__field}
			/>
			<span className='red-text'>{error}</span>
		</div>
	);
};
export default Input;
