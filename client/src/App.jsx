import './App.css'
import {  Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import axios from 'axios'
import {UserContextProvider} from "./Usercontext";
import RegisterPage from './pages/auth_Pages/registerPage';
import LoginPage from './pages/auth_Pages/loginPage';
import {WritePage} from './pages/writePage';
import { CheakPage } from './pages/cheak';
import { AccountPage } from './pages/accountPage';
import { SingleBlogPage } from './pages/singleblogpage';
import { EditPage } from './pages/editPage';
import { EditProfilePage } from './pages/editProfilePage';
function App() {
    axios.defaults.baseURL = "http://localhost:5000"
    axios.defaults.withCredentials = true
  return (
    <UserContextProvider>
        <Routes>
          <Route path = "/" element = {<LandingPage />} />
          <Route path = "/register" element = {<RegisterPage />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path='/write' element = {<WritePage />} />
          <Route path='/check/:id' element = {<CheakPage />} />
          <Route path='/account/:id' element = {<AccountPage />} />
          <Route path='/blog/:id' element = {<SingleBlogPage />} />
          <Route path='/blog/edit/:id' element={<EditPage />} />
          <Route path='/edit/:id' element = {<EditProfilePage />} />
        </Routes>
    </UserContextProvider>
  )
}

export default App
