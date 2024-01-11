import {useNavigate} from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
const initialState={
CodeTravel:1,
vehicleType :"",
Numberofseats:"",
Priceperkilometer:"",
Mintravels:""
}
export const GetAllTripPrice=createAsyncThunk(
  'TripPrice/GetAllTripPrice',
  async ({ callBack}) => {
       const response =  await axios.get('http://localhost:55689/api/TripPrice');
        callBack(response.data);
        return response.data;
    }

)
export const GetTripPriceById=createAsyncThunk(
  'TripPrice/GetTripPriceById',
  async ({TripPriceid, callBack}) => {
       const response =  await axios.get(`http://localhost:55689/api/TripPrice/${TripPriceid}`);
        callBack(response.data);
        return response.data;
    }

)
//check
export const CreateTripPrice=createAsyncThunk(
    'TripPrice/CreateTripPrice',
    async ({TripPrice, callBack}) => {
         const response =  await axios.post(`http://localhost:55689/TripPrice`,TripPrice);
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
export const UpdateTripPrice=createAsyncThunk(
  'TripPrice/UpdateTripPrice',
  async ({t, callBack}) => {
       const response =  await axios.put('http://localhost:55689/api/TripPrice',t);
        callBack(response.data);
        return response.data;
    }

)
export const DeleteTripPrice=createAsyncThunk(
  'TripPrice/DeleteTripPrice',
  async ({id, callBack}) => {
       const response =  await axios.delete('http://localhost:55689/api/TripPrice/Delete',id);
        callBack(response.data);
        return response.data;
    }

)


 const TripPriceSlice=createSlice({
    name:'TripPrice',
    initialState:{
      entities:[]
    },
    reducers:{
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
        builder.addCase(GetAllTripPrice.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(GetTripPriceById.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
      
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(CreateTripPrice.fulfilled, (state, action) => {
          // Add user to the state array
          state.entities.push(action.payload)
        })
        builder.addCase(UpdateTripPrice.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(DeleteTripPrice.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
     
      },

});

export default TripPriceSlice.reducer;