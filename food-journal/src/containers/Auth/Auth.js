import React, {Component} from 'react'
import AuthTypeBTNs from '../../components/AuthtypeBTNs/AuthTypeBTNs'
import AuthEmail from '../../components/AuthEmail/AuthEmail';
import Login from '../../hoc/Layout/Login/Login';
import Modal from '../../components/UI/Modal/Modal'
import * as classes from './Auth.module.css'
    
class Auth extends Component{
   state={
		authType: true, 
      signIn: true, 
      status: true
   }
   tabHandler=()=>{
      const curTabStatus = this.state.status
      this.setState({authType: true, status: !curTabStatus})
   }
	authTypeHandler=()=>{
      const curAuthType = this.state.authType
      this.setState({authType: !curAuthType})
	}
   signInHandler = () => {
      const curState= this.state.signIn
      this.setState({signIn: !curState})
   }
    render(){
       let authTypeCopy = this.state.signIn
					? {
							title: 'Welcome Back!',
							subTitle: 'Sign in to keep up the good work!',
							typeSwitch: "Don't have an account?",
							switch: 'Sign Up',
					  }
					: {
							title: 'Welcome Onboard!',
							subTitle: 'Sign up to begin your health transformation!',
							typeSwitch: "Already have an account?",
							switch: 'Sign In',
					  };
      let authContent = this.state.authType ? <AuthTypeBTNs signIn={this.state.signIn} setAuthType={this.authTypeHandler}/> : <AuthEmail signIn={this.state.signIn} />
       return (
					<Login blur={this.state.status}>
						<Modal status={this.state.status} clicked={this.tabHandler}>
							<div className={classes.authType}>
							<div className={classes.title}>
								<h3 >{authTypeCopy.title}</h3>
								<p>{authTypeCopy.subTitle}</p>
							</div>
							{authContent}
							<p>
								{authTypeCopy.typeSwitch}{' '}
								<span
									onClick={this.signInHandler}
									style={{ color: 'red', cursor: 'pointer' }}>
									{authTypeCopy.switch}
								</span>
							</p>
							</div>
						</Modal>
					</Login>
				);
   }
    
};
export default Auth;