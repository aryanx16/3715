import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

import Notfound from './pages/Notfound'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'
import AddQuestion from './pages/AddQuestion'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add-question' element={<AddQuestion/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/*' element={<Notfound/>}/>

      </Routes>
      </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
