import React from 'react'
import logo from '../../../assets/images/Logo.png';
import * as classes from './Login.module.css';
    
const Login =(props)=>{
		const cssClasses = [classes.splashbg, props.blur && classes.blur].join(' ');
		return (
			<div>
				<div className={cssClasses}></div>
				<div>
					<main className={classes.content}>
						<img className={classes.logo} src={logo} alt='logo'></img>
						<div>{props.children}</div>
					</main>
				</div>
			</div>
		);
	}

export default (Login);