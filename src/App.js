import logo from './logo.svg';
import './App.css';
import * as React from "react";
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import PlantTrip from './Components/PlantTrip/PlantTrip'
import DetailseGroupTrip from './Components/DetailseGroupTrip/DetailseGroupTrip'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Concat from './Components/Concat/Concat';
import List from './Components/List/list';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/login'
import TripeSite from './Components/TripSite/TripSite'
import MyTrip from './Components/mytrips/mytrips'
import Terms from './Components/Terms/Terms'
import About from './Components/about/about';
import Home from './Components/Widgets/Home';
import FormTeam from './Components/FormTeam/FormTeam';
import Manager from './Components/manager/manager';
import SuccsessAddRequest from './Components/SuccsessAddRequest/SuccsessAddRequest';
// import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import { getCookie } from 'react-use-cookie';
import { setUserIdCookies } from './Services/features/UserLogin/userSlice';
import Pay from './pay';

//import { useHistory } from 'react-router-dom';
// function LoginUser(){
// //const history = useHistory();
// }
function App() {

  const userIdFromCookie = getCookie('User');
  const newUserId = useSelector((state) => state?.user?.UserCookies);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (Object.keys(newUserId)?.length === 0 && userIdFromCookie) {
      dispatch(setUserIdCookies(JSON.parse(userIdFromCookie)));
    }
  }, []);

  return (
    <main className='app'>
      <div className='body_page'>
        {/* <List/> */}
        <Router>
          {userIdFromCookie && <NavBar />}
          {/* <NavBar></NavBar> */}
          <div className='trips-body-wrapper'>
            <Routes>
              {<Route path='' element={<Navigate to={userIdFromCookie ? "/home" : "login"} />} />}
              {<Route path='/' element={<Navigate to={userIdFromCookie ? "/home" : "login"} />} />}
              <Route path='About' element={<About />}></Route>
              <Route path='home' element={userIdFromCookie ? <Home /> : <Navigate to="/login" />} />
              <Route path='List' element={<List />} >
                <Route path='TripeSite/:id' element={<TripeSite />}></Route></Route>
              <Route path='concat' element={<Concat />}> </Route>
              <Route path='DetailseGroupTrip' element={<DetailseGroupTrip />}></Route>
              <Route path='PlantTrip' element={<PlantTrip />}></Route>
              <Route path='FormTeam' element={<FormTeam />}>  </Route>
              <Route path='Pay' element={<Pay />}></Route>
              <Route path='manager' element={<Manager />}></Route>
              <Route path='manager' element={<Manager />}></Route>
              <Route path='Terms' element={<Terms />}>
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='mytrip' element={<MyTrip />}></Route>
            </Routes>
          </div>
        </Router>
        
        {/* {cookies.Name&& <NavBar/>} */}

      </div>

    </main>
  );
}

export default App;
