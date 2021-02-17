import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import DailyJournal from "../src/containers/DailyJournal/DailyJournal";
import Records from "./containers/Records/Records";
import DailyJournalContext from './context/daily-journal-context'
import UserInfo from "./containers/UserInfo/UserInfo";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Landing from './components/Landing/Landing'




const App =()=> {

  const context = useContext(DailyJournalContext)

  useEffect(()=>{
    context.authCheckState();
  },[]) 
  
    let routes = (
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (context.token) {
      routes = (
        <Switch>
          <Layout>
          <Route
            path="/dashboard"
            component={DailyJournal}
          />
          <Route path="/records" component={Records} />
          {/* <Route path="/user-info" component={UserInfo} /> */}
          <Route path="/logout" component={Logout} />
          <Redirect to="/dashboard" />
          </Layout>
        </Switch>
      );
    }
    return (
      
        <BrowserRouter>
            {routes}
        </BrowserRouter>
     
    );
  
}

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.),
//   };
// };

export default App;
