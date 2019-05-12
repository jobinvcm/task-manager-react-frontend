import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import logo from "./logo.svg"
import "./App.css"

import LoginScreen from "./screens/LoginScreen"
import TasksScreen from "./screens/TasksScreen"

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
  }

  render() {
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <>
          <header>Header</header>
          <main>
            <LoginScreen />
          </main>
        </>
      </MuiThemeProvider>
    )
  }
}

export default App
