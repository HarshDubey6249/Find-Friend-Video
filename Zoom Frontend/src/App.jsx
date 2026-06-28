import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import './App.css'
import Authntication from './pages/authntication.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<Authntication/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


