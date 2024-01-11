import { Routes, Route, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './DetailseGroupTrip.css'
import axios from 'axios';
import { useParams } from "react-router-dom"
import { $CombinedState } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTripPrice } from '../../Services/features/TripPrice/TripPriceSlice'
import { CreateUser } from '../../Services/features/UserLogin/userSlice'
import { CreateRequestTrip } from '../../Services/features/RequestTripSlice/RequestTripeSlice'
import { GetAllCompanyOfProfession } from '../../Services/features/CompanyOfProfession/CompanyOfProfessionSlice'
// import emailjs from '@emailjs/browser';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
import GooglePlacesAutocomplete, {
    geocodeByPlaceId
} from "react-google-places-autocomplete";
import { v4 as uuidv4 } from 'uuid';
export default function DetailseGroupTrip() {
    let selecttrip = useParams()
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    const [datevalue, setValue] = useState(dayjs(new Date()));
    const [errors, setErrors] = useState({});
    var [TripPrice, setTripPrice] = useState([])
    const [seatsWarning, setSeatsWarning] = useState('');
    const [remainingWarning, setRemainingWarning] = useState('');
    let [CompanyOfProfession, setCompanyOfProfession] = useState([])
    // let [UserId, setUserId] = useState()
    const users = useSelector((state) => state?.TripPrice?.entities);
    const selectedTripCode = useSelector((state) => state?.RequestTrip?.selectedTrip);
    const { UserId } = useSelector((state) => state?.user?.UserCookies) || {};

    console.log(useSelector((state) => state));
    console.log('city', city);
    console.log('lat', city?.geometry?.location?.lat(),
        'lng', city?.geometry?.location?.lng());
    console.log(city?.placeId?.getPlace()?.geometry?.location)

    const handleCityChange = (value) => {
        setCity(value);

    }

    const dispatch = useDispatch();
    const UpdateTripPrice = (TripPrice) => {
        setTripPrice(TripPrice)
    }
    const UpdateCompanyOfProfession = (CompanyOfProfessio) => {
        setCompanyOfProfession(CompanyOfProfessio)
    }
    const SucssesInsert = (SucssesInsert) => {
        if (SucssesInsert == 1) {
            // document.getElementById("succses").innerText = "נוסף בהצלחה"
            navigate("/SuccsessAddRequest")
        }
        else {

        }

    }
    useEffect(() => {
        // document.getElementById('#datetimepicker1').datetimepicker();
        console.log(UserId)
        console.log(selectedTripCode)
        dispatch(GetAllTripPrice({ callBack: UpdateTripPrice }));
      
        dispatch(GetAllCompanyOfProfession({ callBack: UpdateCompanyOfProfession }));
       
    }, TripPrice)

    const handleProffessionClick = (item) => {
        const updatedCompanyOfProffession = CompanyOfProfession.map((comp) => ({
            ...comp,
            isSelected: comp.ProfessionId === item.ProfessionId ? !comp.isSelected : comp.isSelected
        }))
        setCompanyOfProfession(updatedCompanyOfProffession);
    }
    const shardcode=(num)=>{
        const numOfTravelers = Number(num);
        const seatsInBus = TripPrice[0].Numberofseats;
        const seatsInMinibus = TripPrice[1].Numberofseats;
        console.log(seatsInMinibus)
        let NumBus = 0, NumMinbus = 0, lastBusSeats = 0, lastMinibusSeats = 0;
        NumBus = Math.round(numOfTravelers / seatsInBus);
        const remainingTravelers = (numOfTravelers - NumBus * seatsInBus) % seatsInBus;
        if (remainingTravelers > 0) {
            if (remainingTravelers > seatsInMinibus) {
                NumBus++;
                lastBusSeats = remainingTravelers;
            } else {
                NumMinbus = Math.floor(remainingTravelers / seatsInMinibus);
                if (remainingTravelers % seatsInMinibus > 0) {
                    NumMinbus++;
                    lastMinibusSeats = remainingTravelers % seatsInMinibus;
                }
            }
        }
        return (NumMinbus*TripPrice[0]?.Priceperkilometer+NumBus*TripPrice[0]?.Priceperkilometer)/numOfTravelers;
    }
    const returnnumberbus = () => {
        let ThinkNumberOfTravelers=Number(document.getElementById("ThinkNumberOfTravelers").value);
        let NumberOfTravelers=Number(document.getElementById("NumberOfTravelers").value);
               return    `${ shardcode(NumberOfTravelers)/NumberOfTravelers}ב<br>
               מידה ואף אחד לא הצטרף המחיר  לטיול לאדם היה ${ shardcode(NumberOfTravelers)}
                בסה'כ${ shardcode(ThinkNumberOfTravelers)}במידה וכל הנוסעים שחשתה להגיע יושגו המחיר
                 לטיול לאדם 
                ${ shardcode(ThinkNumberOfTravelers)/ThinkNumberOfTravelers} היה בסה'כ`;
               //`במידה ואף אחד לא הצטרף המחיר  לטיול לאדם היה בסה'כ`;
        shardcode(ThinkNumberOfTravelers)
        
  
      
    }
    const handleNumberOfTravelersBlur = (e) => {
        const numOfTravelers = Number(e.target.value);
        const seatsInBus = TripPrice[0].Numberofseats;
        const seatsInMinibus = TripPrice[1].Numberofseats;
        console.log(seatsInMinibus)
        let NumBus = 0, NumMinbus = 0, lastBusSeats = 0, lastMinibusSeats = 0;
        NumBus = Math.round(numOfTravelers / seatsInBus);
        const remainingTravelers = (numOfTravelers - NumBus * seatsInBus) % seatsInBus;
        if (remainingTravelers > 0) {
            if (remainingTravelers > seatsInMinibus) {
                NumBus++;
                lastBusSeats = remainingTravelers;
            } else {
                NumMinbus = Math.floor(remainingTravelers / seatsInMinibus);
                if (remainingTravelers % seatsInMinibus > 0) {
                    NumMinbus++;
                    lastMinibusSeats = remainingTravelers % seatsInMinibus;
                }
            }
        }
        setSeatsWarning(`יצאו ${NumBus} אוטובוסים ו ${NumMinbus} מיניבוסים`);
        if (lastBusSeats > 0 || lastMinibusSeats > 0) {
            setRemainingWarning(`ב${lastBusSeats > 0 ? 'אוטובוס' : 'מיניבוס'} האחרון יהיו ${lastBusSeats || lastMinibusSeats} נוסעים`);
        }
    }

    const rad = function (x) {
        return x * Math.PI / 180;
    };

    const logPlaceDetails = (place_id1, place_id2) => {
        var service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        let p1, p2 = '';
        service.getDetails({
            placeId: place_id1
        }, function (place, status) {
            console.log('Place details:', place);
            p1 = place.geometry.location;
        });
        service.getDetails({
            placeId: place_id2
        }, function (place, status) {
            console.log('Place details:', place);
            p2 = place.geometry.location;
            getDistance(p1, p2);
        });
    }

    const getDistance = function (p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        console.log('This is the distance in meter', d / 1000);
        return d; 
    };

    const isDistanceValid = () => {

    }

    const handleDateChange = (newValue) => {
        setValue(newValue);
        console.log(newValue);
    }

    const handleSubmit = event => {
        event.preventDefault();
        let ThinkNumberOfTravelers = parseInt(document.getElementById("ThinkNumberOfTravelers").value)
        let NumberOfTravelers = parseInt(document.getElementById("NumberOfTravelers").value)
        let err = {};
        let flag = true;
        setErrors(err);
        const selectedDate = new Date(datevalue);
        if (NumberOfTravelers < 15 || NumberOfTravelers > 1000) {
            err.NumberOfTravelers = { message: "הכנס כמות נוסעים תקינה (המספר חייב להיות בין 15 ל-1000)" };
            flag = false;

        }
        else
            if (NumberOfTravelers > ThinkNumberOfTravelers && !(ThinkNumberOfTravelers < 15 || ThinkNumberOfTravelers > 1000)) {
                err.NumberOfTravelers = { message: "שים לב כמות הנוסעים כרגע יותר גדול ממה שאתה מצפה להגיע וזה שגוי" };
                flag = false;
            }
        if (!city || !city.value.description.trim()) {
            err.Address = { message: "הכנס כתובת" };
            flag = false;
        }
        if (ThinkNumberOfTravelers <
            15 || ThinkNumberOfTravelers > 1000) {
            err.ThinkNumberOfTravelers = { message: "הכנס כמות נוסעים תקינה (המספר חייב להיות בין 15 ל-1000)" };
            flag = false;
        }
        else if (ThinkNumberOfTravelers < NumberOfTravelers && !(NumberOfTravelers < 15 || NumberOfTravelers > 1000)) {
            err.ThinkNumberOfTravelers = { message: "חייב להית מספר נוסעים שמפים להגיע גדול או שווה למספר הנוסעים כרגע" };
            flag = false;
        }

        if (!selectedDate) {
            err.StartDate = { message: "הכנס תאריך" };
            flag = false;
        }
        else {
            var today = new Date();
            if (NumberOfTravelers == ThinkNumberOfTravelers) {
                today = today.addDays(5)
            }
            else {
                today = today.addDays(15)
            }
        


            if (selectedDate < today) {

                if (NumberOfTravelers == ThinkNumberOfTravelers) {
                    if (!(selectedDate > today)) {
                        err.StartDate = { message: "הכנס תאריך תקין 5 יום מראש" };
                        flag = false;
                    }
                }
                else {
                    err.StartDate = { message: "הכנס תאריך תקין 15 יום מראש" };
                    flag = false;
                }

            }
            var Maill = document.getElementById("Maill").value
            if (!Maill || !Maill.trim()) {
                err.Maill = { message: "הכנס מייל" };
                flag = false;
            }
            else
                if (!(/\S+@\S+\.\S+/.test(Maill)))
                {
                    err.Maill = { message: "הכנס מייל תקין" };
                    flag = false;
                }

        }

        if (flag == true) {
            let Profession_Join = document.getElementsByClassName("Profession_Join")
            let Profession_Join_trip = []
            for (let i = 0; i < Profession_Join.length; i++) {
                if (Profession_Join[i].checked == true) {
                    console.log(Profession_Join[i].getAttribute("Profession"))
                    Profession_Join_trip.push(Profession_Join[i].getAttribute("Profession"))
                }
            }

            var RequestTrip = {
                //???לשאול
                UserId: UserId,
                NumberOfTravelers: NumberOfTravelers,
                Address: city.value.description,
                AddressID: city.value?.place_id,
                ThinkNumberOfTravelers: ThinkNumberOfTravelers,
                StartDate: selectedDate,
                alltravels:ThinkNumberOfTravelers,
                Maill: Maill,
                CompanyOfProfessionGuard: CompanyOfProfession[0].isSelected ? CompanyOfProfession[0]?.ProfessionId : 0,
                CompanyOfProfessionMedic: CompanyOfProfession[1].isSelected ? CompanyOfProfession[0]?.ProfessionId : 0,
                CompanyOfProfessionTourGuide: CompanyOfProfession[2].isSelected ? CompanyOfProfession[0]?.ProfessionId : 0,
                CompanyOfProfessionAccompanied: CompanyOfProfession[3].isSelected ? CompanyOfProfession[0]?.ProfessionId : 0,
                TripCode: selectedTripCode,
                Switch:1,
                group: uuidv4()
            }
            console.log('request trip', RequestTrip);
            dispatch(CreateRequestTrip({ requesttripe: RequestTrip, callBack: SucssesInsert }));
       
        }
        else {
            setErrors(err);
        }



    };


function setstyle(){
   
}

    return (<>
        <div className="two_table">
            <table id="customers">
                <tr>
                    <th>תפקיד</th>
                    <th>מחיר לשעה</th>
                    <th>טלפון</th>
                    <th>הצטרפות?</th>
                </tr>
                {CompanyOfProfession && CompanyOfProfession.length && CompanyOfProfession.map((item, index) => {
                    return <tr>
                        <td>{item.ProfessionalName}</td>
                        <td>{item.PriceperHour}</td>
                        <td>{item.Telphone}</td>
                        <td> <div class="checkbox-container">
                            <label class="checkbox-label">
                                <input type="checkbox" onClick={() => handleProffessionClick(item)} className="Profession_Join" Profession={item}></input>
                                <span class="mark"></span>
                            </label>
                        </div></td>
                    </tr>
                })}

            </table>
            <table id="customers">
                <tr>
                    <th>סוג הרכב</th>
                    <th>מנימום נוסעים</th>
                    <th>מקסימום נוסעים</th>
                    <th>מחיר</th>
                </tr>
                {TripPrice && TripPrice.length && TripPrice.map((item, index) => {
                    return <tr>
                        <td>{item.vehicleType}</td>
                        <td>{item.Mintravels}</td>
                        <td>{item.Numberofseats}</td>
                        <td>{item.Priceperkilometer}</td>
                    </tr>
                })}
            </table>
        </div>
        {/* onSubmit={handleSubmit} */}
        <form onSubmit={(e) => handleSubmit(e)} >
          
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">כמות נוסעים כרגע</span>
                <input type="text" name="place" id="NumberOfTravelers" required="required" class="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
            </div>

            {errors.NumberOfTravelers &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.NumberOfTravelers.message}</strong>
                </div>}
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">כמות נוסעים שמצפה להגיע</span>
                <input type="text" id="ThinkNumberOfTravelers" onBlur={handleNumberOfTravelersBlur} required="required" class="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
            </div>



            <p>{remainingWarning}</p>
            {errors.ThinkNumberOfTravelers &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.ThinkNumberOfTravelers.message}</strong>
                </div>}

            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">הכנס מייל</span>
                <input type="text" id="Maill" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="Maill" required="required" />
            </div>

            {errors.Maill &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.Maill.message}</strong>
                </div>}
            <label>תאריך יציאה</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <MobileDateTimePicker
                        label="הכנס תאריך ושעה"
                        value={datevalue}
                        onClick={() => setstyle()}
                        className="date-clock col-md-3"
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>

            {errors.StartDate &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.StartDate.message}</strong>
                </div>}
                <GooglePlacesAutocomplete

apiKey="AIzaSyDNh3TkOaIl-W_ZMjSxLK94sJCZFPR68lw"
selectProps={{
    placeholder: "כתובת",
    className: "adreesfromgoogle",
    isClearable: true,
    value: city,
    require: true,
    onChange: (val) => {
        handleCityChange(val);
    }
}}
fetchDetails={true}
query={{
    key: "AIzaSyDNh3TkOaIl-W_ZMjSxLK94sJCZFPR68lw",
    components: 'country:il',
    language: 'he',
}}
onNotFound={() => console.log('no results')}
/>
{errors.Address &&
<div class="alert alert-dismissible alert-danger col-md-3">
    <strong>  {errors.Address.message}</strong>
</div>}

            <div style={{width:"100%",
    display: "flex"}}><button type="submit">אירגון קבוצה</button></div>

        </form>
        <div id="succses"></div>
        <Outlet />
    </>)
}