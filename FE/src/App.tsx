import './App.css'
import { DashBoard } from './pages/DashBoard';
import ProtectedRoute from './pages/ProtectedRoute';
import { Signup } from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
