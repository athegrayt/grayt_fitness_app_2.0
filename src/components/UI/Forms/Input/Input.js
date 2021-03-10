import React from 'react';
import * as classes from './Input.module.css';

const Input = ({label, type, placeholder, error, min ,register, ...inputProps}) => {
	return (
		<div 
		>
			<input
				{...inputProps}
				id={label}
				placeholder={placeholder}
				type={type}
				ref={register}
				className={classes.form__field}
				min={min}
			/>
			{error && <span className='red-text'>{error}</span>}
		</div>
	);
};
export default Input;
