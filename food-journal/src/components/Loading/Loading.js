import React from 'react'
import logo from '../../assets/images/logo2.png'
import Spinner from '../UI/Spinner/Spinner'
import * as classes from './Loading.module.css'
    
const Loading = (props) =>{
   return (
			<div className={classes.loading}>
				{/* <img className={classes.logo} src={logo} alt='logo'></img> */}
				<Spinner />
                <h3> Loading...</h3>
			</div>
		);
    
};
export default Loading;