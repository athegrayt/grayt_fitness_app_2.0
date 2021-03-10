import React from 'react'
import Spinner from '../UI/Spinner/Spinner'
import * as classes from './Loading.module.css'
    
const Loading = (props) =>{
   return (
			<div className={classes.loading}>
				<Spinner />
                <h3> Loading...</h3>
			</div>
		);
    
};
export default Loading;