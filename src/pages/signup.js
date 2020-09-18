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
            <TextField fullWidth variant="filled" label="Email" margin="dense" className={classes.textField} autoComplete="email" />
            <TextField fullWidth variant="filled" label="Password" margin="dense" className={classes.textField} autoComplete="current-password" />
            <TextField fullWidth variant="filled" label="Password" margin="dense" className={classes.textField} autoComplete="current-password" />
            <Button variant="contained" fullWidth color="primary" className={classes.button} type="submit">
              Log In
            </Button>
          </form>
        
          <Button fullWidth color="secondary" >
            <Typography varient="caption" className={classes.forgotPassword}>
                Forgot Password
            </Typography>
          </Button>
        </Card>
        <Card className={classes.signUpCard}>
          <Typography align="right" variant="body2">
              Don't have an Account
          </Typography>
          <Link to="/accounts/emailsignup">
            <Button color="primary" className={classes.signUpButton}>
              Sign Up
            </Button> 
          </Link>
        </Card>
      </article>
    </section>
  </>
  )
}

export default SignUpPage;
