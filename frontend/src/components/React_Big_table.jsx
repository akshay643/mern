import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../Navbar';
import axios from "axios"
import { get } from 'mongoose';
import 'moment-timezone';
import { Event } from 'react-big-calendar';
import BookingEdit from './BookingEdit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidate } from "../store/UserSlice";

moment.tz.setDefault('Asia/Kolkata');

const localizer = momentLocalizer(moment);
const React_Big_table = () => {
  return (<h1>Hello</h1>)
//     <div className='pt-2'>
//              <Calendar
//                 selectable
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 defaultView="week"
//                 onSelectSlot={handleSelect}
//                 style={{ height: '100vh'}}
//                 onSelectEvent={onSelectEvent}
//                 step={10}
//                 toolbar={true}
//                 timeslots={6}
//                 />

//                 {/* ================Post Modal================= */}
//                         <Modal
//                             open={open}
//                             onClose={handleClose}
//                             aria-labelledby="modal-modal-title"
//                             aria-describedby="modal-modal-description"
//                             >

//                             <Box sx={style}>
//                                <h3>
//                                  Create New Event
//                                 </h3>
                            
//                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                 <form className='m-0 p-0'>
//                                 <label className='col-form-label'>Title</label>
//                                <input className='form-control' type="text" onChange={handleInput} value={title} />
//                                <div class="form-check mt-3">
//                                     <input  checked={isChecked} onChange ={handleAllDay} class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" />
//                                     <label class="form-check-label" for="flexRadioDefault2">
//                                         All day
//                                 </label>
//                                 </div>
//                                <button className='btn btn-primary mt-3 w-100' onClick={(e) => {
//                                 return(
//                                 e.preventDefault(),
//                                 PostBooking()
//                                 )

//                                }}>Create</button>

//                                 </form>
//                             </Typography>           
//                             </Box>  
//                         </Modal>

//                         {/* ==============Edit Modal=============== */}
//                         <Modal
//                             open={openedit}
//                             onClose={handleClose1}
//                             aria-labelledby="modal-modal-title"
//                             aria-describedby="modal-modal-description"
//                             >
//                             <Box sx={style}>
//                                 <h3>
//                                     Set New Event
//                                     </h3>
//                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                 <form className='m-0 p-0'>
//                                     <label className='col-form-label'>Title</label>
                                    
//                                     <input
//                                     //  value={editEven.title} 
//                                      onChange={handleEventEditInput} name="title" className='form-control' type="text"  />
//                                    <div className='row mt-3'>
//                                     <div className='col-12 col-lg-4'>
                                        
//                                     <label for="startDate">Date</label>
//                                     <input  onChange={handleEventEditInput} name="date" id="startDate" class="form-control" type="date" />
//                                     </div>
//                                     <div className='col-12 col-lg-4'>

//                                     <label for="startDate">Start Time</label>
//                                     <input 
//                                     // value={new Date(editEven.start).toLocaleTimeString("en-US", {hour12: false})} 
//                                     onChange={handleEventEditInput} name="start" id="startDate" class="form-control" type="time" />
//                                     </div>
//                                     <div className='col-12 col-lg-4'>

//                                     <label for="startDate">End Time</label>
//                                     <input 
//                                     // value={new Date(editEven.end).toLocaleTimeString("en-US", {hour12: false})} 
//                                     onChange={handleEventEditInput}  name="end" id="startDate" class="form-control" type="time" />
//                                     </div>


//                                    </div>
//                                <div className='d-flex align-items-center'>
//                                 <button onClick={async (e) => {
//                                           e.preventDefault()
//                                           const eventFinal = {
//                                             start: new Date(`${editEven.date}T${editEven.start}:00`),
//                                             end: new Date(`${editEven.date}T${editEven.end}:00`),
//                                             title: editEven.title
//                                           }
//                                           await axios.put(`/booking/${auto_id}`, eventFinal).then()
//                                           }} 
//                                     className='btn btn-primary mt-3 mx-2' >Submit</button>
                                    
//                                     <button onClick={async () => {
//                                         const res = await axios.delete(`/booking/${auto_id}`)
//                                         // console.log(res.message)

//                                     }} className='btn btn-danger mt-auto'> Delete This Event</button>
//                                </div>

//                                 </form>
//                             </Typography>
                            
//                             </Box>  
//                         </Modal>
                
// </div>
  
}

export default React_Big_table