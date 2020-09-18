import React from "react";
import { useSignUpPageStyles } from "../styles";

function SignUpPage() {
  useSignUpPageStyles();

  return (
    <>
    <SEO titel="Login" />
    <section className={classes.section}>
      <article>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} />
          <form>
            <TextField fullWidth variant="filled" label="Username" margin="dense" className={classes.textField} autoComplete="username" />
            <TextField fullWidth variant="filled" label="Password" margin="dense" className={classes.textField} autoComplete="current-password" />
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

export default SignUpPage;
