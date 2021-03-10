import React from 'react'
import Button from '../UI/Button/Button';
import GoogleLogo from '../../assets/images/flat-color-icons_google.png';
import * as classes from './AuthTypeBTNs.module.css'
    
const AuthTypeBTNs = (props) =>{
  const {googleAuth} = props
	return (
			<div className={classes.authBTN}>
				<Button btnType='Auth' clicked={props.setAuthType}>
					Email
				</Button>
				<Button btnType='Auth' clicked={googleAuth}>
					<span>
						<img src={GoogleLogo} alt='google' style={{ width: '16px' }}></img>
					</span>
					oogle
				</Button>
			</div>
		);
    
};
export default AuthTypeBTNs;