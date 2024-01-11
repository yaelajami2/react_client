import { Routes, Route, Outlet, useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { GetTripSiteByCode, GetAllTripeSite } from '../../Services/features/TripeSite/TripeSiteSlice'
import { GetAllRequestTrip, CreateRequestTrip } from '../../Services/features/RequestTripSlice/RequestTripeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { compareAsc, format } from 'date-fns';
export default function PlantTrip() {
    const navigate = useNavigate();
    const UserIdCookies = useSelector((state) => state?.user?.UserCookies).UserId;
    let [PlantTrip, setPlantTrip] = useState([])
    let [TripSite, setTripSite] = useState([])
    let [Trip, setTrip] = useState({})
    const [isShown, setIsShown] = useState(false);
    const UpdatePlantTrip = (PlantTrip) => {
        const filteredTrips = PlantTrip.filter(value =>
            value.UserId != parseInt(UserIdCookies)    
            && value.ThinkNumberOfTravelers != 0
            ).filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.group === value.group
                
            ))
        )
        // .filter(value =>
        //     value.ThinkNumberOfTravelers != 0  
            
        //     )
        console.log(filteredTrips);
        setPlantTrip(filteredTrips);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (TripSite?.length === 0) {
            dispatch(GetAllRequestTrip({ callBack: UpdatePlantTrip }));
            dispatch(GetAllTripeSite({ callBack: UpdateTrip }));
        }
    }, [])

    const SucssesInsert = (SucssesInsert) => {
        if (SucssesInsert == 1) {
            document.getElementById("succses").innerText = "נוסף בהצלחה"
        }
        else {

        }

    }
    const RequestTrip = {
        UserId: UserIdCookies
        //Address: document.getElementById("NumberOfTravelers").value//,
        // City: document.getElementById("NumberOfTravelers").value,
        // ThinkNumberOfTravelers: document.getElementById("NumberOfTravelers").value,
        // Maill: document.getElementById("NumberOfTravelers").value,
        // group: document.getElementById("NumberOfTravelers").value
    }
    //console.log('request trip', RequestTrip);
    //dispatch(CreateRequestTrip({ requesttripe: RequestTrip, callBack: SucssesInsert }));

    const SendFormTeam = (item) => {
        navigate('/FormTeam', { state: { selectedTrip: item } })
    }

    const UpdateTrip = (TripSite) => {
        setTripSite(TripSite)
    }
    const ShowDetails=(item)=>{
        setTrip(item)
      
   
        setIsShown(true);
    }
    return (<>

        <table id="customers">
            <tr>
                <th>מספר נוסעים</th>
                <th>תאריך התחלה</th>
                <th>מייל</th>
                <th>מספר האנשים נשאר להשיג</th>
                <th>עיר</th>
                <th>סוג טיול</th>
                <th>לפרטים</th>
                <th>להצטרפות?</th>
            </tr>
            {PlantTrip && PlantTrip.length && PlantTrip.map((item, index) => {
                const tripSiteDetails = TripSite.find((trip) => trip.Code === item.TripCode) || {};
                return <>  <tr>
                    {/* לשים משתנה ברדאקס של מספר נוסעים */}
                    <td>{item.alltravels-item.ThinkNumberOfTravelers}</td>
                    <td>{format(new Date(item.StartDate), 'dd-MM-yyyy hh:ss')} </td>
                    <td>{tripSiteDetails.Maill}</td>
                    <td>{item.ThinkNumberOfTravelers }</td>
                    <td>{tripSiteDetails.Address}</td>
                    <td>{tripSiteDetails.KindTrip}</td>
                    <td><input type="button" value="לפרטים" onClick={() => ShowDetails(tripSiteDetails)} /></td>
                    <td><input type="button" value="להצטרפות" onClick={() => SendFormTeam(item)} /></td>
                    {/* <td>{item.NumMinbus}</td> */}
               
       

                
                </tr></>
            })}
        </table>
        
            <div id="showDetails" style={{display: isShown ? 'block' : 'none'}}>
            {/* <p>{item.TripCode}</p> */}
            {/* <img src={`./assets/${Trip.Img}`}/> */}
     {Trip && Trip.SiteName &&<h2>{Trip.SiteName}</h2>}
     {Trip && Trip.Description &&<h3>{Trip.Description &&' תיאור מסלול'}</h3>}
     {Trip &&Trip.Description && <div className="text-description">{Trip &&Trip.Description }</div>}
  
       {/* <i class="bi bi-brightness-high"></i> */}
       {Trip &&Trip.Season && <div>
										<label class="elementor-icon-list-text">עונות בשנה:</label>
                    <span> {Trip.Season }</span>
        </div>}


        {Trip &&Trip.Audience &&<div><label class="bi bi-people-fill">מתאים ל:</label><span> {Trip.Audience }</span></div>}
        {Trip &&Trip.KindTrip && <div><label class="bi bi-people-fill">סוג הטיול:</label><span> {Trip.KindTrip }</span></div>}
        {Trip &&Trip.ActivityTime &&<div><i class="bi bi-clock"></i> {Trip.ActivityTime }</div>}
        {Trip &&Trip.Area &&<div>
        <label>{Trip.Area&&'איזור בארץ:' }</label>
        <span> {Trip.Area }</span></div>}
        {Trip && Trip.Lengthoftrip &&<div>
        <label>{Trip.Lengthoftrip &&'משך הטיול:'}</label>
        <span> {Trip.Lengthoftrip }</span> </div>}  
        {Trip && Trip.KindTrip &&<div> 
        <label>{Trip.KindTrip &&'מאפיני מסלול:'}</label>
        <span> {Trip.KindTrip }</span>  </div> }
        {Trip && Trip.Address &&
        <div><label>{Trip.Address &&'כתובת:'}</label>
        <a>{Trip.Address }</a> </div>}
        {Trip && Trip.Email &&
        <div>
        <label>{Trip.Email && 'מייל:'}</label>
         <a href={`mailto:${Trip.Email}`}>{Trip.Email
          }</a>  </div>  }              
             {Trip && Trip.Contact &&<div>
        <label>{Trip.Contact &&'איש קשר:'}</label>
        <span> {Trip.Contact }</span></div>}
            </div>
        <Outlet />
    </>)
}
