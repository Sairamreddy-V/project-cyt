import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Home from './components/Home'
import './App.css';

const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
  </BrowserRouter>
)

export default App;
