import React, {useState, useContext, useEffect} from 'react'
import DailyJournalContext from '../../context/global-state-context'
import AuthTypeBTNs from '../../components/AuthtypeBTNs/AuthTypeBTNs'
import AuthEmail from '../../components/AuthEmail/AuthEmail';
import Loading from '../../components/Loading/Loading';
import {signInCopy, signUpCopy} from './authTypeCopy.js'
import Login from '../../hoc/Layout/Login/Login';
import Modal from '../../components/UI/Modal/Modal'
import * as classes from './Auth.module.css'
import {useHistory} from 'react-router-dom'
    
const Auth =(props)=>{
	const context = useContext(DailyJournalContext);
	const {
		error,
		auth,
		loading,
		googleAuth,
		googleAuthData,
		resetError,
	} = context;
   const [authType, setAuthType] = useState(true)
   const [signIn, setSignIn] = useState(true)
   const [curStatus, setCurStatus] = useState(true)
   let history = useHistory()
	let authTypeCopy = signIn ? signInCopy: signUpCopy	
   
	useEffect(()=>{
		googleAuthData()
	}, [])
	
	const tabHandler=()=>{
	  setCurStatus(false)
      setAuthType(true)
	  history.push('/')
	  
   }
	const onSubmit = (values) => {
		const { email, password } = values;
		auth(email, password, !signIn);
	};	
       
      let authContent = authType ? (
				<AuthTypeBTNs
					signIn={signIn}
					googleAuth={googleAuth}
					setAuthType={() => setAuthType(!authType)}
				/>
			) : (
				<AuthEmail signIn={signIn} onSubmit={(values)=>onSubmit(values)} error={error} />
			);
       return (
					<Login blur={curStatus}>
						<Modal status={curStatus} clicked={tabHandler}>
							{loading && <Loading/>}
							{!loading && <div className={classes.authType}>
								<div className={classes.title}>
									<h3>{authTypeCopy.title}</h3>
									<p>{authTypeCopy.subTitle}</p>
								</div>
								{authContent}
								<p>
									{authTypeCopy.typeSwitch}{' '}
									<span
										onClick={() => {
											setSignIn(!signIn)
											resetError()
										}}
										style={{ color: 'red', cursor: 'pointer', fontWeight: '700' }}>
										{authTypeCopy.switch}
									</span>
								</p>
							</div>}
						</Modal>
					</Login>
				);
   }
    
export default Auth;