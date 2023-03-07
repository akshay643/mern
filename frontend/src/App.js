import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./Navbar"
import Home from "./Dashboard"
import Profile from "./components/Profile";
import { BrowserRouter as Router,Routes, Route  } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCandidate } from "./store/UserSlice";
import Booking from "./components/booking";
import { fetchCabin } from "./store/CabinSlice";
import PrivateRoutes from "./Utils/PrivateRoutes";
import AdminPage from "./components/AdminPage";
import { fetchTotalBookings } from "./store/TotalBookings";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(fetchCandidate())
  dispatch(fetchCabin())
  dispatch(fetchTotalBookings())

},[])

  return (
    <>
    
    <Router>
    <Routes>
    <Route element={<PrivateRoutes />}>
      <Route exact path="/dashboard" element={<Dashboard />} />
           {/* <Route exact path="/dashboard" element={<React.Suspense fallback={<div class="text-center mt-5"><img src="assets/img/logo.png" alt="" /></div>}><LazyDashboard /></React.Suspense>} />
          <Route exact path="/candidatelist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyCandidateList /></React.Suspense>} />
          <Route exact path="/joblist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyJobList /></React.Suspense>} />
          <Route exact path="/clientlist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyClientList /></React.Suspense>} /> */}
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route  path="/"  element={<Login />} />
      <Route  path="/profile"  element={<Profile />} />
      <Route  path="/admin"  element={<AdminPage />} />
    </Routes>
  </Router>
  </>
  );
}

export default App;
