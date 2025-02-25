import { useState } from "react"
import { auth, db } from "../index"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, getDoc } from "firebase/firestore"

const Chatroom = () => {
  const [user, setUser] = useState(auth.currentUser)
  const [message, setMessage] = useState('')

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(auth.currentUser)
    } else {
      setUser(null)
    }
  })

  async function sendMessage() {
    if (user) {
      console.log('it is working')

      try {
        const docRef = await addDoc(collection(db, 'messages'), {
          userId: user.uid,
          message: message,
          userName: user.displayName,
        })
        console.log(docRef.id, 'this is the doc ref')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          console.log('document data', docSnap.data())
          setMessage('')
          const chatroomMessages = document.querySelector('#chatroom-messages')
          const newDiv = document.createElement('div')
          newDiv.className = 'message'
          newDiv.textContent = docSnap.data().message
          chatroomMessages.append(newDiv)

        } else {
          console.log('no such document exists!')
        }

      } catch (error) {
        const errorCode = error.errorCode
        const errorMessage = error.message

        console.log(errorCode)
        console.log(errorMessage)
      }
    }
  }

  return (
    <div id="chatroom-container">
      <div id="chatroom-messages"></div>
      <div id="chatroom-input-container">
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button id="send-btn" onClick={sendMessage}>Send</button>
      </div>

    </div>
  )
}

export default Chatroom