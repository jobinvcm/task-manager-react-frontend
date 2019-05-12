import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt"

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
})
class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: "", password: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    console.log("handle bumit")
    var _this = this
    console.log(_this)
    
  }

  render() {
    const { handleChange, handleSubmit } = this
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="h6" component="h6" color="primary">
            Sign In
          </Typography>
        </div>
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
            />
          </div>
          <div className={classes.formField}>
            <Input
              className={classes.input}
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              fullWidth
              inputProps={{ className: classes.inputProps }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Submit" onClick={handleSubmit}>
                    <ArrowRightAlt />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(SignInForm)
