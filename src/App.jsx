import './App.css'
import Chatroom from './components/Chatroom'
import SignInForm from './components/SignInForm'
import Question from './components/Question'
import { auth, db } from './index'

function App() {

  // console.log(auth, db)

  return (
    <>
      <Question />
      <SignInForm />
      <Chatroom />
    </>
  )
}

export default App
