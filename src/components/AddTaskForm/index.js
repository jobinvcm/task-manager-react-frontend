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
import { InlineDatePicker } from "material-ui-pickers"
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton"
import LinearProgress from "@material-ui/core/LinearProgress"

import MakeId from "../../services/RandomIdGenerator"
import AxiosPost from "../../services/Axios"
import Firebase from "../../services/Firebase"

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

const UploadIcon = () => (
  <SvgIcon style={{ fontSize: "36px", cursor: "pointer" }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="99"
        height="99"
        stroke="black"
        stroke-opacity="0.5"
        stroke-miterlimit="16"
        stroke-dasharray="4 4"
      />
      <path
        d="M51.1395 49.56V58.08H48.8595V49.56H41.1795V47.48H48.8595V39.2H51.1395V47.48H58.8195V49.56H51.1395Z"
        fill="black"
        fill-opacity="0.5"
      />
    </svg>
  </SvgIcon>
)

const PersonIcon = ({ children }) => (
  <IconButton aria-label="Person">
    <SvgIcon style={{ marginRight: "16px", fontSize: "40px" }}>
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
    {children}
  </IconButton>
)

const styles = theme => {
  console.log(theme)
  return {
    root: {
      position: "relative",
      margin: "5%",
      minHeight: "90vh",
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
    this.state = {
      userId: "",
      anchorEl: null,
      anchorElP: null,
      userMenuOpen: false,
      priorityMenuOpen: false,
      openedCalendar: false,
      fileName: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
    this.handleUploadStart = this.handleUploadStart.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleUploadError = this.handleUploadError.bind(this)
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
    this.handleClickP = this.handleClickP.bind(this)
    this.handleCloseP = this.handleCloseP.bind(this)
    this.handleClickP = this.handleClickP.bind(this)
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }
  handleUploadSuccess = (filename, setFieldValue) => {
    this.setState({ progress: 100, isUploading: false })

    Firebase.storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => setFieldValue("fileUrl", url))
  }

  openCalendar() {
    this.setState({ openedCalendar: true })
  }
  handleClose(e) {
    this.setState({ userMenuOpen: false })
  }
  handleCloseP(e) {
    this.setState({ priorityMenuOpen: false })
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
    this.setState({ userMenuOpen: !this.state.userMenuOpen })
  }
  handleClickP(event) {
    this.setState({ anchorElP: event.currentTarget })
    this.setState({ priorityMenuOpen: !this.state.priorityMenuOpen })
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid")
    if (uid) {
      this.setState({ userId: uid })
    }

    if(this.props.taskPassed && this.props.taskPassed.dueDate) {
      this.setState({openedCalendar : true})
    }
  }

  render() {
    const {
      handleModal,
      classes,
      priorityStates,
      users,
      taskPassed,
    } = this.props
    const {
      anchorElP,
      anchorEl,
      userMenuOpen,
      priorityMenuOpen,
      userId,
      openedCalendar,
      progress,
      isUploading,
    } = this.state
    const {
      handleClose,
      handleCloseP,
      handleClick,
      handleClickP,
      openCalendar,
      handleUploadSuccess,
    } = this
    const ValidationSchema = Yup.object().shape({
      uid: Yup.string(),
      title: Yup.string().required("Need A title for this task"),
      dueDate: Yup.date(),
      priority: Yup.string(),
      description: Yup.string(),
    })

    return (
      <Paper className={classes.root}>
        <Formik
          initialValues={{
            createdBy: taskPassed ? taskPassed.createdBy : "",
            uid: taskPassed ? taskPassed.uid : "",
            title: taskPassed ? taskPassed.title : "",
            dueDate: taskPassed ? taskPassed.dueDate : "",
            dueDateTimesamp: taskPassed ? taskPassed.dueDateTimesamp : "",
            priority: taskPassed ? taskPassed.priority : "",
            description: taskPassed ? taskPassed.description : "",
            status: taskPassed ? taskPassed.status : false,
            taskId: taskPassed ? taskPassed.taskId : MakeId(),
            fileUrl: taskPassed ? taskPassed.fileUrl : "",
          }}
          onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
            values.createdBy = userId
            if (values.dueDate) {
              setFieldValue(
                "dueDateTimesamp",
                new Date(values.dueDate).getTime()
              )
            }
            console.log(values)
            AxiosPost("http://localhost:9000/add-task", {
              refName: `/tasks/${values.taskId}`,
              data: values,
            }).then(res => {
            })
            handleModal(values)
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
            setFieldValue,
          }) => {
            console.log(errors)
            return (
              <form action="submit">
                <div>
                  <Button
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    fullWidth
                    style={{ justifyContent: "left", textAlign: "left" }}
                  >
                    <PersonIcon />
                    {values.uid && (
                      <span>
                        <Typography variant="caption" color="disabled">
                          ASSIGNED TO
                        </Typography>
                        <Typography variant="subtitle1">
                          {users[values.uid].name}
                        </Typography>
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
                    {Object.keys(users).map(uid => (
                      <MenuItem
                        name="uid"
                        onClick={e => {
                          handleClick(e)
                          setFieldValue("uid", uid)
                        }}
                      >
                        {users[uid].name}
                      </MenuItem>
                    ))}
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
                    error={errors.title && touched.title}
                  />
                  {errors.title && touched.title && (
                    <Typography
                      align="center"
                      variant="caption"
                      style={{ color: "red" }}
                    >
                      {errors.title}
                    </Typography>
                  )}
                  <Grid
                    className={classes.gridItems}
                    container
                    spacing={0}
                    style={{ padding: "0 8px" }}
                  >
                    <Grid item xs={5}>
                      {!openedCalendar && (
                        <Button
                          onClick={openCalendar}
                          style={{ paddingBottom: 0, verticalAlign: "sub" }}
                        >
                          <Typography variant="caption">
                            Add Due Date
                          </Typography>
                        </Button>
                      )}
                      {openedCalendar && (
                        <InlineDatePicker
                          onlyCalendar
                          label="Due Date"
                          value={values.dueDate ? values.dueDate : new Date()}
                          onChange={e => {
                            setFieldValue("dueDate", new Date(e).toDateString())
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={5}>
                      <Button
                        aria-owns={anchorElP ? "priority-menu" : undefined}
                        aria-haspopup="true"
                        onClick={handleClickP}
                        fullWidth
                        style={{ padding: 0, justifyContent: "left" }}
                      >
                        <Typography variant="caption" align="left" fullWidth>
                          Add Priority
                        </Typography>
                      </Button>

                      <Menu
                        id="priority-menu"
                        name="priority"
                        anchorEl={anchorElP}
                        open={priorityMenuOpen}
                        onClose={handleCloseP}
                      >
                        {Object.keys(priorityStates).map(keyName => (
                          <MenuItem
                            name="priority"
                            key={priorityStates[keyName].name}
                            onClick={e => {
                              handleClickP(e)
                              setFieldValue(
                                "priority",
                                priorityStates[keyName].name
                              )
                            }}
                          >
                            {priorityStates[keyName].name}
                          </MenuItem>
                        ))}
                      </Menu>
                      {values.priority && (
                        <Typography variant="body2">
                          {values.priority}
                        </Typography>
                      )}
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
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{ padding: "16px 0 0 16px" }}
                      >
                        Description
                      </Typography>
                      <InputBase
                        name="description"
                        value={values.description}
                        onChange={e =>
                          setFieldValue("description", e.target.value)
                        }
                        placeholder={"Add Description"}
                        multiline
                        fullWidth
                        style={{ padding: "16px", minHeight: "10vh" }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <CustomUploadButton
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={Firebase.storage().ref(`images`)}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={filename => {
                        handleUploadSuccess(filename, setFieldValue)
                      }}
                      onProgress={this.handleProgress}
                      style={{ paddingLeft: "8px", paddingBottom: "40px" }}
                    >
                      {!values.fileUrl && <UploadIcon />}
                      {!!values.fileUrl && (
                        <div
                          style={{
                            height: "44px",
                            width: "44px",
                            overflow: "hidden",
                            position: "relative",
                            marginLeft: "8px",
                            backgroundImage: `url(${values.fileUrl})`,
                            backgroundSize: "cover",
                          }}
                        />
                      )}
                    </CustomUploadButton>
                  </Grid>
                  {isUploading && (
                    <div
                      style={{ flexGrow: 1, minHeight: "4px", padding: "8px" }}
                    >
                      <LinearProgress variant="determinate" value={progress} />
                      <span>progress</span>
                    </div>
                  )}
                </Grid>

                <Divider />
                <div style={{ position: "absolute", right: "0", bottom: "0" }}>
                  <Button onClick={handleModal}>Cancel</Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={this.state.isUploading}
                  >
                    Save
                  </Button>
                </div>
              </form>
            )
          }}
        </Formik>
      </Paper>
    )
  }
}

export default withStyles(styles)(AddTaskForm)
