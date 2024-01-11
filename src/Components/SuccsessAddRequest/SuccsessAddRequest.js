import { render } from '@testing-library/react';
import React, { useEffect,useSelector,useDispatch } from 'react';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { GetAllRequestTrip, CreateRequestTrip,UpdateRequestTrip } from '../../Services/features/RequestTripSlice/RequestTripeSlice'
const SuccsessAddRequest = (props) => {

    return (
      <p>נוסף בהצלחה</p>
    );
}

export default SuccsessAddRequest;
