import './App.css'
import HomePage from './components/HomePage/HomePage'
import About from './components/About/About'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AuthWrapper from './components/security/AuthWrapper'
import AdminDashboard from './components/Admin/AdminDashboard'
import UserDashboard from './components/User/UserDashboard'
import Unauthorized from './components/Unauthorization/Unauthorized'
import ProductDetail from './components/Product/ProductDetail'
import ProductList from './components/Product/ProductList'


function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element = {<HomePage />} ></Route>
      <Route path='/about' element = {<About />} ></Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<AuthWrapper allowedRoles={["ROLE_ADMIN"]} />}>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

               
      <Route element={<AuthWrapper allowedRoles={["ROLE_USER"]} />}>
      <Route path="/user-dashboard" element={<UserDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      </Routes>
    </Router>
  )
}

export default App
