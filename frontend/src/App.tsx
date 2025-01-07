import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserManagement from './Pages/UserManagement/UserManagement'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <UserManagement /> }/>
    </Routes>
  )
}

export default App
