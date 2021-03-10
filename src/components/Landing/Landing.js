import React from 'react';
import Button from '../UI/Button/Button';
import Login from '../../hoc/Layout/Login/Login'
import * as classes from './Landing.module.css'
const Landing = (props) => {
	return (
		<Login>
			<div className={classes.content}>
				<h5>A healthier YOU starts with what you EAT!</h5>
				<Button btnType="Success" clicked={() => props.history.push('/auth')} style={{marginBottom: '10vh'}}>
					Let's Begin
				</Button>
			</div>
		</Login>
	);
};

export default Landing;
