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

const Booking = () => {
    const dispatch = useDispatch()

    const userData = useSelector((state) => state.user.data)

    const user_id = localStorage.getItem("user_id")

    const userInfo = userData.filter((val) => val._id ===user_id)

    const [events, setEvents] = useState([])
    
    const [event1, setEvent1] = useState([])
    
    const [title, setTitleData] = useState()

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchEvents = async () => {
          const response = await axios.get('http://localhost:5500/booking');
          const events = response.data.map(event => ({
            id:event._id,
            title: event.title,
            start:  new Date(event.start),
            end:   new Date(event.end),    
            allDay: event.allDay,
            description :event.description,
            resource:event.resource
          }));
          setEvents(events);
        };
        fetchEvents();
        dispatch(fetchCandidate())

      }, []);

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 300,
        bgcolor: 'background.paper',
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius:"10px",
        p: 4,
      };

  

    const handleSelect = ({ start, end , title, allDay}) => {
        // Check if the selected time slot overlaps with any booked event
        const overlap = events.some(event => {
          return (
            (start >= event.start && start < event.end) ||
            (end > event.start && end <= event.end) ||
            (start <= event.start && end >= event.end)
          );
        });

        if (overlap) {
          alert('This time slot is already booked!');
        } else {
            handleOpen(true)
              const newEvent = {
                  start,
                  end,
                  allDay:allDay ? true :false
                  }
            setEvent1(newEvent);
        //   }
        }
      };


    const PostBooking =() => {
    const res =axios.post(`/booking/${user_id}`, {...event1,title : `${title} created by ${userInfo[0].name}`, resource:userInfo[0]._id, allDay:isChecked})
    if(res.message = "created Successfully"){
        alert("Booking Done")
        handleClose()
        // window.location.reload()
    }
    
}

    const handleInput =(e) => {    //set the title value using a modal input
        setTitleData(e.target.value)
    }

// ========handle All day============
const [isChecked, setIsChecked] = useState(false)
const handleAllDay =(e) => {
    setIsChecked(e.target.checked);
}

    // =================Edit Event==============
    const [editEven, setEditEvent] = useState([{
        title:"",
        start:"",
        end:""
    }])

  
    const handleEventEditInput =(e) => {
        const { name, value } = e.target;
        setEditEvent((preValue) => {
            return {
              ...preValue,
              [name]: value,
              };
          });
      
      }

    const [openedit, setOpenEdit] = useState(false)
    const [auto_id, setAuto_id] = useState()
    const handleClose1 = () => setOpenEdit(false);
    const onSelectEvent = (event) => {
        if(event.resource !== userInfo[0]._id){
            alert("you are not authorised to make any changes to this Event")
        } else{
            setOpenEdit(true)
            setEditEvent(event)
            setAuto_id(event.id)
        }
    }
  return (<>
      <Navbar/>
      <div className='pt-2'>
             <Calendar
                selectable
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectSlot={handleSelect}
                style={{ height: '100vh'}}
                onSelectEvent={onSelectEvent}
                step={10}
                toolbar={true}
                timeslots={6}
                />

                {/* ================Post Modal================= */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >

                            <Box sx={style}>
                               <h3>
                                 Create New Event
                                </h3>
                            
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <form className='m-0 p-0'>
                                <label className='col-form-label'>Title</label>
                               <input className='form-control' type="text" onChange={handleInput} value={title} />
                               <div class="form-check mt-3">
                                    <input  checked={isChecked} onChange ={handleAllDay} class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        All day
                                </label>
                                </div>
                               <button className='btn btn-primary mt-3 w-100' onClick={(e) => {
                                return(
                                e.preventDefault(),
                                PostBooking()
                                )

                               }}>Create</button>

                                </form>
                            </Typography>           
                            </Box>  
                        </Modal>

                        {/* ==============Edit Modal=============== */}
                        <Modal
                            open={openedit}
                            onClose={handleClose1}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box sx={style}>
                                <h3>
                                    Set New Event
                                    </h3>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <form className='m-0 p-0'>
                                    <label className='col-form-label'>Title</label>
                                    
                                    <input
                                    //  value={editEven.title} 
                                     onChange={handleEventEditInput} name="title" className='form-control' type="text"  />
                                   <div className='row mt-3'>
                                    <div className='col-12 col-lg-4'>
                                        
                                    <label for="startDate">Date</label>
                                    <input  onChange={handleEventEditInput} name="date" id="startDate" class="form-control" type="date" />
                                    </div>
                                    <div className='col-12 col-lg-4'>

                                    <label for="startDate">Start Time</label>
                                    <input 
                                    // value={new Date(editEven.start).toLocaleTimeString("en-US", {hour12: false})} 
                                    onChange={handleEventEditInput} name="start" id="startDate" class="form-control" type="time" />
                                    </div>
                                    <div className='col-12 col-lg-4'>

                                    <label for="startDate">End Time</label>
                                    <input 
                                    // value={new Date(editEven.end).toLocaleTimeString("en-US", {hour12: false})} 
                                    onChange={handleEventEditInput}  name="end" id="startDate" class="form-control" type="time" />
                                    </div>


                                   </div>
                               <div className='d-flex align-items-center'>
                                <button onClick={async (e) => {
                                          e.preventDefault()
                                          const eventFinal = {
                                            start: new Date(`${editEven.date}T${editEven.start}:00`),
                                            end: new Date(`${editEven.date}T${editEven.end}:00`),
                                            title: editEven.title
                                          }
                                          await axios.put(`/booking/${auto_id}`, eventFinal).then()
                                          }} 
                                    className='btn btn-primary mt-3 mx-2' >Submit</button>
                                    
                                    <button onClick={async () => {
                                        const res = await axios.delete(`/booking/${auto_id}`)
                                        // console.log(res.message)

                                    }} className='btn btn-danger mt-auto'> Delete This Event</button>
                               </div>

                                </form>
                            </Typography>
                            
                            </Box>  
                        </Modal>
                
</div>
</>
  )
}

export default Booking