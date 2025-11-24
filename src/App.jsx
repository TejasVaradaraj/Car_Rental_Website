import React, {useState} from 'react'
import Navigation_bar from './components/Navigation_bar'
import {useLocation} from 'react-router-dom'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
      {!isOwnerPath && <Navigation_bar setShowLogin={setShowLogin}/>}
    </>
  )
}

export default App