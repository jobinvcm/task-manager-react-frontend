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
import Grid from "@material-ui/core/Grid"
import { Formik } from "formik"
import * as Yup from "yup"

import MakeId from "../../services/RandomIdGenerator"
import AxiosPost from "../../services/Axios"

const CheckCircleCustom = ({ color, setFieldValue, value }) => (
  <IconButton
    aria-label="circle"
    style={{ padding: "4px" }}
    onClick={() => setFieldValue("status", !value)}
  >
    <SvgIcon>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15.5" fill="white" stroke={color} />
        <path d="M23.5 11.5L13.5 21L9 16.5" stroke={color} strokeWidth="1.5" />
      </svg>
    </SvgIcon>
  </IconButton>
)

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

const styles = theme => {
  return {
    root: {
      position: "relative",
    },
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    closeIcon: {
      float: "right",
    },
    titleInput: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
    titleBase: {
      textAlign: "center",
    },
    gridItems: {
      flexGrow: 1,
    },
  }
}
class AddTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userId: "", anchorEl: null, userMenuOpen: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClose() {
    this.setState({ userMenuOpen: false })
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
    this.setState({ userMenuOpen: !this.state.userMenuOpen })
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid")
    if (uid) {
      console.log(uid)
      this.setState({ userId: uid })
    }
  }

  render() {
    const { handleModal, classes } = this.props
    const { anchorEl, userMenuOpen, userId } = this.state
    const { handleClose, handleClick } = this
    console.log("userId", userId)
    const ValidationSchema = Yup.object().shape({
      uid: Yup.string(),
      title: Yup.string().required("Need A title for this task"),
      dueDate: Yup.date(),
      priority: Yup.string().required("Need a priority level"),
      description: Yup.string(),
    })
    console.log(userId)

    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <Close onClick={handleModal} className={classes.closeIcon} />
          <Formik
            initialValues={{
              createdBy: "",
              uid: "",
              title: "",
              dueDate: "",
              priority: "",
              description: "",
              status: false,
              taskId: MakeId(),
            }}
            onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
              values.createdBy = userId
              AxiosPost("http://localhost:9000/add-task", {
                refName: `/tasks/${values.taskId}`,
                data: values,
              })
            }}
            // validationSchema={() => ValidationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => {
              return (
                <form action="submit">
                  <div>
                    <Button
                      aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <PersonIcon />
                      {values.uid && (
                        <span>
                          <Typography variant="caption">ASSIGNED TO</Typography>
                          <Typography variant="body2">{values.uid}</Typography>
                        </span>
                      )}
                      {!values.uid && (
                        <span>
                          <Typography variant="caption">ASSIGN TO</Typography>
                        </span>
                      )}
                    </Button>
                    <Menu
                      id="simple-menu"
                      name="uid"
                      anchorEl={anchorEl}
                      open={userMenuOpen}
                      onClose={handleClose}
                    >
                      <MenuItem
                        name="uid"
                        onClick={e => {
                          handleClick(e)
                          setFieldValue("uid", "Jobin Mathew")
                        }}
                      >
                        Jobin Mathew{" "}
                      </MenuItem>
                      <MenuItem
                        name="uid"
                        onClick={e => {
                          handleClick(e)
                          setFieldValue("uid", "John Doe")
                        }}
                      >
                        John Doe
                      </MenuItem>
                    </Menu>
                    <Divider />
                    <InputBase
                      name="title"
                      onChange={handleChange}
                      placeholder={"Add Title"}
                      value={values.title}
                      fullWidth
                      className={classes.titleInput}
                      inputProps={{ className: classes.titleBase }}
                    />
                    <Grid className={classes.gridItems} container spacing={16}>
                      <Grid item xs={5}>
                        <InputBase
                          name="dueDate"
                          onChange={handleChange}
                          placeholder="Due Date"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <InputBase
                          name="status"
                          onChange={handleChange}
                          placeholder="status"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CheckCircleCustom
                          fontSize="large"
                          color={values.status ? "#D9AE4F" : "#CCCCCC"}
                          setFieldValue={setFieldValue}
                          value={values.status}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Typography variant="body2">Description</Typography>
                    <InputBase
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      placeholder={"Add Description"}
                      multiline
                    />
                  </div>
                  <Divider />
                  <Button>Cancel</Button>
                  <Button
                    onClick={e => {
                      handleSubmit(e)
                      handleModal(e)
                    }}
                  >
                    Save
                  </Button>
                </form>
              )
            }}
          </Formik>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AddTaskForm)
