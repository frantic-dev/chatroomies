import { signInAnonymously, updateProfile } from "firebase/auth"
import { auth } from "../index"

const SignInForm = () => {

  function signIn(e) {
    const usernameInput = document.querySelector('form input')

    e.preventDefault()
    console.log('its working')

    if (usernameInput.value !== '') {
      console.log(usernameInput.value)

      signInAnonymously(auth).then(async (result) => {
        console.log('logged in anonymously?')
        console.log(result)
        console.log(result.user)
        await updateProfile(result.user, {
          displayName: usernameInput.value
        })
      }).catch((error) => {
        const errorCode = error.errorCode
        const errorMessage = error.message

        console.log(errorCode)
        console.log(errorMessage)
      })
    }

  }

  return (
    <form>
      <label htmlFor="username"> Username
        <input type="text" id="username" />
      </label>
      <button onClick={signIn}>Submit</button>
    </form>
  )
}

export default SignInForm