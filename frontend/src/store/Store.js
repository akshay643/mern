import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from "./cartSlice.js"
import userReducer from './UserSlice';
import cabinReducer from "./CabinSlice"
import BookingReducer from "./TotalBookings"
// import jobReducer from "./jobSlice"
// import memberjobReducer from "./memberJobSlice"
const Store = configureStore({
    reducer:{
        // cart: cartReducer,
        user:userReducer,
        cabinData :cabinReducer,
        booking : BookingReducer
        // job:jobReducer,
        // client:clientReducer,
        // memberJob:memberjobReducer
    },
});

export default Store;
