import { Routes,Route } from "react-router-dom"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import AuthLayout from "./layouts/AuthLayout"

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App