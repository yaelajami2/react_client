import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { GetAllRequestTrip, CreateRequestTrip, UpdateRequestTrip, GetRequestTripById } from '../../Services/features/RequestTripSlice/RequestTripeSlice'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function FormTeam() {
    const location = useLocation();
    const RequstTrip = location.state?.selectedTrip
    const userId = useSelector((state) => state?.user?.UserCookies?.UserId);
    const [errors, setErrors] = useState({});
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //console.log('item ', );
    const rad = function (x) {
        return x * Math.PI / 180;
    };

    const logPlaceDetails = (place_id1, place_id2) => {
        var service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        let p1, p2 = '';
        let actualAddress = '';
        service.getDetails({
            placeId: place_id1
        }, function (place, status) {
            console.log('Place details:', place);
            p1 = place.geometry.location;
            service.getDetails({
                placeId: place_id2
            }, function (place, status) {
                console.log('Place details:', place);
                p2 = place.geometry.location;
                const distance = getDistance(p1, p2);
                if (distance > 10) {
                    setErrors({
                        ...errors,
                        address: { message: "המרחק בין הכתובת שהכנסת לשאר הכתובת גדול מ10  קמ" }
                    });
                }
                console.log(distance);
                return distance;
            });
        });
    };

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
        return d / 1000; // returns the distance in meter
    };

    const isDistanceValid = (value) => {
        dispatch(GetAllRequestTrip({
            callBack: (allSites) => {
                const filteredSitesList = allSites.filter((site) => site.group === RequstTrip.group);
                filteredSitesList.forEach(async request => {
                    const distance = await logPlaceDetails(value?.value?.place_id, request.AddressID);
                    if (distance > 10) {
                        return false;
                    }
                });
                return true;
            }
        }))
    }

    const handleCityChange = (value) => {
        setErrors({
            ...errors,
            address: ''
        });
        setCity(value);
        isDistanceValid(value);
    }

    const handleSubmit = () => {
        console.log("jkln0")

        let City = document.getElementById("City")?.value || ''
        let Maill = document.getElementById("Maill")?.value || ''
        let CountJoin = document.getElementById("CountJoin")?.value || ''
        let Phone = document.getElementById("Phone")?.value || ''

        let err = {};
        let flag = true;
        if (CountJoin > RequstTrip.ThinkNumberOfTravelers) {
            err.CountJoin = { message: "אין מקום לכמות הגדולה מ-" + RequstTrip.ThinkNumberOfTravelers };
            flag = false;

        }

        if (!Maill || !Maill.trim()) {
            err.mail = { message: "הכנס מייל" };
            flag = false;
        }
        else
            if (!(/\S+@\S+\.\S+/.test(Maill)))
            //    person.mail.match("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"))
            {
                err.mail = { message: "הכנס מייל תקין" };
                flag = false;
            }
        if (!Phone) {
            err.tel = { message: "הכנס טלפון" };
            flag = false;
        } else if (!city) {
            err.address = { message: "הכנס כתובת" };
            flag = false;
        }
        else {
            if (Phone == 10) {
                for (let i = 0; i < Phone.length; i++) {
                    if (!(Phone[i] >= '0' && Phone[i] <= '9')) {
                        err.tel = { message: "הכנס טלפון תקין" };
                        flag = false;
                        break;

                    }
                }
            }
            else {
                if (!Phone.trim() || Phone.length != 10) {
                    err.tel = { message: "הכנס טלפון תקין" };
                    flag = false;
                }
            }
        }

        if (flag && !errors.address?.message) {
            console.log("selectedTripCode:", RequstTrip.selectedTripCode)

            const RequestJoin = {
                //???לשאול
                ...RequstTrip,
                alltravels:0 ,
                Switch:0,
                UserId: Number(userId),
                NumberOfTravelers: CountJoin,
                Address: city.value.description,
                AddressID: city.value?.place_id,
                City: City,
                ThinkNumberOfTravelers: CountJoin,
                Maill: Maill,
                StartDate: new Date(RequstTrip.StartDate),
             
            
            }
            dispatch(CreateRequestTrip({ requesttripe: RequestJoin }));
            navigate('/Pay');
        }

        else {
            setErrors(err);
        }
    }
    return (
        <div>
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
            {errors.address &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>{errors.address.message}</strong>
                </div>}
            {/* {errors.tel && <div className="valid">{err.tel.message}</div>} */}
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">הכנס מייל</span>
                <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="Maill" name="Maill" />
            </div>
            {errors.mail &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.mail.message}</strong>
                </div>}
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">כמות אנשים להצטרפות</span>
                <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="CountJoin" />
            </div>

            {errors.CountJoin &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.CountJoin.message}</strong>
                </div>}
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">טלפון</span>
                <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="Phone" />
            </div>

            {errors.tel &&
                <div class="alert alert-dismissible alert-danger col-md-3">
                    <strong>  {errors.tel.message}</strong>
                </div>}
            <button type="button" onClick={handleSubmit}>לתשלום</button>
            <div id='map' style={{ height: '200px' }}></div>
        </div>
    );
}

