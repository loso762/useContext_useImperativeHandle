import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auto-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@' && '.')};
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@' && '.') };
  }
  return { value: "", isValid: false };
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value : action.val , isValid : action.val.trim().length>6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value : state.value , isValid : state.value.trim().length>6 }
  }
  return { value: "", isValid: false };
}

const Login = (props) => {

  const { loginHandler } = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: null });


  const emailChangeHandler = (e) => {
    dispatchEmail({type:"USER_INPUT", val : e.target.value });

    // setFormIsValid( emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({type:"USER_INPUT" , val : e.target.value});

    // setFormIsValid( emailState.isValid && passwordState.isValid );
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => { 
    const identifier = setTimeout(() => {
      setFormIsValid( passwordIsValid && emailIsValid );
    }, 500)
    
    return () => {
      clearTimeout(identifier);
    }

  }, [emailIsValid, passwordIsValid])

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      loginHandler(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }

  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="password"
          type="password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
