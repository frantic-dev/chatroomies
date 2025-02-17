import './App.css'
import SignInForm from './components/SignInForm'
import { auth, db } from './index'

function App() {

  // console.log(auth, db)

  return (
    <>
    <SignInForm />
    </>
  )
}

export default App
