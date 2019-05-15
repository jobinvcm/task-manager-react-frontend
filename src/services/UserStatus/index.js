import { checkUserSignedIn } from "../Axios"

const SignedIn = () => {
  if (localStorage.getItem("idToken")) {
    return checkUserSignedIn()
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
