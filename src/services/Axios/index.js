import Axios from "axios"

const url = "http://localhost:9000"
function AxiosPost(url, params) {
  return Axios.post(url, params)
    .then(response => response)
    .catch(error => console.log(error))
}

function getWeeksTasks() {
  return AxiosPost(`${url}/get-weeks-tasks`, {})
}
function getTasksDone() {
  return AxiosPost(`${url}/get-all-tasks-done`, {})
}
function getTasksNotDone() {
  return AxiosPost(`${url}/get-all-tasks-not-done`, {})
}
function getAllContent() {
  return AxiosPost(`${url}/get-all-content`, {
    refName: "priority",
  })
}
function getAllUsers() {
  return AxiosPost(`${url}/get-all-users`, {})
}
function getTodaysTasks() {
  return AxiosPost(`${url}/get-todays-tasks`, {})
}
function checkUserSignedIn() {
  return Axios.post(`${url}/check-user-signed-in`, {
    uid: localStorage.getItem("uid"),
    idToken: localStorage.getItem("idToken"),
  })
}
export {
  AxiosPost,
  getWeeksTasks,
  getTasksDone,
  getTasksNotDone,
  getAllContent,
  getAllUsers,
  getTodaysTasks,
  checkUserSignedIn,
  url,
}
