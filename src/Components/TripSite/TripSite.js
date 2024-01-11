import { useState,useEffect } from "react"
import React from "react"
import axios from 'axios';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { GetTripSiteByCode } from '../../Services/features/TripeSite/TripeSiteSlice'
import { useSelector, useDispatch } from 'react-redux'
import './Tripesite.css'
export  default function TripeSite()
{  
    let navigate=useNavigate();
      let trip=useParams()
    let [TripArray, setTripArray] = useState({})
    let Trip
    const users = useSelector((state) => state?.TripeSite?.entities);
    const dispatch = useDispatch();
    const UpdateTrip=(TripArray)=>{
      setTripArray(TripArray)
    
}
    useEffect(() => {
      dispatch(GetTripSiteByCode({code:trip.id, callBack:UpdateTrip}));
        //  axios.get('http://localhost:55689/api/tripsite').then((res) => {
        //      //לכאן יכנס רק אם הצליחה הקריאה - then  -
 
        //      //  הפעולות שיקרו אחרי שהקריאה חוזרת
        //      setTripArray(res.data.find(i=>i.Code==trip.id))

        //  })
     }, [])
     const handleSubmit = event => {
        event.preventDefault();
    
        // 👇️ redirect to /contacts
        navigate('/DetailseGroupTrip',{selecttrip:trip.selecttrip});
       
      };

   
    return(<div className="trip_div"> 
     {/* <img src={`./assets/${TripArray.Img}`}/> */}
     {TripArray && TripArray.SiteName &&<h2>{TripArray.SiteName}</h2>}
     {TripArray && TripArray.Description &&<h3>{TripArray.Description &&' תיאור מסלול'}</h3>}
     {TripArray &&TripArray.Description && <div className="text-description">{TripArray &&TripArray.Description }</div>}
  
       {/* <i class="bi bi-brightness-high"></i> */}
       {TripArray &&TripArray.Season && <div>
										<label class="elementor-icon-list-text">עונות בשנה:</label>
                    <span> {TripArray.Season }</span>
        </div>}


        {TripArray &&TripArray.Audience &&<div><label class="bi bi-people-fill">מתאים ל:</label><span> {TripArray.Audience }</span></div>}
        {Trip &&Trip.KindTrip && <div><label class="bi bi-people-fill">סוג הטיול:</label><span> {Trip.KindTrip }</span></div>}
        {TripArray &&TripArray.ActivityTime &&<div><i class="bi bi-clock"></i> {TripArray.ActivityTime }</div>}
        {TripArray &&TripArray.Area &&<div>
        <label>{TripArray.Area&&'איזור בארץ:' }</label>
        <span> {TripArray.Area }</span></div>}
        {TripArray && TripArray.Lengthoftrip &&<div>
        <label>{TripArray.Lengthoftrip &&'משך הטיול:'}</label>
        <span> {TripArray.Lengthoftrip }</span> </div>}  
        {TripArray && TripArray.KindTrip &&<div> 
        <label>{TripArray.KindTrip &&'מאפיני מסלול:'}</label>
        <span> {TripArray.KindTrip }</span>  </div> }
        {TripArray && TripArray.Address &&
        <div><label>{TripArray.Address &&'כתובת:'}</label>
        <a>{TripArray.Address }</a> </div>}
        {TripArray && TripArray.Email &&
        <div>
        <label>{TripArray.Email && 'מייל:'}</label>
         <a href={`mailto:${TripArray.Email}`}>{TripArray.Email
          }</a>  </div>  }              
             {TripArray && TripArray.Contact &&<div>
        <label>{TripArray.Contact &&'איש קשר:'}</label>
        <span> {TripArray.Contact }</span> </div>}
        <button onClick={handleSubmit} type="submit">אירגון קבוצה</button>
        </div>)
}