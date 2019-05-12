import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import logo from "./logo.svg"
import "./App.css"

import LoginScreen from "./screens/LoginScreen"
import TasksScreen from "./screens/TasksScreen"
import SignedIn from "./services/UserStatus"

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Proxima Nova"',
  },
  palette: {
    primary: {
      main: "#D9AE4F",
    },
    secondary: {
      main: "#202531",
    },
  },
})
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {signedIn :'', uid: ''}
    this.setUserStatus = this.setUserStatus.bind(this)
  }

  componentDidMount() {
    const _this = this
    SignedIn().then(response => {
      console.log('response', response)
      _this.setUserStatus(response.data)
    })
  }

  setUserStatus({signedIn}) {
    console.log('setUserState', signedIn)
    this.setState({ signedIn })
  }

  render() {
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <>
          <main>
            {!this.state.signedIn && <LoginScreen userState={this.setUserStatus}/>}
            {this.state.signedIn && <TasksScreen userState={this.setUserStatus} />}
          </main>
        </>
      </MuiThemeProvider>
    )
  }
}

export default App
