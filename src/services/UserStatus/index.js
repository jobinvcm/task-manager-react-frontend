import Axios from "axios"

const SignedIn = () => {
  if (localStorage.getItem("idToken")) {
    return Axios.post("http://localhost:9000/check-user-signed-in", {
      uid: localStorage.getItem("uid"),
      idToken: localStorage.getItem("idToken"),
    })
      .then(function(res) {
        return res
      })
      .catch(error => console.log(error))
  } else {
    return new Promise((resolve, reject) => {
      return { data: { signedIn: false } }
    })
  }
}

export default SignedIn
