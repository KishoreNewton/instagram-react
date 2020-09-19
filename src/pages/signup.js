import React from "react"
import { useSignUpPageStyles } from "../styles"
import SEO from '../components/shared/Seo'
import { TextField, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import FacebookIconBlue from '../images/facebook-icon-blue.svg'
import FacebookIconWhite from '../images/facebook-icon-white.png'
import { LoginWithFacebook } from "./login";

function SignUpPage() {
  const classes = useSignUpPageStyles()

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
          <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
          <div className={classes.orContainer}>
            <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
          </div>
          <form>
            <TextField fullWidth variant="filled" label="Email" margin="dense" className={classes.textField} type="email" autoComplete="email" />
            <TextField fullWidth variant="filled" label="Full Name" margin="dense" className={classes.textField} autoComplete="current-password" />
            <TextField fullWidth variant="filled" label="Username" margin="dense" className={classes.textField} autoComplete="username" />
            <TextField fullWidth type="password" variant="filled" label="Password" margin="dense" className={classes.textField} autoComplete="password" />
            <Button variant="contained" fullWidth color="primary" className={classes.button} type="submit">
              Sign Up
            </Button>
          </form>
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
  )
}

export default SignUpPage;
