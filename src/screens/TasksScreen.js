import React from "react"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

import AxiosPost from "../services/Axios"
import TaskTile from "../components/TaskTile"
import AddTaskForm from "../components/AddTaskForm"
import Firebase from "../services/Firebase"
import Header from "../components/Header"

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
    paddign: "12px",
  },
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
      todoTasks: "",
      doneTasks: "",
      selectedTask: ""
    }
    this.handleModal = this.handleModal.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.signOut = this.signOut.bind(this)
    this.getTodaysTasks = this.getTodaysTasks.bind(this)
    this.getAllTasks = this.getAllTasks.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
  }

  signOut() {
    const _this = this
    Firebase.auth()
      .signOut()
      .then(function() {
        localStorage.removeItem("idToken")
        _this.props.userState(false)
      })
      .catch(error => console.log(error))
  }
  getAllTasks() {
    const _this = this
    AxiosPost("http://localhost:9000/get-all-tasks-done", {}).then(res => {
      if (res && res.data) {
        _this.setState({ doneTasks: res.data })
      }
    })
    AxiosPost("http://localhost:9000/get-all-tasks-not-done", {}).then(res => {
      if (res && res.data) {
        _this.setState({ todoTasks: res.data })
      }
    })
  }
  componentDidMount() {
    const _this = this
    _this.getAllTasks()
    AxiosPost("http://localhost:9000/get-all-content", {
      refName: "priority",
    })
      .then(res => _this.setState({ priorityStates: res.data }))
      .catch(error => console.log(error))
    AxiosPost("http://localhost:9000/get-all-users", {})
      .then(res => _this.setState({ users: res.data }))
      .catch(error => console.log(error))
  }
  getTodaysTasks() {
    const _this = this
    AxiosPost("http://localhost:9000/get-todays-tasks", {})
      .then(res => {
        _this.setState({ doneTasks: res.data.tasksDone })
        _this.setState({ todoTasks: res.data.tasksNotDone })
      })
      .catch(error => console.log(error))
  }
  handleTabChange(e, tab) {
    this.setState({ tab })
  }
  handleModal(task="") {
    const open = this.state.open
    this.setState({ open: !open })
    if (open) {
      this.getAllTasks()
    }
    if ( task && (this.state.selectedTask !== task)) {
        if (this.state.selectedTask.status) {
          const doneTasks = this.state.doneTasks
          doneTasks[task.taskId] = task
          this.setState({ doneTasks: doneTasks })
        } else {
          const todoTasks = this.state.todoTasks
          todoTasks[task.taskId] = task
          this.setState({ todoTasks: todoTasks })
        }
      }
    if(task) {
      this.setState({"selectedTask": task})
    }
  }
  toggleStatus(task) {
    if (task.status) {
      const doneTasks = this.state.doneTasks
      doneTasks[task.taskId].status = !task.status
      this.setState({ doneTasks: doneTasks })
    } else {
      const todoTasks = this.state.todoTasks
      todoTasks[task.taskId].status = !task.status
      this.setState({ todoTasks: todoTasks })
    }
  }

  render() {
    const { classes, userState } = this.props
    const { tab, priorityStates, users, todoTasks, doneTasks } = this.state
    const { getTodaysTasks, handleModal, toggleStatus } = this
    return (
      <div>
        <Header signOut={this.signOut} getTodaysTasks={getTodaysTasks} />
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
          onClick={handleModal}
          color="primary"
          fullWidth={false}
        >
          + New Ticket
        </Button>
        {/* </AppBar> */}

        {tab === 0 && (
          <TabContainer>
            {todoTasks &&
              Object.keys(todoTasks).map(taskId => (
                <TaskTile
                  className={classes.taskTile}
                  task={todoTasks[taskId]}
                  taskId={taskId}
                  toggleTileStatus={toggleStatus}
                  openModal={handleModal}
                />
              ))}
            {!todoTasks && <div>Nothing To Do</div>}
          </TabContainer>
        )}
        {tab === 1 && (
          <TabContainer>
            {doneTasks &&
              Object.keys(doneTasks).map(taskId => (
                <TaskTile
                  className={classes.taskTile}
                  task={doneTasks[taskId]}
                  taskId={taskId}
                  toggleTileStatus={toggleStatus}
                />
              ))}
            {!doneTasks && <div>No Tasks Found</div>}
          </TabContainer>
        )}

        <Modal open={this.state.open}>
          <AddTaskForm
            handleModal={this.handleModal}
            priorityStates={priorityStates}
            users={users}
            taskPassed={this.state.selectedTask}
          />
        </Modal>
        <Button onClick={() => this.signOut()}>Sign Out</Button>
      </div>
    )
  }
}

export default withStyles(styles)(TasksScreen)
