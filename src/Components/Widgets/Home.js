
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as ReactDOM from 'react-dom';


const Home = (props) => {
const newUserId = useSelector((state) => state?.user?.UserCookies);
    return (<>
        <div>
           שלום ל-{newUserId.FirstName}
        </div></>
    );
}

export default Home;