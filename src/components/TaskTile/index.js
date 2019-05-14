import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CheckCircle from "@material-ui/icons/CheckCircleOutlined"
import IconButton from "@material-ui/core/IconButton"
import SvgIcon from "@material-ui/core/SvgIcon"
import grey from "@material-ui/core/colors/grey"
import AxiosPost from "../../services/Axios"

const CheckCircleCustom = ({ toggleStatus, status, taskId }) => (
  <IconButton
    aria-label="circle"
    style={{ padding: "4px" }}
    onClick={() => toggleStatus(status, taskId)}
  >
    <SvgIcon>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="15.5"
          fill={status ? "#D9AE4F" : "none"}
          stroke={status ? "#fff" : grey[500]}
        />
        <path
          d="M23.5 11.5L13.5 21L9 16.5"
          stroke={status ? "#fff" : grey[500]}
          strokeWidth="1.5"
        />
      </svg>
    </SvgIcon>
  </IconButton>
)

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    margin: "0 12px 12px 12px",
  },
  gridImage: {
    paddingRight: "16px",
  },
  userImage: {
    borderRadius: "50%",
    backgroundColor: "grey",
    height: "50px",
    width: "50px",
  },
  checkIcon: {
    height: "100%",
    float: "right",
  },
})

class TaskTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = { status: "" }
    this.toggleStatus = this.toggleStatus.bind(this)
  }

  toggleStatus(status, taskId) {
    AxiosPost("http://localhost:9000/add-task", {
      refName: `/tasks/${taskId}/status`,
      data: !status,
    })
    this.setState({ status: !status })
  }

  componentDidMount() {
    const { task } = this.props
    this.setState({ status: task.status })
  }

  render() {
    const { classes, task, taskId } = this.props
    const { toggleStatus } = this
    const {status} = this.state
    return (
      <Paper className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={2} className={classes.gridImage}>
            <div className={classes.userImage} />
          </Grid>
          <Grid item xs={6}>
            <div>
              {task.title && (
                <Typography variant="subheading">{task.title}</Typography>
              )}
              {task.dueDate && (
                <Typography variant="caption">{task.dueDate}</Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={4}>
            <CheckCircleCustom
              className={classes.checkIcon}
              status={status}
              taskId={taskId}
              toggleStatus={toggleStatus}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(TaskTile)
