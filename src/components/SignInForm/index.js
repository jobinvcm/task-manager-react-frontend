import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt"
import { Formik } from "formik"
import * as Yup from "yup"

import Firebase from "../../services/Firebase"

const styles = theme => ({
  root: {},
  input: {
    backgroundColor: theme.palette.secondary.contrastText,
    padding: "1rem 0",
    borderRadius: "6px",
  },
  formField: {
    paddingTop: theme.spacing.unit,
  },
  inputProps: {
    marginLeft: "1.5rem",
  },
  error: {
    color: "red",
  },
})
class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { signedIn: "" }
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this)
  }

  onAuthStateChanged() {
    Firebase.auth().onAuthStateChanged(user => {
      if (Firebase.auth().currentUser) {
        Firebase.auth()
          .currentUser.getIdToken(true)
          .then(function(idToken) {
            localStorage.setItem("idToken", idToken)
          })
        localStorage.setItem("uid", user.uid)
      }
    })
  }

  render() {
    const { classes, userState } = this.props
    const { onAuthStateChanged } = this
    const ValidationSchema = Yup.object().shape({
      username: Yup.string()
        .email("Username should be email")
        .required("Username Required"),
      password: Yup.string().required("PasswordRequired"),
    })
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="h6" component="h6" color="primary">
            Sign In
          </Typography>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            Firebase.auth()
              .signInWithEmailAndPassword(values.username, values.password)
              .then(user => {
                onAuthStateChanged()
                userState({ signedIn: true })
              })
              .catch(error =>
                setErrors({
                  username: "Invalid Combination",
                  password: "Invalid password",
                })
              )
          }}
          validationSchema={() => ValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form action="submit">
                <div className={classes.formField}>
                  <Input
                    className={classes.input}
                    placeholder="User Name"
                    name="username"
                    type="email"
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ className: classes.inputProps }}
                    value={values.username}
                    error={!!errors.username}
                  />
                  {errors.username && (
                    <Typography variant="caption" className={classes.error}>
                      {errors.username}
                    </Typography>
                  )}
                </div>
                <div className={classes.formField}>
                  <Input
                    className={classes.input}
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.password}
                    inputProps={{ className: classes.inputProps }}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Submit"
                          onClick={handleSubmit}
                          type="submit"
                        >
                          <ArrowRightAlt />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <Typography variant="caption" className={classes.error}>
                      {errors.password}
                    </Typography>
                  )}
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    )
  }
}

export default withStyles(styles)(SignInForm)
