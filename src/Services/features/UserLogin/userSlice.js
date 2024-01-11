import {useNavigate} from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
const initialState={
    UserId:1,
    FirstName:"",
    Mail:"",
    Phone:""
}
export const GetAllUsers=createAsyncThunk(
  'users/GetAllUsers',
  async ({ callBack}) => {
       const response =  await axios.get('http://localhost:55689/api/user');
        callBack(response.data);
        return response.data;
    
    }

)
export const GetUserById=createAsyncThunk(
  'users/GetUserById',
  async ({userid, callBack}) => {
       const response =  await axios.get(`http://localhost:55689/api/user/${userid}`);
        callBack(response.data);
        return response.data;
    }

)
//check
export const CreateUser=createAsyncThunk(
    'users/CreateUser',
    async ({user, callBack}) => {
         const response =  await axios.post(`http://localhost:55689/api/createUser`,user);
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
export const UpdateUser=createAsyncThunk(
  'users/UpdateUser',
  async ({user, callBack}) => {
       const response =  await axios.put('http://localhost:55689/api/user',user);
        callBack(response.data);
        return response.data;
    }

)
export const DeleteUserById=createAsyncThunk(
  'users/DeleteUserById',
  async ({userid, callBack}) => {
       const response =  await axios.delete('http://localhost:55689/api/user/Delete',userid);
        callBack(response.data);
        return response.data;
    }

)


 const userSlice=createSlice({
    name:'users',
    initialState:{
      entities:[],
      UserCookies: {},
    },
    reducers:{
      setUserIdCookies: (state, action) => {
        state.UserCookies = action.payload;

        console.log("after");
      },
    },

    extraReducers: (builder) => {
        builder.addCase(GetAllUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(GetUserById.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
      
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(CreateUser.fulfilled, (state, action) => {
          // Add user to the state array
          state.entities.push(action.payload)
        })
        builder.addCase(UpdateUser.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(DeleteUserById.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
     
      },

});
export const {setUserIdCookies} = userSlice.actions;
export default userSlice.reducer;