// import { Routes, Route, Outlet, useLocation } from "react-router-dom"
import React from "react";
// import { Link } from "react-router-dom";
import './NavBar.css'
import About from "../about/about";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {setSelectedTrip} from '../../Services/features/RequestTripSlice/RequestTripeSlice';
import List from "../List/list";
import { useEffect } from "react";
// import { setTimeout } from "timers/promises";
import { getCookie } from 'react-use-cookie';
import { setUserIdCookies } from '../../Services/features/UserLogin/userSlice';
export default function NavBar()
{  
  const userIdFromCookie = getCookie('Mail');

      
    const newUserId = useSelector((state) => state?.user?.UserCookies);
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      if (Object.keys(userIdFromCookie)?.length === 0 && userIdFromCookie) {
        dispatch(setUserIdCookies(JSON.parse(userIdFromCookie)));
      }
      console.log(userIdFromCookie.Mail);
      if(userIdFromCookie.trim()=='tripyaeleden@gmail.com')
      {
          document.getElementById("add").style.display = "flex";
          document.getElementById("mytrip").style.display = "none";
 
      }
      else{
             document.getElementById("add").style.display = "none";
             document.getElementById("mytrip").style.display = "flex";
      }
    }, []);
    const navigate= useNavigate();
    // let p=useLocation();

   

    return (
      <>
        {/* <Router> */}
          <div className="class_all">
          <div>
          <Link to="/"   onClick={()=>navigate('/')}><img className="img-logo"  src="/assets/logo.png"/></Link>
          
          </div> 
          <ul className="ul_navbar">
     
          {/* <li>
          <Link to="login">התחברות</Link>
          </li>  */}
                    <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>
          <Link to="/List" onClick={()=>navigate('/List')}>טיולים</Link>
          </li>
          <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
</svg>
          <Link to="/PlantTrip" onClick={()=>navigate('/List')}>הצעות טיולים</Link>
          </li>

          <li id="add">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"/>
</svg>
          <Link  to="/manager" onClick={()=>navigate('/manager')}>ניהול האתר</Link>
          </li> 

          <li>


          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
</svg><Link to="/Terms" onClick={()=>navigate('/Terms')}><p>תקנון האתר</p></Link>
          </li>

          <li >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-megaphone" viewBox="0 0 16 16">
  <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z"/>
</svg><Link to="/about" onClick={()=>navigate('/about')}>אודות</Link>
          </li> 
          
    
        <li>
       <Link  to="/concat" onClick={()=>navigate('/concat')}><img className="img-person" src="/assets/multiple-users-silhouette.png"></img> <p>צור קשר</p></Link>
        </li>
          <li id="mytrip">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg><Link  to="/mytrip" onClick={()=>navigate('/mytrip')}>אזור אישי</Link>
          </li>
          

          </ul>
            {/* <Routes>
                  <Route exact path='/About' element={< About />}></Route>
                  <Route exact path='/List' element={< List />}></Route>
           </Routes> */}
           </div>
        {/* </Router> */}
     
        </>
    );
  
}