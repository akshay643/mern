import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const STATUSES =Object.freeze(  //this will make this immutable
{
    IDLE :'idle',
    ERROR :"error",
    LOADING :"loading"
}
)


const cabinSlice = createSlice({
  name: 'cabin',
  initialState:{
    data:[],
    status: STATUSES.IDLE
  },
  reducers: {
    setCabin (state, action) {
        state.data=action.payload
        },
    setStatus(state,action) {
        state.status = action.payload
        }
  }
//   extraReducers: (builder) => {
//     builder
//         .addCase(fetchCabins.pending, (state,action)=> {
//             state.status = STATUSES.LOADING
//         })
//         .addCase(fetchCabins.fulfilled,(state,action) => {
//             state.data = action.payload
//             state.status =STATUSES.IDLE
//         })
//         .addCase(fetchCabins.rejected, (state,actions) => {
//             state.status = STATUSES.ERROR
//         })
//   }
});


// /Thunk
export function fetchCabin(){
    return async function fetchCabinThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            await fetch("http://127.0.0.1:5500/cabin/")
            .then(result => result?.json())
            .then(data => dispatch(setCabin(data)))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


export default cabinSlice.reducer;
export const {setCabin, setStatus } = cabinSlice.actions;