import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserManagement from './Pages/UserManagement/UserManagement'
import UserDetails from './Pages/UserManagement/UserDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <UserManagement /> }/>
      <Route path="/details/:id" element={ <UserDetails/> }/>
    </Routes>
  )
}

export default App