import { useNavigate } from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
const initialState = {
  CodeRequest: 1,
  UserId: 1,
  User: undefined,
  NumberOfTravelers: 0,
  StartDate: "",
  Address: "",
  City: "",
  Maill: "",
  ThinkNumberOfTravelers: 0,
  TripSite: undefined,
  CompanyOfProfession: undefined,
  TripPrice: undefined,
}
export const GetAllRequestTrip = createAsyncThunk(
  'RequestTrip/GetAllRequestTrip',
  async ({ callBack }) => {
    console.log("arrayUniqueByKey")
    debugger
    const response = await axios.get('http://localhost:55689/api/RequestTrip');
    callBack(response.data);
    const arrayUniqueByKey = [...new Map(response.data.map(item =>
      [item['group'], item])).values()];
     console.log(arrayUniqueByKey)
    return arrayUniqueByKey;
  }

)
export const GetRequestTripById = createAsyncThunk(
  'RequestTrip/GetRequestTripById',
  async ({ CodeRequest, callBack }) => {
    const response = await axios.get(`http://localhost:55689/api/RequestTrip/${CodeRequest}`);
    callBack(response.data);
    return response.data;
  }

)
//check
export const CreateRequestTrip = createAsyncThunk(
  'RequestTrip/CreateRequestTrip',
  async ({ requesttripe, callBack }) => {
    //console.log('line 46' ,requesttripe);
    const response = await axios.post('http://localhost:55689/api/postRequestAction', requesttripe);
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
export const UpdateRequestTrip = createAsyncThunk(
  'RequestTrip/UpdateRequestTrip',
  async ({requestTrip, t, callBack }) => {
    const response = await axios.put('http://localhost:55689/api/RequestTrip?t='+t, requestTrip);
    callBack(response.data);
    return response.data;
  }

)
export const DeleteRequestTrip = createAsyncThunk(
  'RequestTrip/DeleteRequestTrip',
  async ({ requestTrip, callBack }) => {
    const response = await axios.delete('http://localhost:55689/api/RequestTrip/Deletefromrequest?CodeRequest='+requestTrip.CodeRequest);
    callBack(response.data);
    return response.data;
  }

)


const RequestTripSlice = createSlice({
  name: 'RequestTrip',
  initialState: {
    entities: [],
    selectedTrip: ''
  },
  reducers: {
    setSelectedTrip: (state, action) => {
      state.selectedTrip = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllRequestTrip.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(GetRequestTripById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(CreateRequestTrip.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(UpdateRequestTrip.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
    builder.addCase(DeleteRequestTrip.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })

  },

});

export const {setSelectedTrip} = RequestTripSlice.actions;
export default RequestTripSlice.reducer;