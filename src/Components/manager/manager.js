import React, { useEffect, useState } from "react"
import { Routes, Route, Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { DeleteTripeSite, GetAllTripeSite } from '../../Services/features/TripeSite/TripeSiteSlice';
import { CreateTripSite,UpdateTripeSite } from '../../Services/features/TripeSite/TripeSiteSlice';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from "react-google-places-autocomplete";
const Manager = (props) => {
  const [TripArray, setTripArray] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [objecttrip, setobjecttrip] = useState({});
  const [city, setCity] = useState('');
  const [sdeletetrip, setdeletetrip] = useState(0);
  let [Season, setSeason] = useState([])
  let [Audience, setAudience] = useState([])
  let [KindTrip, setKindTrip] = useState([])
  const UpdateSeason = (Season) => {
    setSeason(Season)
  }
  const UpdateAudience = (Audience) => {
    setAudience(Audience)
  }
  const UpdateKindTrip = (KindTrip) => {
    setKindTrip(KindTrip)
  }
  const handleSeasonClick = (item) => {
    const updatedSeason = Season.map((comp) => ({
      ...comp,
      isSelected: comp.SeasonName === item.value ? !Season.isSelected : Season.isSelected
    }))
    setSeason(UpdateSeason);
  }

  const handleAudienceClick = (item) => {
    const updatedAudience = Audience.map((Audience) => ({
      ...Audience,
      isSelected: Audience.AudienceName === item.value ? !Audience.isSelected : Audience.isSelected
    }))
    setAudience(UpdateAudience);
  }

  const handleKindTripClick = (item) => {
    const updatedCompanyOfKindTrip = KindTrip.map((comp) => ({
      ...comp,
      isSelected: comp.KindTripName === item.value ? !comp.isSelected : comp.isSelected
    }))
    setKindTrip(UpdateKindTrip);
  }
  const UpdateTripArray = (TripArray) => {
    setTripArray(TripArray)
  }
  useEffect(() => {
    dispatch(GetAllTripeSite({ callBack: UpdateTripArray }));
    //     axios.get('http://localhost:55689/api/tripsite').then((res) => {
    //         //לכאן יכנס רק אם הצליחה הקריאה - then  -

    //         //  הפעולות שיקרו אחרי שהקריאה חוזרת

    //         setTripArray(res.data)
    //     })
  }, [])
  //מתי לעשות
  const createobject=async()=>{

    }
    
  const handleSubmit = event => {
    // event.preventDefault();
    let ThinkNumberOfTravelers = "";
    let NameSite = document.getElementById("NameSite").value;
    let Descriptiontrip = document.getElementById("Descriptiontrip").value;
    let NumberOfTravelers = "";
    let err = {};
    let flag = true;
    if (!NameSite || !NameSite.trim()) {
      err.NameSite = { message: "הכנס שם הטיול" };
      flag = false;
    }
    else {
      if ( NameSite.length < 2) {
        err.NameSite = { message: "הכנס שם טיול תקין" };
        flag = false;
      }
    }
    if (!Descriptiontrip || !Descriptiontrip.trim()) {
      err.Descriptiontrip = { message: "הכנס תאור טיול" };
      flag = false;
    }
    //let arrseason=document.getElementsByClassName("season").isSelected;

    var checkedBoxes = document.querySelectorAll('input[name=season]:checked');
    var arraycheckedBoxes = "";
    for (let i = 0; i < checkedBoxes.length; i++) {
      if (i == checkedBoxes.length - 1) {
        arraycheckedBoxes += checkedBoxes[i].getAttribute("value");
      }
      else {
        arraycheckedBoxes += checkedBoxes[i].getAttribute("value") + ",";
      }

    }
    if (checkedBoxes.length == 0) {
      err.season = { message: "חייב לבחור לפחות עונה אחת" };
      flag = false;

    }
    var audience = document.querySelectorAll('input[name=audience]:checked');
    var arrayaudience = "";
    for (let i = 0; i < audience.length; i++) {
      if (i == audience.length - 1) {
        arrayaudience += audience[i].getAttribute("value");
      }
      else {
        arrayaudience += audience[i].getAttribute("value") + ",";
      }

    }

    if (audience.length == 0) {
      err.audience = { message: "חייב לבחור לפחות אחת מהאופציות למי מתאים הטיול" };
      flag = false;
    }
    let houreopen = document.getElementById("houreopen").value;
    if (!houreopen || !houreopen.trim()) {
      err.houreopen = { message: "הכנס שעות פתיחה" };
      flag = false;
    }
    let telephone = document.getElementById("telephone").value;
    if (!telephone) {
      err.telephone = { message: "הכנס טלפון" };
      flag = false;
    }
    else {

      if (telephone.length == 10 ||telephone.length == 9) {
        for (let i = 0; i < telephone.length; i++) {
          if (!(telephone[i] >= '0' && telephone[i] <= '9')) {
            err.telephone = { message: "הכנס טלפון תקין" };
            flag = false;
            break;

          }

        }
      }
      else {
        if (!telephone.trim() || telephone.length != 10) {
          err.telephone = { message: "הכנס טלפון תקין" };
          flag = false;

        }

      }
    }
    var expression =
      /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var url = document.getElementById("url").value;
    if (!url.match(expression)) {
      err.url = { message: "הכנס כתובת אתר תקינה" };
      flag = false;
    }

    let mail = document.getElementById('mail').value;
    if (!mail || !mail.trim()) {
      err.mail = { message: "הכנס מייל" };
      flag = false;
    }
    else
      if (!(/\S+@\S+\.\S+/.test(mail)))
      //    person.mail.match("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"))
      {
        err.mail = { message: "הכנס מייל תקין" };
        flag = false;
      }
    
    if (!city || !city.value.description.trim()) {
      err.Address = { message: "הכנס כתובת" };
      flag = false;
    }
    else {
      if (city.length > 40) {
        err.Address = { message: "הכנס כתובת תקינה" };
        flag = false;
      }
    }


    let concat = document.getElementById("concat").value;
    if (!concat || !concat.trim()) {
      err.concat = { message: "הכנס שם איש קשר" };
      flag = false;
    }
    else {
      if (concat.length > 20 || concat.length < 2) {
        err.concat = { message: "הכנס שם איש קשר תקין" };
        flag = false;
      }
    }
    var kindtrip = document.querySelectorAll('input[name=kindtrip]:checked');
    var arraykindtrip = "";
    for (let i = 0; i < kindtrip.length; i++) {
      if (i == kindtrip.length - 1) {
        arraykindtrip += kindtrip[i].getAttribute("value");
      }
      else {
        arraykindtrip += kindtrip[i].getAttribute("value") + ",";
      }

    }
    if (kindtrip.length == 0) {
      err.kindtrip = { message: "חייב לבחור לפחות סוג אחד של טיול" };
      flag = false;
    }
    let lengthtrip = document.getElementById("lengthtrip").value

    if (!lengthtrip || !lengthtrip.trim()) {
      err.lengthtrip = { message: "הכנס אורך טיול" };
      flag = false;
    }
    else {
      if (lengthtrip.length > 20 || lengthtrip.length < 3) {
        err.lengthtrip = { message: "הכנס אורך טיול תקין" };
        flag = false;
      }
    }

    if (flag == true) {


      let p = "";
      var TripSite = {
        SiteName: NameSite,
        Description: Descriptiontrip,
        Season: arraycheckedBoxes,
        Audience: arrayaudience,
        ActivityTime: houreopen,
        Phone: telephone,
        Website: url,
        Address: city.value.description,
        Email: mail,
        Contact: concat,
        Img: document.getElementById("img").value,
        Lengthoftrip: lengthtrip,
        KindTrip: arraykindtrip



      
      }
      dispatch(CreateTripSite({ tripSite: TripSite, callBack: handle }));
    }
      
     else {
      setErrors(err);
  
     }
   
    
    }
    


 
  const handleCityChange = (value) => {
    setCity(value);

  }

  const handle = () => {
    window.location.reload();
  }
  const deletetrip = () => {

    dispatch(DeleteTripeSite({ id: sdeletetrip, callBack: sucseesdeletetrip }));
  }

  const sucseesdeletetrip = (code) => {
    window.location.reload();

  }

  const updatetrip = () => {

    // document('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    if (document.getElementById("NameSite") != null) {
      document.getElementById("NameSite").value = (sdeletetrip.SiteName) ? (sdeletetrip.SiteName) : "";

    }

    document.getElementById("Descriptiontrip").value = (sdeletetrip.Description) ? (sdeletetrip.Description) : "";
    if (document.getElementById("Description") != null) {
      document.getElementById("Description").value = (sdeletetrip.Description) ? (sdeletetrip.Description) : "";
    }
    if (sdeletetrip.Season != null) {
      var Season = sdeletetrip.Season.split(',');
      for (let i = 0; i < Season.length; i++) {

        document.querySelector("input[value=" + Season[i] + "]").checked = true;

      }
    }
    if (sdeletetrip.Audience != null) {
      var Audience = sdeletetrip.Audience.split(',');
      for (let i = 0; i < Audience.length; i++) {

        document.querySelector("input[value=" + Audience[i] + "]").checked = true;

      }
    }
    if (sdeletetrip.KindTrip != null) {
      var KindTrip = sdeletetrip.KindTrip.split(',');
      for (let i = 0; i < KindTrip.length; i++) {

        document.querySelector("input[value=" + KindTrip[i] + "]").checked = true;

      }
    }
    if (sdeletetrip.ActivityTime != null) {
      document.getElementById("houreopen").value = sdeletetrip.ActivityTime;
    }
    if (sdeletetrip.Phone != null) {
      document.getElementById("telephone").value = sdeletetrip.Phone;
    }
    if (sdeletetrip.Website != null) {
      document.getElementById("url").value = sdeletetrip.Website;
    }
    if (sdeletetrip.Email != null) {
      document.getElementById("mail").value = sdeletetrip.Email;
    }
    if (sdeletetrip.Address != null) {
      setCity(sdeletetrip.Address);
      document.querySelector(".css-1wa3eu0-placeholder").innerText=sdeletetrip.Address;
    }
    if (sdeletetrip.Contact != null) {
      document.getElementById("concat").value = sdeletetrip.Contact;
    }
    if (sdeletetrip.Img != null) {
      document.getElementById("img").value = sdeletetrip.Img;
    }
    if (sdeletetrip.Lengthoftrip != null) {
      document.getElementById("lengthtrip").value=sdeletetrip.Lengthoftrip;
      }
    // window.scroll(0, document.body.scrollHeight);
  
    document.getElementById("updatetriptwo").style.display = "block";
    document.getElementById("addtrip").style.display = "none";
  }

  const updatetriptwo = () => {
  // event.preventDefault();
  let ThinkNumberOfTravelers = "";
  let NameSite = document.getElementById("NameSite").value;
  let Descriptiontrip = document.getElementById("Descriptiontrip").value;
  let NumberOfTravelers = "";
  let err = {};
  let flag = true;
  if (!NameSite || !NameSite.trim()) {
    err.NameSite = { message: "הכנס שם הטיול" };
    flag = false;
  }
  else {
    if ( NameSite.length < 2) {
      err.NameSite = { message: "הכנס שם טיול תקין" };
      flag = false;
    }
  }
  if (!Descriptiontrip || !Descriptiontrip.trim()) {
    err.Descriptiontrip = { message: "הכנס תאור טיול" };
    flag = false;
  }
  //let arrseason=document.getElementsByClassName("season").isSelected;

  var checkedBoxes = document.querySelectorAll('input[name=season]:checked');
  var arraycheckedBoxes = "";
  for (let i = 0; i < checkedBoxes.length; i++) {
    if (i == checkedBoxes.length - 1) {
      arraycheckedBoxes += checkedBoxes[i].getAttribute("value");
    }
    else {
      arraycheckedBoxes += checkedBoxes[i].getAttribute("value") + ",";
    }

  }
  if (checkedBoxes.length == 0) {
    err.season = { message: "חייב לבחור לפחות עונה אחת" };
    flag = false;

  }
  var audience = document.querySelectorAll('input[name=audience]:checked');
  var arrayaudience = "";
  for (let i = 0; i < audience.length; i++) {
    if (i == audience.length - 1) {
      arrayaudience += audience[i].getAttribute("value");
    }
    else {
      arrayaudience += audience[i].getAttribute("value") + ",";
    }

  }

  if (audience.length == 0) {
    err.audience = { message: "חייב לבחור לפחות אחת מהאופציות למי מתאים הטיול" };
    flag = false;
  }
  let houreopen = document.getElementById("houreopen").value;
  if (!houreopen || !houreopen.trim()) {
    err.houreopen = { message: "הכנס שעות פתיחה" };
    flag = false;
  }
  let telephone = document.getElementById("telephone").value;
  if (!telephone) {
    err.telephone = { message: "הכנס טלפון" };
    flag = false;
  }
  else {

    if ((telephone.length == 10 ||telephone.trim().length == 10)||(telephone.length == 9||telephone.trim().length == 9)) {
      telephone=telephone.trim();
      for (let i = 0; i < telephone.length; i++) {
        if (!((telephone[i] >= '0' && telephone[i] <= '9')||(telephone[i] =="-")||(telephone[i] ==" "))) {
          err.telephone = { message: "הכנס טלפון תקין" };
          flag = false;
          break;

        }

      }
    }
    else {
      if (!telephone.trim() || telephone.length != 10) {
        err.telephone = { message: "הכנס טלפון תקין" };
        flag = false;

      }

    }
  }
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  var url = document.getElementById("url").value;
  if (!url.match(expression)) {
    err.url = { message: "הכנס כתובת אתר תקינה" };
    flag = false;
  }

  let mail = document.getElementById('mail').value;
  if (!mail || !mail.trim()) {
    err.mail = { message: "הכנס מייל" };
    flag = false;
  }
  else
    if (!(/\S+@\S+\.\S+/.test(mail)))
    //    person.mail.match("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"))
    {
      err.mail = { message: "הכנס מייל תקין" };
      flag = false;
    }
  
  if (!city) {
    err.Address = { message: "הכנס כתובת" };
    flag = false;
  }
  else {
    if (city.length < 1) {
      err.Address = { message: "הכנס כתובת תקינה" };
      flag = false;
    }
  }


  let concat = document.getElementById("concat").value;
  if (!concat || !concat.trim()) {
    err.concat = { message: "הכנס שם איש קשר" };
    flag = false;
  }
  else {
    if (concat.length > 20 || concat.length < 2) {
      err.concat = { message: "הכנס שם איש קשר תקין" };
      flag = false;
    }
  }
  var kindtrip = document.querySelectorAll('input[name=kindtrip]:checked');
  var arraykindtrip = "";
  for (let i = 0; i < kindtrip.length; i++) {
    if (i == kindtrip.length - 1) {
      arraykindtrip += kindtrip[i].getAttribute("value");
    }
    else {
      arraykindtrip += kindtrip[i].getAttribute("value") + ",";
    }

  }
  if (kindtrip.length == 0) {
    err.kindtrip = { message: "חייב לבחור לפחות סוג אחד של טיול" };
    flag = false;
  }
  let lengthtrip = document.getElementById("lengthtrip").value

  if (!lengthtrip || !lengthtrip.trim()) {
    err.lengthtrip = { message: "הכנס אורך טיול" };
    flag = false;
  }
  else {
    if (lengthtrip.length > 20 || lengthtrip.length < 3) {
      err.lengthtrip = { message: "הכנס אורך טיול תקין" };
      flag = false;
    }
  }

  if (flag == true) {


    let p = "";
    var TripSite = {
      Code:sdeletetrip.Code,
      SiteName: NameSite,
      Description: Descriptiontrip,
      Season: arraycheckedBoxes,
      Audience: arrayaudience,
      ActivityTime: houreopen,
      Phone: telephone.trim(),
      Website: url,
      Address: city,
      Email: mail,
      Contact: concat,
      Img: document.getElementById("img").value,
      Lengthoftrip: lengthtrip,
      KindTrip: arraykindtrip



    
    }
   
    dispatch(UpdateTripeSite({ t: TripSite, callBack: handle }));
  }
    
   else {
    setErrors(err);
    setobjecttrip(null) ;
   }
 
  

    
    
  }

  return (
    <>
      <div className="listtrip">
        <table id="customers">
          <thead>
            <tr className="row tripsitemanager">
              <th className="col_md">שם הטיול</th>
              <th className="col_md">תיאור הטיול</th>
              <th className="col_md">עונה</th>
              <th className="col_md">למי מיועד הטיול?</th>
              <th className="col_md">זמן פעילות</th>
              <th className="col_md">טלפון</th>
              <th className="col_md">אתר</th>
              <th className="col_md">איזור</th>
              <th className="col_md">מייל</th>
              <th className="col_md">רחוב</th>
              <th className="col_md">איש קשר</th>
              <th className="col_md">אורך הטיול</th>
              <th className="col_md">סוג הטיול</th>
              <th className="col_md"> </th>
              <th className="col_md"> </th>
            </tr></thead>
          <tbody>
            {TripArray && TripArray.length && TripArray.map((item, index) => {
              return <><tr className="row tripsitemanager">
                <td className="col_md">{item.SiteName}</td>
                <td className="decription_manager col_md">{item.Description}</td>
                <td className="col_md">{item.Season}</td>
                <td className="col_md">{item.Audience}</td>
                <td className="ActivityTime_manager col_md">{item.ActivityTime}</td>
                <td className="col_md">{item.Phone}</td>
                <td className="col_md">{item.Website}</td>
                <td className="col_md">{item.Area}</td>
                <td className="col_md">{item.Email}</td>
                <td className="col_md">{item.Address}</td>
                <td className="col_md">{item.Contact}</td>
                <td className="col_md">{item.Lengthoftrip}</td>
                <td className="col_md">{item.KindTrip}</td>
                <td className="col_md">
                  <div class="container mt-3">
                    <button type="button" onClick={() => { setdeletetrip(item.Code) }} class="btn btn-danger" data-toggle="modal" data-target="#myModal">
                      מחיקה
                    </button>
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close close_desing" data-dismiss="modal">×</button>
                          </div>
                          <div class="modal-body">
                            האם אתה בטוח שברצונך למחוק
                          </div>

                          <div class="modal-footer">
                            <button onClick={(item) => deletetrip()} class="btn btn-danger" data-dismiss="modal">כן</button>
                          </div>


                        </div>
                      </div>
                    </div>

                  </div>

                </td>
                <td className="col_md">
                  <div class="container mt-3">
                    <button type="button" onClick={() => { setdeletetrip(item) }} class="btn btn-danger" data-toggle="modal" data-target="#myUpdate">
                      עריכה
                    </button>
                    <div class="modal fade" id="myUpdate">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close close_desing" data-dismiss="modal">×</button>
                          </div>
                          <div class="modal-body">
                            האם אתה בטוח שברצונך לערוך
                          </div>
                          <div class="modal-footer">
                            <button type="button" onClick={()=>{updatetrip()}} class="btn btn-danger" data-dismiss="modal">כן</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr></>
            })}
          </tbody>

        </table>


      </div>
      <form>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">שם מקום הטיול</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="NameSite" required="required" />
        </div>

        {errors.NameSite &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.NameSite.message}</strong>
          </div>}
        <div class="input-group input-group-sm mb-3">
          <div>תאור הטיול</div>
          <div><textarea id="Descriptiontrip" name="Descriptiontrip" rows="4" cols="50"></textarea></div>    </div>
        {errors.Descriptiontrip &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.Descriptiontrip.message}</strong>
          </div>}
        <div className="col-md-12 row">
          <div className="col-md-4">
            <p>עונה:</p>
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
            </div>         {errors.season &&
              <div class="alert alert-dismissible alert-danger">
                <strong>  {errors.season.message}</strong>
              </div>}
          </div>

          <div className="col-md-4">
            <p>קבוצות:</p>
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
            </div>
            <div class="checkbox-container">
              <label class="checkbox-label">
                <input type="checkbox" name="audience" value="זוגות"></input>
                <span class="mark"></span><p className="lable_check">זוגות</p>
              </label>
            </div>           {errors.audience &&
              <div class="alert alert-dismissible alert-danger">
                <strong>  {errors.audience.message}</strong>
              </div>}   </div>


          <div className="col-md-4">
            <p>סוג טיול:</p>
            {/* https://www.javatpoint.com/oprweb/test.jsp?filename=CSScheckboxstyle3 */}
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
              </label>         {errors.kindtrip &&
                <div class="alert alert-dismissible alert-danger">
                  <strong>  {errors.kindtrip.message}</strong>
                </div>}
            </div>

          </div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">שעות פתיחה:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="houreopen" required="required" />
        </div>

        {errors.houreopen &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.houreopen.message}</strong>
          </div>}
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">טלפון:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="telephone" required="required" />
        </div>

        {errors.telephone &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.telephone.message}</strong>
          </div>}
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">כתובת אתר הטיול:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="url" />
        </div>

        {errors.url &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.url.message}</strong>
          </div>}
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">מייל:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="mail" />
        </div>

        {errors.mail &&
          <div class="alert alert_mail alert-dismissible alert-danger col-md-3">
            <strong>  {errors.mail.message}</strong>
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
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">איש ליצירת קשר:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="concat" />
        </div>
        {errors.concat &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.concat.message}</strong>
          </div>}
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">בחר תמונה:</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="img" />
        </div>
        {errors.image &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.image.message}</strong>
          </div>}

        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">אורך הטיול</span>
          <input type="text" className="form-control input_desing col-md-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" max="20" name="place" id="lengthtrip" />
        </div>


        {errors.lengthtrip &&
          <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.lengthtrip.message}</strong>
          </div>}

        <div className="row" style={{width:'100%'}}>

          <button id="addtrip" className="col-md-1"  type="submit" onClick={(e) => handleSubmit(e)}>הוספת טיול</button><button className="col-md-1" type="button" id="updatetriptwo" onClick={() => updatetriptwo()} style={{ display: "none" }}>עידכון הטיול</button>
      <button type="button" className="col-md-1" style={{marginRight:'1%'}}  onClick={() => handle()} >ניקוי טופס</button></div>
      </form>          
      <Outlet />
    </>
  );
}

export default Manager;