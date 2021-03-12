import React from 'react';
import Button from '../UI/Button/Button';
import Login from '../../hoc/Layout/Login/Login'

const Landing = (props) => {
	return (
		<Login>
				<h5>A healthier YOU starts with what you EAT!</h5>
				<Button btnType="Success" clicked={() => props.history.push('/auth')} style={{marginBottom: '10vh'}}>
					Let's Begin
				</Button>
		</Login>
	);
};

export default Landing;
