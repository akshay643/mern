import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from "axios"

export const STATUSES =Object.freeze(  //this will make this immutable
{
    IDLE :'idle',
    ERROR :"error",
    LOADING :"loading"
}
)


const TotalBookingSlice = createSlice({
  name: 'Total Bookings',
  initialState:{
    data:[],
    status: STATUSES.IDLE
  },
  reducers: {
    setTotalBookings (state, action) {
        state.data=action.payload
        },
    setStatus(state,action) {
        state.status = action.payload
        }
  }
//   extraReducers: (builder) => {
//     builder
//         .addCase(fetchTotalBookingss.pending, (state,action)=> {
//             state.status = STATUSES.LOADING
//         })
//         .addCase(fetchTotalBookingss.fulfilled,(state,action) => {
//             state.data = action.payload
//             state.status =STATUSES.IDLE
//         })
//         .addCase(fetchTotalBookingss.rejected, (state,actions) => {
//             state.status = STATUSES.ERROR
//         })
//   }
});


// /Thunk
export function fetchTotalBookings(){
    return async function fetchTotalBookingsThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
        //    const res = await axios.get("/booking")
        //    dispatch(setTotalBookings(res.data))
            await fetch("http://127.0.0.1:5500/booking")
            .then(result => result?.json())
            .then(data => dispatch(setTotalBookings(data)))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


// export const fetchTotalBookingss = createAsyncThunk('candidates/fetch', async()=> {
//     await fetch("http://127.0.0.1:8000/candidates/")
//                 .then(result => result.json())
//                 .then(data => data)

// })

export default TotalBookingSlice.reducer;
export const {setTotalBookings, setStatus } = TotalBookingSlice.actions;