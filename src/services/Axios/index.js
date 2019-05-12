import Axios from "axios"

function AxiosPost(url, params) {
  return Axios.post(url, params)
    .then(response => response)
    .catch(error => console.log(error))
}

export default AxiosPost
