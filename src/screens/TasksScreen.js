import React from "react"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

import AxiosPost from "../services/Axios"
import TaskTile from "../components/TaskTile"
import AddTaskForm from "../components/AddTaskForm"
import Firebase from "../services/Firebase"

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
  taskTile: {
    paddign: "12px"
  }
})

class TasksScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tab: 0,
      priorityStates: "",
      users: "",
      tasks: "",
    }
    this.handleModal = this.handleModal.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount() {
    const _this = this
    AxiosPost("http://localhost:9000/get-all-content", {
      refName: "/tasks",
    }).then(res => _this.setState({ tasks: res.data }))
    AxiosPost("http://localhost:9000/get-all-content", {
      refName: "priority",
    })
      .then(res => _this.setState({ priorityStates: res.data }))
      .catch(error => console.log(error))
    AxiosPost("http://localhost:9000/get-all-users", {})
      .then(res => _this.setState({ users: res.data }))
      .catch(error => console.log(error))
  }

  handleTabChange(e, tab) {
    this.setState({ tab })
  }

  handleModal() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, userState } = this.props
    const { tab, priorityStates, users, tasks } = this.state
    return (
      <div>
        <Typography variant="h3" component="h1">My Tasks</Typography>
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
          color="primary"
          fullWidth={false}
        >
          + New Ticket
        </Button>
        {/* </AppBar> */}
        {tab === 0 && <TabContainer>To Do</TabContainer>}
        {tab === 1 && <TabContainer>Completed</TabContainer>}
        {Object.keys(tasks).map(taskId => (
          <TaskTile className={classes.taskTile} task={tasks[taskId]} taskId={taskId} />
        ))}
        <Modal open={this.state.open}>
          <AddTaskForm
            handleModal={this.handleModal}
            priorityStates={priorityStates}
            users={users}
          />
        </Modal>
        <Button
          onClick={() =>
            Firebase.auth()
              .signOut()
              .then(function() {
                localStorage.removeItem("idToken")
                userState(false)
              })
              .catch(error => console.log(error))
          }
        >
          Sign Out
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(TasksScreen)
