import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const STATUSES =Object.freeze(  //this will make this immutable
{
    IDLE :'idle',
    ERROR :"error",
    LOADING :"loading"
}
)


const candidateSlice = createSlice({
  name: 'candidate',
  initialState:{
    data:[],
    status: STATUSES.IDLE
  },
  reducers: {
    setCandidates (state, action) {
        state.data=action.payload
        },
    setStatus(state,action) {
        state.status = action.payload
        }
  }
//   extraReducers: (builder) => {
//     builder
//         .addCase(fetchCandidates.pending, (state,action)=> {
//             state.status = STATUSES.LOADING
//         })
//         .addCase(fetchCandidates.fulfilled,(state,action) => {
//             state.data = action.payload
//             state.status =STATUSES.IDLE
//         })
//         .addCase(fetchCandidates.rejected, (state,actions) => {
//             state.status = STATUSES.ERROR
//         })
//   }
});


// /Thunk
export function fetchCandidate(){
    return async function fetchCandidateThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            await fetch("http://127.0.0.1:5500/users/")
            .then(result => result?.json())
            .then(data => dispatch(setCandidates(data)))
            dispatch(setStatus(STATUSES.IDLE))

        } catch (err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


// export const fetchCandidates = createAsyncThunk('candidates/fetch', async()=> {
//     await fetch("http://127.0.0.1:8000/candidates/")
//                 .then(result => result.json())
//                 .then(data => data)

// })

export default candidateSlice.reducer;
export const {setCandidates, setStatus } = candidateSlice.actions;