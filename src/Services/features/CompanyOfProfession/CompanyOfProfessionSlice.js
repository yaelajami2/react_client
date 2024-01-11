import {useNavigate} from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';
const initialState={
ProfessionId :0,
ProfessionalName:"",
Telphone :"",
PriceperHour:0
}
export const GetAllCompanyOfProfession=createAsyncThunk(
  'CompanyOfProfession/GetAllCompanyOfProfession',
  async ({ callBack}) => {
       const response =  await axios.get('http://localhost:55689/api/CompanyOfProfession');
        callBack(response.data);
        return response.data;
    }

)
export const GetCompanyOfProfessionById=createAsyncThunk(
  'CompanyOfProfession/GetCompanyOfProfessionById',
  async ({CompanyOfProfessionid, callBack}) => {
       const response =  await axios.get(`http://localhost:55689/api/CompanyOfProfession/${CompanyOfProfessionid}`);
        callBack(response.data);
        return response.data;
    }

)
//check
export const CreateCompanyOfProfession=createAsyncThunk(
    'CompanyOfProfession/CreateCompanyOfProfession',
    async ({CompanyOfProfessione, callBack}) => {
         const response =  await axios.post(`http://localhost:55689/CompanyOfProfession`,CompanyOfProfessione);
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
export const UpdateCompanyOfProfession=createAsyncThunk(
  'CompanyOfProfession/UpdateCompanyOfProfession',
  async ({CompanyOfProfession, callBack}) => {
       const response =  await axios.put('http://localhost:55689/api/CompanyOfProfession',CompanyOfProfession);
        callBack(response.data);
        return response.data;
    }

)
export const DeleteCompanyOfProfession=createAsyncThunk(
  'CompanyOfProfession/DeleteCompanyOfProfession',
  async ({id, callBack}) => {
       const response =  await axios.delete('http://localhost:55689/api/CompanyOfProfession/Delete',id);
        callBack(response.data);
        return response.data;
    }

)


 const CompanyOfProfessionSlice=createSlice({
    name:'CompanyOfProfession',
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
        builder.addCase(GetAllCompanyOfProfession.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(GetCompanyOfProfessionById.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
      
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(CreateCompanyOfProfession.fulfilled, (state, action) => {
          // Add user to the state array
          state.entities.push(action.payload)
        })
        builder.addCase(UpdateCompanyOfProfession.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
          builder.addCase(DeleteCompanyOfProfession.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
          })
     
      },

});

export default CompanyOfProfessionSlice.reducer;