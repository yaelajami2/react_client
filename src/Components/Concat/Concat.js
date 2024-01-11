import React, { useEffect, useState } from "react"
import axios from "axios"
import '../Concat/concat.css'
export default function Concat(props) {
    const [name, setName] = useState()
    const [user, setUser] = useState()
    let flower={
        name:"Savion",
        color:"red"
    }
    useEffect(() => {
        //מה לעשות

        //קריאת שרת 
        axios.get(`http://localhost:9854/api/controller/function/${name}`).then((res) => {
            //לכאן יכנס רק אם הצליחה הקריאה - then  -
            //  הפעולות שיקרו אחרי שהקריאה חוזרת
            setUser(res.data)
            console.log(res.data);
        })

        axios.post(`http://localhost:9854/api/controller/function`, {
            name: "Yael",
            age: 10
        }).then((res) => {})
            
        axios.post(`http://localhost:9854/api/controller/function`,flower).then((res) => {})
    },

    
        [])//מתי לעשות
    return (
        <div>
           <h1 class="inline h1_concat text-4xl lg:text-5xl font-semibold mt-0 ml-3">צרו איתנו קשר!</h1>
            יש לכם שאלה על השימוש באתר טיולי? רוצים פרטים על אתרי טיול? כך תעשו את זה!
מערכת אתר טיולי
נשמח שתפנו אלינו לכתובת המייל <a href="mailto:tripyaeleden@gmail.com">tripyaeleden@gmail.com</a><br></br>
אנחנו נשיב תוך שני ימי עסקים. <br></br>

לתשומת לבכם – אנו יכולים לענות על כל נושא שקשור בשימוש באתר שלנו – התחברות, כתיבת תכנים וכו’. כמו כן, נשמח לסייע בכל נושא הקשור לרשת אתרי טיול.
           <p><i styleName="font-size:36px" className="fa fa-phone" ></i>     049876987</p>
            <h3>{user ? user.name : ""}</h3>
        
        </div>)
        

}