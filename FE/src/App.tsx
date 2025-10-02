import { ToastContainer } from 'react-toastify';
import './App.css'
import { DashBoard } from './pages/DashBoard';
import ProtectedRoute from './pages/ProtectedRoute';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';





function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
       <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
