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
import CategoryComponent from './components/category/CategoryComponent'
import CategoryListComponent from './components/category/CategoryListComponent'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element = {<HomePage />} ></Route>
      <Route path='/about' element = {<About />} ></Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

      <Route element={<AuthWrapper allowedRoles={["ROLE_ADMIN"]} />}>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/categories" element={<CategoryComponent />} />
      </Route>

               
      <Route element={<AuthWrapper allowedRoles={["ROLE_USER"]} />}>
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/user-dashboard/categories" element={<CategoryListComponent />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      

      </Routes>
    </Router>
  )
}

export default App
