// import assets from '../../src/assets/agritor.jpg'
import './list.css'
import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTripeSite, GetFilterByTripSite } from '../../Services/features/TripeSite/TripeSiteSlice';
import { setSelectedTrip } from '../../Services/features/RequestTripSlice/RequestTripeSlice';

const List = (props) => {
    const UserIdCookies = useSelector((state) => state?.users?.UserCookies?.UserId);
    const [TripArray, setTripArray] = useState([])
    const users = useSelector((state) => state?.TripeSite?.entities);
    const dispatch = useDispatch();
    const UpdateTripArray = (TripArray) => {
        setTripArray(TripArray)
    }
    useEffect(() => {
        dispatch(GetAllTripeSite({ callBack: UpdateTripArray }));
    
    }, [])
    //מתי לעשות
    const filtertrip = () => {
        var audience = document.querySelectorAll('input[name=audience]:checked');
        var kindtrip = document.querySelectorAll('input[name=kindtrip]:checked');
        var checkedBoxes = document.querySelectorAll('input[name=season]:checked');
        var arrayaudience = "";
        for (let i = 0; i < audience.length; i++) {
            if (i == audience.length - 1) {
                arrayaudience += audience[i].getAttribute("value");
            }
            else {
                arrayaudience += audience[i].getAttribute("value") + ",";
            }

        }
        var arraykindtrip = "";
        for (let i = 0; i < kindtrip.length; i++) {
            if (i == kindtrip.length - 1) {
                arraykindtrip += kindtrip[i].getAttribute("value");
            }
            else {
                arraykindtrip += kindtrip[i].getAttribute("value") + ",";
            }

        }
        var arraycheckedBoxes = "";
        for (let i = 0; i < checkedBoxes.length; i++) {
            if (i == checkedBoxes.length - 1) {
                arraycheckedBoxes += checkedBoxes[i].getAttribute("value");
            }
            else {
                arraycheckedBoxes += checkedBoxes[i].getAttribute("value") + ",";
            }

        }
        console.log(arraycheckedBoxes);
        dispatch(GetFilterByTripSite({ Season: arraycheckedBoxes, Audience: arrayaudience, KindTrip: arraykindtrip, distanst: 2, callBack: succsesfiltertrip }));
    }
    const succsesfiltertrip = (triparray) => {
        setTripArray(triparray);
    }
    const handleTripClick = (code) => {
        dispatch(setSelectedTrip(code));
        document.getElementById("removelist").style.display = "none";
    }
    console.log(UserIdCookies)
    return (<>

        <div id="removelist" >
            <h1>רשימת טיולים</h1>
            <div className='row'>
                <div className='col-md-4'> <p>עונה:</p>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="season" value="אביב"></input>
                            <span class="mark"></span><p className="lable_check">אביב</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="season" value="סתיו"></input>
                            <span class="mark"></span><p className="lable_check">סתיו</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="season" value="חורף"></input>
                            <span class="mark"></span><p className="lable_check">חורף</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="season" value="קיץ"></input>
                            <span class="mark"></span><p className="lable_check">קיץ</p>
                        </label>
                    </div>
                </div>
                <div className='col-md-4'>   <p>קבוצות:</p>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="audience" value="ילדים"></input>
                            <span class="mark"></span><p className="lable_check">ילדים</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="audience" value="משפחות"></input>
                            <span class="mark"></span><p className="lable_check">משפחות</p>
                        </label>
                    </div>

                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="audience" value="קבוצות"></input>
                            <span class="mark"></span><p className="lable_check">קבוצות</p>
                        </label>
                        <div class="checkbox-container">
                            <label class="checkbox-label">
                                <input type="checkbox" name="audience" value="זוגות"></input>
                                <span class="mark"></span><p className="lable_check">זוגות</p>
                            </label>
                        </div>  </div>        </div>
                <div className='col-md-4'>     <p>סוג טיול:</p>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="רטוב" />
                            <span class="mark"></span><p className="lable_check">רטוב</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="יבש" />
                            <span class="mark"></span><p className="lable_check">יבש</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="מסלול" />
                            <span class="mark"></span><p className="lable_check">מסלול</p>
                        </label>
                    </div>

                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="טבע" />
                            <span class="mark"></span><p className="lable_check">טבע</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="אטרקציה" />
                            <span class="mark"></span><p className="lable_check">אטרקציה</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="פארקים" />
                            <span class="mark"></span><p className="lable_check">פארקים</p>
                        </label>
                    </div>
                    <div class="checkbox-container">
                        <label class="checkbox-label">
                            <input type="checkbox" name="kindtrip" value="מוזיאון" />
                            <span class="mark"></span><p className="lable_check">מוזיאון</p>
                        </label>
                    </div>
                </div>
            </div>
            <button onClick={filtertrip} className="button_filter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-right" viewBox="0 0 16 16">
                <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
            </svg>סינון</button>
            <ul className='ul-list row'>
                {/* {bookArray.map((item, index)=>{return <li key={index}> <Link to={"details/"+item.id}>{item.name}</Link></li> })} */}
                {TripArray && TripArray.length && TripArray.map((item, index) => {
                    return <><Link onClick={() => handleTripClick(item.Code)} to={"TripeSite/" + item.Code}><div key={item.Code} selecttrip={item} className="every-trip col-md-5 col-sm-12">
                
                        <img width="100%" src={`/assets/${item.Img}`} />
                        <h3>{item.SiteName}</h3>

                    </div>
                        <div key={index}>
                            <p>{UserIdCookies}</p>

                        </div></Link>
                    </>

                })}
            </ul>
        </div>
        <Outlet />
    </>
    );
}

export default List;