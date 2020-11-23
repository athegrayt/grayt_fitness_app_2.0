import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import { checkValidity } from "../../shared/utility";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: false,
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );

  };

  demoModeHandler = () => {
    this.props.onAuth("test@test.com", "zxcvbnm", this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    if (this.props.loading.true) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error && !this.props.isAuthenticated) {
      const err = this.props.error;
      console.log(err);
      errorMessage = <p>{err.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      errorMessage = null;
      if(this.state.isSignup){
        authRedirect = <Redirect to='/user-info'/>;
      }
      authRedirect = <Redirect to="/food-journal" />;
    }
    let demoBTN = null;
    if (!this.state.isSignup) {
      demoBTN = (
        <Button clicked={this.demoModeHandler} btnType="Danger">
          SIGNIN WITH DEMO
        </Button>
      );
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h1>
          {this.state.isSignup ? "MAKE NEW ACCOUNT" : "SIGNIN TO ACCOUNT"}
        </h1>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        {demoBTN}
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
