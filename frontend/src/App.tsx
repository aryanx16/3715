import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Notfound from './pages/Notfound'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'
import AddQuestion from './pages/AddQuestion'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import HeroPage from './pages/Hero'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Route WITHOUT Layout */}
          <Route path='/' element={<HeroPage />} />

          {/* Routes WITH Layout */}
          <Route element={<Layout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/add-question' element={<AddQuestion />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path='*' element={<Notfound />} />

        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  )
}

export default App
