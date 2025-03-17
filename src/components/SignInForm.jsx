import { signInAnonymously, updateProfile, signOut, onAuthStateChanged, getAuth } from "firebase/auth"
import { auth } from "../index"
import { useState } from "react"
import Button from './Button';

const SignInForm = () => {

  const [user, setUser] = useState(auth.currentUser)

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(auth.currentUser)
    } else {
      setUser(null)
    }
  })


  function signIn(e) {
    // prevent default page reload 
    e.preventDefault()
    const usernameInput = document.querySelector('form input')

    // sign in if user input is not empty
    if (usernameInput.value !== '') {
      console.log(usernameInput.value)

      signInAnonymously(auth).then(async (result) => {
        console.log('logged in anonymously')
        // assign display name to user
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

  function signOutUser() {

    // sign out user
    signOut(auth).then(() => {
      console.log('signed out successfully')
      // update user state to null
    }).catch((error) => {
      const errorCode = error.errorCode
      const errorMessage = error.message

      console.log(errorCode)
      console.log(errorMessage)
    })
  }

  function Form() {
    return (
      <form>
        <label htmlFor="username"> Username
          <input type="text" id="username" />
        </label>
        <Button onClick={signIn}>Sign In</Button>
      </form>

    )

  }

  return (
    <div id='signin-form'>
      {/* show sign in form if there is no current user and show sign out button if user is logged in */}
      {user === null ? <Form /> : <Button onClick={signOutUser}>Sign out</Button>
      }

    </div>

  )
}

export default SignInForm