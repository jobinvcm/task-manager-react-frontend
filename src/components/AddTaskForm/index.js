import React from "react"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Close from "@material-ui/icons/Close"
import withStyles from "@material-ui/core/styles/withStyles"
import IconButton from "@material-ui/core/IconButton"
import SvgIcon from "@material-ui/core/SvgIcon"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import InputBase from "@material-ui/core/InputBase"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Formik } from "formik"
import * as Yup from "yup"

const PersonIcon = () => (
  <IconButton aria-label="Person">
    <SvgIcon fontSize="large" style={{ marginRight: "16px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
          <g opacity="0.5">
            <path
              d="M23 20C25.2 20 27 18.2 27 16C27 13.8 25.2 12 23 12C20.8 12 19 13.8 19 16C19 18.2 20.8 20 23 20ZM14 18V15H12V18H9V20H12V23H14V20H17V18H14ZM23 22C20.3 22 15 23.3 15 26V28H31V26C31 23.3 25.7 22 23 22Z"
              fill="black"
            />
          </g>
        </g>
      </svg>
    </SvgIcon>
  </IconButton>
)

const styles = theme => ({
  root: {
    padding: "10%",
    position: "relative",
  },
  container: {
    padding: theme.spacing.unit,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  closeIcon: {
    float: "right",
  },
})
class AddTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uid: "", anchorEl: null, userMenuOpen: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClose() {
    this.setState({ userMenuOpen: false })
  }
  handleClick(event) {
    console.log(event.currentTarget)
    console.log(event.target)
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ userMenuOpen : !this.state.userMenuOpen})
  };

  componentDidMount() {
    let uid = localStorage.getItem("uid")
    if (uid) {
      this.setState({ uid })
    }
  }

  render() {
    const { handleModal, classes } = this.props
    const { anchorEl, userMenuOpen } = this.state
    const { handleClose, handleClick } = this
    const ValidationSchema = Yup.object().shape({
      uid: Yup.string(),
      title: Yup.string().required("Need A title for this task"),
      dueDate: Yup.date(),
      priority: Yup.string().required("Need a priority level"),
      description: Yup.string(),
    })

    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <Close onClick={handleModal} className={classes.closeIcon} />
          <Formik
            initialValues={{
              uid: "",
              title: "",
              dueDate: "",
              priority: "",
              description: "",
            }}
            onSubmit={(values, { setSubmitting, setErrors }) =>
              console.log(values)
            }
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
              setFieldValue
            }) => {
              console.log(values)
              return (
                <form action="submit">
                  <div>
                    
                    <Button
                      aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <PersonIcon />ASSIGN TO {values.uid && <span>{values.uid}</span>}
                    </Button>
                    <Menu
                      id="simple-menu"
                      name="uid"
                      anchorEl={anchorEl}
                      open={userMenuOpen}
                      onClose={handleClose}
                    >
                      <MenuItem name="uid" onClick={(e) => {handleClick(e); setFieldValue('uid', 'Jobin Mathew')}}>Jobin Mathew </MenuItem>
                      <MenuItem name="uid" onClick={(e) => {handleClick(e); setFieldValue('uid', 'John Doe')}}>John Doe</MenuItem>
                    </Menu>
                  </div>
                </form>
              )
            }}
          </Formik>

          {/* <Divider />
          <InputBase
            placeholder="Add Title"
            style={{ textAlign: "center", width: "100%" }}
          />
          <Divider />
          <div>Add Due Date</div>
          <div>Add Priority</div>
          <div>Add Description</div>
          <div>Add Assets</div> */}
          <Button>Cancel</Button>
          <Button>Save</Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AddTaskForm)
