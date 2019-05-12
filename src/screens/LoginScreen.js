import React from "react"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

import SignInForm from "../components/SignInForm"

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "100vh",
    minWidht: "100vw",
    padding: "5rem 1rem 0 1rem"
  },
  color: {},
  welcomeContainer: {
    paddingBottom: "2rem"
  },
  quoteContainer: {
    textAlign: "left",
    paddingBottom: ".5rem"
  },
  nameContainer: {
    textAlign: "left",
    paddingBottom: "4rem"
  }
})

const LoginScreen = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.welcomeContainer}>
      <Typography component="h1" variant="h3" color="primary">
        Welcome
      </Typography>
    </div>
    <div className={classes.quoteContainer}>
    <Typography component="div" variant="body2" color="primary">
      Our task must be to free ourselves by widening our circle of compassion to
      embrace all living creatures and the whole of nature and its beauty.
    </Typography>
    </div>
    <div className={classes.nameContainer}>

    <Typography component="div" variant="subtitle" color="primary">
      Albert Einstein
    </Typography>
    </div>
    <div>
      <SignInForm />
    </div>
  </div>
)

export default withStyles(styles)(LoginScreen)
