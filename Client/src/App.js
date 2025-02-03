import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import  Home  from "./pages/home/home";
import  LoginNEW  from "./pages/login/loginnew";
import  RegisterNEW  from "./pages/login/registernew";
import ForgotPassword from "./pages/login/forgotPass";
import { DoctorDash } from "./pages/doctor/DoctorDash";
import  Account  from "./pages/account/account";
import { Notification } from "./pages/notify/notification";
import { Appointments } from "./pages/appointments/appointments";
import { AI } from "./pages/AI/AI";
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from "./context/userContext";
import Logout from "./pages/login/logout";
import ProtectedRoutes from './components/ProtectedRoutes'
import { Error } from "./pages/errors/error";
import ResetPassword from "./pages/login/resetpassword";
import { Search } from "./pages/search/search";
import { DoctorProfile } from "./pages/doctor/DoctorProfile";
import './styles.css';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function App() {
  return (
<UserContextProvider>
    <div className="App">
          
      <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />  {/* Doctor profile page */}

          <Route path="/search" element={<Search />}/>
          <Route path="/login" element={<LoginNEW />} />
          <Route path="/registerNEW" element={<RegisterNEW />} />
          <Route path="/account" element={<Account />} />
          <Route path="/notify" element={<Notification />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/AI" element={<AI />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login/ForgotPassword" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoutes/>}>
          <Route path="/doctor" element={<DoctorDash />} />
          </Route>
          <Route path="/error"element={<Error/>}/>
        </Routes>
      </BrowserRouter>

    </div>
    </UserContextProvider>
  );
}
