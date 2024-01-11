import { Routes, Route, Outlet, useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { GetTripSiteByCode, GetAllTripeSite } from '../../Services/features/TripeSite/TripeSiteSlice'
import { GetAllRequestTrip, CreateRequestTrip, DeleteRequestTrip, UpdateRequestTrip } from '../../Services/features/RequestTripSlice/RequestTripeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useId } from "react";
import { compareAsc, format } from 'date-fns';
export default function MyTrip() {
    var today = new Date();

    console.log(today);
    const navigate = useNavigate();
    let UserIdCookies = useSelector((state) => state?.user?.UserCookies).UserId;
    let [PlantTrip, setPlantTrip] = useState([])
    let [TripSite, setTripSite] = useState([])
    let [Trip, setTrip] = useState({})
    const [isShown, setIsShown] = useState(false);
    const UpdateRequestTripinput = (item) => {
        let numoftravelsupdate = document.getElementById("numoftravelsupdate").value;

        if (numoftravelsupdate > 0 && numoftravelsupdate <= (item.ThinkNumberOfTravelers + item.NumberOfTravelers)) {
            dispatch(UpdateRequestTrip({ requestTrip: item, t: item.NumberOfTravelers - (numoftravelsupdate), callBack: Deletepartfromtrip }));
        }
        else {

        }


    }
    function DeleteRequestTripfrommytrip(item) {

        dispatch(UpdateRequestTrip({ requestTrip: item, t: item.NumberOfTravelers, callBack: Deletepartfromtrip }));
    }
    const Deletepartfromtrip = (code) => {
         window.location.reload();
        if (code == 1) {
            document.getElementById("showmessage").innerText = "נמחק בהצלחה";
        }
        else {

        }


    }
    const UpdatePlantTrip = (PlantTrip) => {
        const filteredTrips = PlantTrip.filter(value =>

            value.UserId == parseInt(UserIdCookies)
            && value.NumberOfTravelers != 0

        )
        console.log(filteredTrips);
        setPlantTrip(filteredTrips);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (TripSite?.length === 0) {
            dispatch(GetAllRequestTrip({ callBack: UpdatePlantTrip }));
            dispatch(GetAllTripeSite({ callBack: UpdateTrip }));
        }
    }, UserIdCookies)

    const SucssesInsert = (SucssesInsert) => {
        if (SucssesInsert == 1) {
            document.getElementById("succses").innerText = "נוסף בהצלחה"
        }
        else {

        }

    }
    const RequestTrip = {
        UserId: UserIdCookies,

    }


    const SendFormTeam = (item) => {
        navigate('/FormTeam', { state: { selectedTrip: item } })
    }

    const UpdateTrip = (TripSite) => {
        setTripSite(TripSite)
    }
    const ShowDetails = (item) => {
        setTrip(item)

        setIsShown(true);
    }
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    return (<>

        <table id="customers">
            <tr>
                <th>תאריך התחלה</th>
                <th>מספר נוסעים</th>
                <th>מקומות פנויים</th>

                <th>לפרטים</th>
                <th>עידכון</th>
                <th>ביטול</th>
            </tr>
            {PlantTrip && PlantTrip.length && PlantTrip.map((item, index) => {
                const tripSiteDetails = TripSite.find((trip) => trip.Code === item.TripCode) || {};
                return <>  <tr>


                    <td>{format(new Date(item.StartDate), 'dd-MM-yyyy')}</td>
                    <td><input type="text" id="numoftravelsupdate" placeholder={item.NumberOfTravelers} /></td>
                    <td>{item.ThinkNumberOfTravelers}</td>

                    <td><input type="button" value="לפרטים" onClick={() => ShowDetails(tripSiteDetails)} /></td>
                    <td> {/* <td><input type="button" value="לעידכון" onClick={() => UpdateRequestTripinput(item)} /> */}
                        <div class="container mt-3">
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myUpdate2">
                                לעידכון
                            </button>
                            <div class="modal fade" id="myUpdate2">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close close_desing" data-dismiss="modal">×</button>
                                        </div>
                                        <div class="modal-body">
                                            {new Date(item.StartDate) < today.addDays(14) ? "עידכון מספר הנוסעים בנסיעה כרוך בתשלום  " : "האם אתה בטוח שברצונך לעדכן את מספר הנוסעים בנסיעה"}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" onClick={() => UpdateRequestTripinput(item)} class="btn btn-danger" data-dismiss="modal">כן</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><input type="button" value="לביטול" onClick={() => DeleteRequestTripfrommytrip(item)} /></td>

                    {/* <td>{item.NumMinbus}</td> */}




                </tr></>
            })}
        </table>

        {/* <input type="button"   onClick={DeleteRequestTripfrommytrip(5)}    value="כן"/> */}
        {/* <div id="showDetails" style={{display: isShown ? 'block' : 'none'}}> */}
        {/* <p>{item.TripCode}</p> */}
        {/* <p> {Trip.Season}</p>
            <p> {Trip.Audience}</p>
            <p> {Trip.ActivityTime}</p>
            <p> {Trip.Phone}</p>
            <p> {Trip.Website}</p>
            <p> {Trip.Area}</p>
            <p> {Trip.Settlement}</p>
            <p> {Trip.Email}</p>
            <p> {Trip.Address}</p>
            <p> {Trip.Contact}</p>
            <p> {Trip.Lengthoftrip}</p>
            </div> */}

        <div id="showDetails" style={{ display: isShown ? 'block' : 'none' }}>


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
        <span> {Trip.Contact }</span>
        </div>  
       }  </div> 
        <div id="showmessage"></div>
        <Outlet />
    </>)
}

