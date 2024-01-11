import { useNavigate } from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  Code: 1,
  SiteName: "undefind",
  Description: "",
  Season: "",
  Audience: "",
  ActivityTime: "",
  Phone: "",
  Website: "",
  Area: "",
  Settlement: "",
  Email: "",
  Address: "",
  Contact: "",
  Img: "",
  Lengthoftrip: "",
  KindTrip: ""
}
export const GetAllTripeSite = createAsyncThunk(
  'TripeSite/GetAllTripeSite',
  async ({ callBack }) => {
    const response = await axios.get('http://localhost:55689/api/tripsite');
    callBack(response.data);
    return response.data;
  }

)
export const GetFilterByTripSite = createAsyncThunk(
  'TripeSite/GetFilterByTripSite',
  async ({ Season, Audience, KindTrip, distanst, callBack }) => {
    const response = await axios.get('http://localhost:55689/api/tripsite/FilterTripSite?distanst=7&Season=' + (Season).toString() + '&Audience=' + (Audience).toString() + '&KindTrip=' + KindTrip.toString());
    callBack(response.data);
    return response.data;
  }
)
export const GetTripSiteByCode = createAsyncThunk(
  'TripeSite/GetTripSiteByCode',
  async ({ code, callBack }) => {
    const response = await axios.get("http://localhost:55689/api/TripSite/?code=" + code);
    callBack(response.data);
    return response.data;
  }

)
//check
export const CreateTripSite = createAsyncThunk(
  'TripeSite/CreateTripSite',
  async ({ tripSite, callBack }) => {
    const response = await axios.post('http://localhost:55689/api/TripSite', tripSite);
    callBack(response.data);
    return response.data;
  }
  // let response = await fetch("/api/documents/get_all_documents", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body:({m_n_num:Case.m_n_num}),

  // });

)
export const UpdateTripeSite = createAsyncThunk(
  'TripeSite/UpdateTripeSite',
  async ({ t, callBack }) => {
    const response = await axios.put('http://localhost:55689/api/TripSite', t);
    callBack(response.data);
    return response.data;
  }

)
export const DeleteTripeSite = createAsyncThunk(
  'TripeSite/DeleteTripeSite',
  async ({ id, callBack }) => {
    const response = await axios.delete('http://localhost:55689/api/TripSite?code='+ id);
    callBack(response.data);
    return response.data;
  }

)


const TripeSiteSlice = createSlice({
  name: 'TripeSite',
  initialState: {
    entities: []
  },
  reducers: {
    //         GetUser:(state,UserId)=>{
    //             axios.get(`http://localhost:55689/api/user/${UserId}`).then((res) => {

    //             return res.data;
    //         })
    //     }
    //             ,
    //             PostUser:(state,User)=>{
    //                 axios.post('http://localhost:55689/api/User',User.payload).then((res) => {
    //                     //לכאן יכנס רק אם הצליחה הקריאה - then  -
    //                  debugger;
    //                   return res.data;
    //                     //  הפעולות שיקרו אחרי שהקריאה חוזרת

    //                 })
    //         },
    //         GetAllUsers:(state)=>{
    //             axios.get('http://localhost:55689/api/user').then((res) => {
    //                 //לכאן יכנס רק אם הצליחה הקריאה - then  -
    //             return res.data;


    //             })
    //     },
    //     PutUser:(User)=>{
    //         axios.put('http://localhost:55689/api/User',User).then(() => {
    //             //לכאן יכנס רק אם הצליחה הקריאה - then  -

    //         })
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllTripeSite.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(GetFilterByTripSite.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(GetTripSiteByCode.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(CreateTripSite.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(UpdateTripeSite.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(DeleteTripeSite.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })

  },

});

export default TripeSiteSlice.reducer;