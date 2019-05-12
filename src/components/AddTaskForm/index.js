import React from "react"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Close from "@material-ui/icons/Close"
import withStyles from "@material-ui/core/styles/withStyles"
import IconButton from "@material-ui/core/IconButton"
import SvgIcon from "@material-ui/core/SvgIcon"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import InputBase from '@material-ui/core/InputBase';


const PersonIcon = () => (
  <IconButton aria-label="Person">
    <SvgIcon fontSize="large" style={{marginRight: "16px"}}>
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
    <Typography variant="caption">ASSIGN TO</Typography>
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
  }

  render() {
    const { handleModal, classes } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <Close onClick={handleModal} className={classes.closeIcon} />
          <div>
            <PersonIcon />
          </div>
          <Divider />
          <InputBase placeholder="Add Title" style={{textAlign: "center", width: "100%"}} />
          <Divider />
          <div>Add Due Date</div>
          <div>Add Priority</div>
          <div>Add Description</div>
          <div>Add Assets</div>
          <Button>Cancel</Button>
          <Button>Save</Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AddTaskForm)
