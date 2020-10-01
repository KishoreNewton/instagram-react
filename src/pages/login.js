import React, { useContext, useState } from 'react';
import { useLoginPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
<<<<<<< HEAD
import {
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
=======
import { CardHeader, InputAdornment, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom';
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FacebookIconBlue from '../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../images/facebook-icon-white.png';
import { AuthContext } from '../auth';
<<<<<<< HEAD
import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_USER_EMAIL } from '../graphql/queries';

function LoginPage() {
  const classes = useLoginPageStyles();
  const { logInWithEmailAndPassword } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState } = useForm({
    mode: 'onBlur',
  });
  const [showPassword, setPassword] = useState(false);
  const [error, setError] = useState('');
  const hasPassword = Boolean(watch('password'));
  const client = useApolloClient();

  async function onSubmit(data) {
    if (!isEmail(data.input)) {
      data.input = await getUserEmail(data.input);
    }
    try {
      await logInWithEmailAndPassword(data.input, data.password);
      window.location = '/';
    } catch (error) {
      handleError(error);
    }
  }

  async function getUserEmail(input) {
    const variables = { input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables,
    });
    return response.data.users[0]?.email || 'no@notfound.com';
  }

  function handleError(error) {
    if (error.code.includes('auth')) setError(error.message);
  }

  function togglePasswordVisiblity() {
    setPassword((prev) => !prev);
  }
=======

function LoginPage() {
  const classes = useLoginPageStyles();
  const { logInWithEmailAndPassword } =  useContext(AuthContext)
  const { register, handleSubmit, watch, formState } = useForm({ mode: 'onBlur' })
  const [showPassword, setPassword] = useState(false)
  const hasPassword = Boolean(watch('password'))
  const history = useHistory()
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  async function onSubmit(data) {
    await logInWithEmailAndPassword(data.input, data.password)
    history.push('/')
  }

  function togglePasswordVisiblity() {
    setPassword(prev => !prev)
  }
  
  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
<<<<<<< HEAD
                  minLength: 5,
=======
                  minLength: 5
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                })}
                name="input"
                variant="filled"
                label="Phone Number, username or email"
                margin="dense"
                className={classes.textField}
                autoComplete="usrname"
              />
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
<<<<<<< HEAD
                  minLength: 5,
=======
                  minLength: 5
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                })}
                name="password"
                InputProps={{
                  endAdornment: hasPassword && (
                    <InputAdornment>
<<<<<<< HEAD
                      <Button onClick={togglePasswordVisiblity}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                label="Password"
                type={showPassword ? 'text' : 'password'}
=======
                      <Button onClick={togglePasswordVisiblity}>{showPassword ? "Hide" : "Show"}</Button>
                    </InputAdornment>
                  )
                }}
                variant="filled"
                label="Password"
                type={showPassword ? "text" : "password"}
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
<<<<<<< HEAD
                disabled={
                  !formState.isValid || formState.isSubmitting
                }
=======
                disabled={!formState.isValid || formState.isSubmitting}
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <AuthError error={error} />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography
                varient="caption"
                className={classes.forgotPassword}
              >
                Forgot Password
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an Account
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button
                color="primary"
                className={classes.signUpButton}
              >
                Sign Up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
<<<<<<< HEAD
}

function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align="center"
        gutterBottom
        variant="body2"
        style={{ color: 'red' }}
      >
        {error}
      </Typography>
    )
  );
}

export function LoginWithFacebook({ color, iconColor, variant }) {
  // const loginWithFacebook = useContext(AuthContext);
  const classes = useLoginPageStyles();
  const facebookIcon =
    iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

  async function onFacebook() {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then(function (result) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
  }

  return (
    <Button
      onClick={onFacebook}
      variant={variant}
      fullWidth
      color={color}
    >
=======
}

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const facebookIcon =
    iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;
  return (
    <Button variant={variant} fullWidth color={color}>
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
      <img
        src={facebookIcon}
        alt="Facebook icon"
        className={classes.facebookIcon}
      />
      Log In With Facebook
    </Button>
  );
}

export default LoginPage;
