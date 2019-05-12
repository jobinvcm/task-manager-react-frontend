import React from "react"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

import TaskTile from "../components/TaskTile"
import AddTaskForm from "../components/AddTaskForm"

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const styles = theme => ({
  root: {},
  tabWrapper: {
    display: "inline-block",
  },
  buttonWrapper: {
    padding: `${theme.spacing.unit * 2}px`,
    float: "right",
  },
})

class TasksScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, tab: 0 }
    this.handleModal = this.handleModal.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(e, tab) {
    this.setState({ tab })
  }

  handleModal(e) {
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes } = this.props
    const { tab } = this.state
    return (
        <div>
          {/* <AppBar position="static" color="default"> */}
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabWrapper}
          >
            <Tab label="To Do">To Do </Tab>
            <Tab label="Completed">Completed </Tab>
          </Tabs>
          <Button
            className={classes.buttonWrapper}
            onClick={this.handleModal}
            variant="flat"
            color="primary"
            fullWidth={false}
          >
            + New Ticket
          </Button>
          {/* </AppBar> */}
          {tab === 0 && <TabContainer>To Do</TabContainer>}
          {tab === 1 && <TabContainer>Completed</TabContainer>}
          <TaskTile />

          <Modal open={this.state.open}>
            <AddTaskForm handleModal={this.handleModal} />
          </Modal>
        </div>
    )
  }
}

export default withStyles(styles)(TasksScreen)
