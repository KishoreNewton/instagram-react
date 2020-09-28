import React from "react";
import { useLoginPageStyles } from "../styles";
import SEO from '../components/shared/Seo'
import { CardHeader, TextField, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import FacebookIconBlue from '../images/facebook-icon-blue.svg'
import FacebookIconWhite from '../images/facebook-icon-white.png'

function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form>
              <TextField fullWidth variant="filled" label="Username" margin="dense" className={classes.textField} autoComplete="username" />
              <TextField fullWidth variant="filled" label="Password" type="password" margin="dense" className={classes.textField} autoComplete="current-password" />
              <Button variant="contained" fullWidth color="primary" className={classes.button} type="submit">
                Log In
              </Button>
            </form>
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

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles()
  const facebookIcon = iconColor === 'blue' ? FacebookIconBlue: FacebookIconWhite
  return (
    <Button variant={variant} fullWidth color={color}>
      <img src={facebookIcon} alt="Facebook icon" className={classes.facebookIcon} />
      Log In With Facebook
    </Button>
  )
}

export default LoginPage;
