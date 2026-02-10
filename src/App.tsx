import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketingPage from "./pages/MarketingPage";
import {SignIn} from "./pages/login";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
// import link from
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingPage/>} />
         <Route path="/login" element={<SignIn/>} />
        <Route path="/register" element={<SignUp/>} /> 
        <Route path="/Dashboard" element={<Dashboard/>} /> 
        <Route path="/pymont" element={<Checkout/>} /> 
      </Routes>
    </BrowserRouter>
  );
}
