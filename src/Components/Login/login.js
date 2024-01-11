import { useState } from "react"
import React from "react"
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { CreateUser, GetAllUsers, GetUserById, UpdateUser, DeleteUserById, setUserIdCookies } from '../../Services/features/UserLogin/userSlice'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [name, setname] = useState()
    const [mail, setmail] = useState()
    const [phone, setphone] = useState()
    const [flagRes, setFlagRes] = useState(false)
    const [loginduplicate, setloginduplicate] = useState()

    const [person, setPerson] = useState({
        name: null,
        mail: null,
        tel: null
    })
    const [cookies, setCookie] = useCookies(['user']);

    function handle(User) {
        if (User.UserId < 0) {
            User.UserId *= -1;
             setloginduplicate("הינך רשום במערכת");
        }
        setCookie('Mail', person.mail, { path: '/' });
        setCookie('User', User, { path: '/' });
        navigate('/home');
        window.location.reload();
    };

    const users = useSelector((state) => state?.users?.entities);
    const Change = (e) => {
        let inputName = e.target.name;//שם האינפוט
        let inputValue = e.target.value;//ערך האינפוט
        person[inputName] = inputValue
        setPerson(person)
    }

    let check = (e) => {


        let err = {};
        let flag = true;
        if (!person.name) {
            err.name = { message: " הכנס שם" };
            flag = false;

        }
        else {
            if (!person.name.trim()) {
                err.name = { message: "הכנס שם תקין" };
                flag = false;
            }
        }
        if (!person.mail || !person.mail.trim()) {
            err.mail = { message: "הכנס מייל" };
            flag = false;
        }
        else
            if (!(/\S+@\S+\.\S+/.test(person.mail)))
            //    person.mail.match("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"))
            {
                err.mail = { message: "הכנס מייל תקין" };
                flag = false;
            }
        if (!person.tel) {
            err.tel = { message: "הכנס טלפון" };
            flag = false;
        }
        else {

            if (person.tel.length == 10) {
                for (let i = 0; i < person.tel.length; i++) {
                    if (!(person.tel[i] >= '0' && person.tel[i] <= '9')) {
                        err.tel = { message: "הכנס טלפון תקין" };
                        flag = false;
                        break;

                    }

                }
            }
            else {
                if (!person.tel.trim() || person.tel.length != 10) {
                    err.tel = { message: "הכנס טלפון תקין" };
                    flag = false;

                }

            }
        }


        if (flag) {

            const User = { FirstName: person.name, Mail: person.mail, Phone: person.tel };
            // axios.post('http://localhost:55689/api/User',User).then((res) => {
            //     //לכאן יכנס רק אם הצליחה הקריאה - then  -
            //     setFlagRes(true)
            //     //  הפעולות שיקרו אחרי שהקריאה חוזרת
            //    console.log(res.data)
            //debugger
            dispatch(CreateUser({ user: User, callBack: handle }));
            //dispatch(UpdateUser({user:User,callBack:undefined}));
            // axios.post('http://localhost:55689/api/createUser',User).then((res) => {
            //לכאן יכנס רק אם הצליחה הקריאה - then  -

            //  הפעולות שיקרו אחרי שהקריאה חוזרת
            //handle(res.data);
            //navigate("/");
            // })
            // debugger



            // })

        }

        else {
            // console.log("error")

            setErrors(err);
        }

    }

    return (
        <div className="frame2">
           <div className="login_img"> <img className="img-logo"  src="/assets/logo.png"/></div>
            <div class="color" >
                <h2></h2>
            </div>
            {users?.map(user => (<div>Hi {user.name}</div>))}
            <div class="form-floating">
            <input type="text" name="name" class="form-control" id="pwd" placeholder="הכנס שם" required="required" onChange={Change}></input>
      <label for="pwd">הכנס שם</label>
    </div>
        
            {errors.name &&
            <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.name.message}</strong>   
            </div>}
            <div class="form-floating">
            <input type="text" name="mail" class="form-control" id="pwd" required="required" onChange={Change} placeholder="הכנס מייל"></input>
      <label for="pwd">הכנס מייל</label>
    </div>
     
            {errors.mail &&
            <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.mail.message}</strong>   
            </div>}
            <div class="form-floating">
            <input type="text" name="tel" class="form-control" id="pwd" required="required" onChange={Change} placeholder="הכנס טלפון"></input>
            <label for="pwd">הכנס טלפון</label>
            </div>
            {errors.tel &&
            <div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {errors.tel.message}</strong>   
            </div>}
            {loginduplicate &&<div class="alert alert-dismissible alert-danger col-md-3">
            <strong>  {loginduplicate}</strong>   
            </div>}
            <input type="submit" className="check_buton" value="בדיקה" onClick={check}></input>
            {/* {flagRes &&
                <NavBar />} */}
        </div>
    )

}
