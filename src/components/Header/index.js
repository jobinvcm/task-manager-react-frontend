import React from "react"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Close from "@material-ui/icons/Close"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"

const styles = {
  modalPaper: {
    minHeight: "100%",
    minWidth: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1000,
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    const { open } = this.state
    this.setState({ open: !open })
  }
  render() {
    const { open } = this.state
    const { handleClick } = this
    const { classes, signOut, getTodaysTasks } = this.props

    return (
      <div>
        <div>
          <Grid container spacing={0}>
            <Grid item xs={10} style={{ padding: "16px 8px" }}>
              <Typography variant="h3" component="h1">
                My Tasks
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ padding: "16px 8px" }}>
              <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                style={{ float: "right" }}
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
        <div>
          {open && (
            <Paper className={classes.modalPaper}>
              <div>
                <IconButton fullWidth onClick={handleClick}>
                  <Close className={classes.closeIcon} />
                </IconButton>
              </div>
              <div>
                <div>
                  <Typography
                    fullWidth
                    style={{ padding: "16px" }}
                    align="center"
                    variant="h3"
                    component="h2"
                  >
                    My Tasks
                  </Typography>
                  <Divider />
                  <Button fullWidth onClick={() => {getTodaysTasks(); handleClick();}}>
                    TODAY
                  </Button>
                  <Divider />
                  <Button fullWidth onClick={signOut}>
                    LOG OUT
                  </Button>
                </div>
              </div>
            </Paper>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
