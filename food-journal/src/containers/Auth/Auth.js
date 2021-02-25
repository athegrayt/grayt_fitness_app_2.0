import React, {useState, useContext, useEffect} from 'react'
import DailyJournalContext from '../../context/daily-journal-context'
import AuthTypeBTNs from '../../components/AuthtypeBTNs/AuthTypeBTNs'
import AuthEmail from '../../components/AuthEmail/AuthEmail';
import {signInCopy, signUpCopy} from './authTypeCopy.js'
import Login from '../../hoc/Layout/Login/Login';
import Modal from '../../components/UI/Modal/Modal'
import useModal from '../../hooks/useModal'
import * as classes from './Auth.module.css'
import {useHistory} from 'react-router-dom'
    
const Auth =(props)=>{
	const context = useContext(DailyJournalContext);
	const {error, auth} = context
   const [authType, setAuthType] = useState(true)
   const [signIn, setSignIn] = useState(true)
   const [curStatus, setCurStatus] = useState(true)
   const status = useModal(curStatus);
   let history = useHistory()
	let authTypeCopy = signIn ? signInCopy: signUpCopy	
   const tabHandler=()=>{
	  setCurStatus(null)
      setAuthType(true)
	  history.push('/')
	  
   }
	const onSubmit = (values) => {
		const { email, password } = values;
		console.log(values);
		auth(email, password, !signIn);
	};	
       
      let authContent = authType ? (
				<AuthTypeBTNs
					signIn={signIn}
					setAuthType={() => setAuthType(!authType)}
				/>
			) : (
				<AuthEmail signIn={signIn} onSubmit={(values)=>onSubmit(values)} error={error} />
			);
       return (
					<Login blur={status}>
						<Modal status={status} clicked={tabHandler}>
							<div className={classes.authType}>
								<div className={classes.title}>
									<h3>{authTypeCopy.title}</h3>
									<p>{authTypeCopy.subTitle}</p>
								</div>
								{authContent}
								<p>
									{authTypeCopy.typeSwitch}{' '}
									<span
										onClick={() => setSignIn(!signIn)}
										style={{ color: 'red', cursor: 'pointer' }}>
										{authTypeCopy.switch}
									</span>
								</p>
							</div>
						</Modal>
					</Login>
				);
   }
    
export default Auth;