import React, { useContext, useState } from 'react';
<<<<<<< HEAD
=======
import { useHistory } from 'react-router-dom';
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
import { useSignUpPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
import {
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { LoginWithFacebook } from './login';
import { AuthContext } from '../auth';
import { HighlightOff, CheckCircleOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from '@apollo/react-hooks';
<<<<<<< HEAD
import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries.js';
=======
import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries.js'
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
  });
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
<<<<<<< HEAD
  const [error, setError] = useState('');
  const client = useApolloClient();

  async function onSubmit(data) {
    try {
      setError('');
      await signUpWithEmailAndPassword(data);
      window.location = '/';
    } catch (error) {
      handleError(error);
=======
  const history = useHistory();
  const [error, setError] = useState('');
  const client = useApolloClient()

  async function onSubmit(data) {
    try {
      setError('')
      await signUpWithEmailAndPassword(data);
      history.push('/');
    } catch (error) {
      handleError(error)
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
    }
  }

  function handleError(error) {
<<<<<<< HEAD
    if (error.message.includes('users_username_key')) {
      setError('Username already taken');
    } else if (error.code.includes('auth')) {
      setError(error.message);
=======
    if(error.message.includes("users_username_key")) {
      setError('Username already taken')
    } else if (error.code.includes('auth')) {
      setError(error.message)
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
    }
  }

  async function validateUsername(username) {
<<<<<<< HEAD
    const variables = { username };
    const response = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables,
    });
    return response.data.users.length === 0;
=======
    const variables = { username }
    const response = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables
    })
    return response.data.users.length === 0
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
  }

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline
        style={{ color: 'green', height: 30, width: 30 }}
      />
    </InputAdornment>
  );

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends
            </Typography>
            <LoginWithFacebook
              color="primary"
              iconColor="white"
              variant="contained"
            />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="email"
                inputRef={register({
                  required: true,
                  validate: (input) => isEmail(input),
                })}
                InputProps={{
                  endAdornment: errors.email
                    ? errorIcon
                    : formState.touched.email && validIcon,
                }}
                fullWidth
                variant="filled"
                label="Email"
                margin="dense"
                className={classes.textField}
                type="email"
                autoComplete="email"
              />
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 4,
                  maxLength: 25,
                })}
                InputProps={{
                  endAdornment: errors.name
                    ? errorIcon
                    : formState.touched.name && validIcon,
                }}
                name="name"
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
                autoComplete="fullname"
              />
              <TextField
                name="username"
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 25,
                  pattern: /^[a-zA-Z0-9_.]*$/,
<<<<<<< HEAD
                  validate: async (input) =>
                    await validateUsername(input),
=======
                  validate: async (input) => await validateUsername(input)
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                })}
                InputProps={{
                  endAdornment: errors.username
                    ? errorIcon
                    : formState.touched.username && validIcon,
                }}
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                inputRef={register({
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                InputProps={{
                  endAdornment: errors.password
                    ? errorIcon
                    : formState.touched.password && validIcon,
                }}
                fullWidth
                type="password"
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="password"
              />
              <Button
                disabled={
                  !formState.isValid || formState.isSubmitting
                }
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <AuthError error={error} />
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an Account
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
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

export default SignUpPage;
