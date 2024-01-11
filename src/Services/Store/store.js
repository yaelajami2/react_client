import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../features/UserLogin/userSlice';
import TripPriceSlice from '../features/TripPrice/TripPriceSlice';
import CompanyOfProfessionSlice from '../features/CompanyOfProfession/CompanyOfProfessionSlice';
import RequestTripSliceSlice from '../features/RequestTripSlice/RequestTripeSlice';
import TripeSiteSlice from '../features/TripeSite/TripeSiteSlice';
export const store=configureStore({
    reducer:{
          user:userSlice,
          TripPrice:TripPriceSlice,
          CompanyOfProfession:CompanyOfProfessionSlice,
          RequestTrip:RequestTripSliceSlice,
          TripeSite:TripeSiteSlice

    }
})