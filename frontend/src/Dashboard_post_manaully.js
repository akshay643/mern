import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { fetchCandidate } from "./store/UserSlice";
import axios from "axios"
import { FcManager } from 'react-icons/fc';
import {MdOutlineCabin} from 'react-icons/md'
import Navbar from "./Navbar";
import {useCookies} from "react-cookie"
import { fetchCabin } from "./store/CabinSlice";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { get } from 'mongoose';
import 'moment-timezone';
import { Event } from 'react-big-calendar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { fetchTotalBookings } from "./store/TotalBookings";


// =========snackbar ===

moment.tz.setDefault('Asia/Kolkata');

const localizer = momentLocalizer(moment);
const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const cabinData = useSelector((state) => state.cabinData.data)
  const [cabinInfo, setCabinInfo] = useState([cabinData])
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const getAllBookings = async () => {
    const res = await axios.get('/booking')
    const eventsFinalData = res.data.map(event => ({
      id:event._id,
      title: event.title,
      start:  new Date(event.start),
      end:   new Date(event.end),    
      allDay: event.allDay,
      description :event.description,
      resource:event.resource
    }));
  setDataEvent(eventsFinalData)
setCabinId()  }
  useEffect(()=> {
    // const verifyUser = async()=> {
    //   if(!cookies.jwt){
    //     navigate('/')
    //   }else{
    //     const data = await axios.get('http://localhost:5500/dashboard',{},
    //     {
    //       withCredentials:true
    //     })
    //     console.log(data);
        // if(!data.status){
        //   removeCookie('jwt')
        //   navigate('/')
        // }else{
        //   alert(`Hi ${data.user}`)
        // }
      // }
    // }
        // verifyUser()
        getAllBookings()
        dispatch(fetchCandidate())
        dispatch(fetchCabin())

  },[])



  // =========Get all cabins===========



  // const callAboutPage = async () => {
  //   try {


  //     const url = "http://localhost:5500/dashboard"
  //     const res = await axios.get(url)
  //     // const res = fetch(url,{
  //     //   method:"GET",
  //     //   headers:{
  //     //     Accept:"application/json",
  //     //     "Content-Type":"application/json"
  //     //   },
  //     //   // credentials:"include"
  //     // }).then( result => result.json()).then(data=> console.log(data))

  //     const data = await res.json
  //     console.log(data);
  //     // console.log(data);
  //     // if(!res.status===200){
  //     //   alert(res.error)
  //     // }
  //   } 
  //   catch (error) {
  //     console.log(error);
  //     navigate('/')
  //   }
  // }
  // useEffect(() => {
  //   callAboutPage();
  //   dispatch(fetchCandidate())
    
  // },[])
// ========================
// =====Get booking with ID==========
const [eventData, setDataEvent]= useState([]) //to store the API response afert clicking on Cabin

const userData = useSelector((state) => state.user.data)

const user_id = localStorage.getItem("user_id")

const userInfo = userData.filter((val) => val._id ===user_id)

const [events, setEvents] = useState([])

const [event1, setEvent1] = useState([])

const [title, setTitleData] = useState()

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [events1, setEvents1] = useState([]);

  const fetchData = async () => {
    const response = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime',
    });
    const events = response.result.items.map((event) => ({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      title: event.summary,
    }));
    setEvents1(events);
    console.log(events)
  };



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
    getAllBookings()
    dispatch(fetchCandidate())
    dispatch(fetchTotalBookings())
    fetchData();
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

  //To enter the date and time manually for creating a event


const handleSelect = ({ start, end , allDay, cabin_info, _id}) => {
    // Check if the selected time slot overlaps with any booked event
    const now = new Date()
    const cabinEvents = eventData.filter((event) => event.cabin_info === cabin_info);
    const overlap = cabinEvents.some((event) => {
      return (
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start <= event.start && end >= event.end)
      );
    });
    // const overlap = events.some(event => {
    //   return (
    //     (start >= event.start && start < event.end) ||
    //     (end > event.start && end <= event.end) ||
    //     (start <= event.start && end >= event.end)
    //   );
    // });
    if (start <now){
      alert("please select current date")
    }
    else
     if(cabinId === undefined  || cabinId === "allbookings"){
      alert("please select Cabin First")
    }
    else if (overlap ) {
      alert('This time slot is already booked!');
    }

    else {
        handleOpen(true)
          const newEvent = {
              start,
              end,
              title:eventData2,
              allDay:allDay ? true :false
              }


              // setEvent1(newEvent);
              setEvent1(newEvent);
              
        // setDataEvent2({...newEvent,setDataEvent2})

    //   }
    }
  };


//  =========Posting an event



// const PostBooking =() => {

// const res =axios.post(`/booking/${user_id}`, {...event1,title : `${title} created by ${userInfo[0].name}`, resource:userInfo[0]._id, allDay:isChecked, cabin_info:cabinId})
// if(res.message = "created Successfully"){
//     alert("Booking Done")
//     handleClose()
//     window.location.reload()
// }

// }


//post event
const [postEvent, setPostEvent] = useState([{
  title:"",
  start:"",
  end:""
}])

const handleInput =(e) => {
  const { name, value } = e.target;
  setPostEvent((preValue) => {
      return {
        ...preValue,
        [name]: value,
        };
    });
    console.log(postEvent)

}

//end post Event


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

  if(userInfo[0].role === 2){  //check if the user is admin or not( admin role id = 2)
    setOpenEdit(true)
    setEditEvent(event)
    setAuto_id(event.id)
  }
    if(event.resource !== userInfo[0]._id && userInfo[0].role !== 2){
        alert("you are not authorised to make any changes to this Event")
    } else
    {
        setOpenEdit(true)
        setEditEvent(event)
        setAuto_id(event.id)
    }
}
// ======Set Time Range
const today = new Date();
// Set the minimum selectable date to today
// const minDate = moment(today).toDate();
const minDate = moment(today).startOf('month').toDate();
// ====================Using Select=========
const [selectedValue, setSelectedValue] = useState('');
const [BookingData, setBookingData] = useState([])
const [eventData2, setDataEvent2]= useState([]) 

const [cabinId, setCabinId] = useState()

const handleSelectChange = async(event) => {
  const selectedValue = event.target.value;
  setCabinId(selectedValue)
  if(selectedValue === "allBookings"){
    getAllBookings()
  }else{

    const res =await axios.get(`/cabin/booking/${selectedValue}`)
    const eventsFinalData = res.data.map(event => ({
          id:event._id,
          title: event.title,
          start:  new Date(event.start),
          end:   new Date(event.end),    
          allDay: event.allDay,
          description :event.description,
          resource:event.resource
        }));
      setDataEvent(eventsFinalData)
      setDataEvent2(eventsFinalData.title)
  }
};


// ====Coloring====
const eventStyleGetter = (event, start, end, isSelected,  ) => {
  const style = {
    minWidth: '100%'
  };
  return {
    style: style
  };
};

  return (
      <div>
        <Navbar />
        <main id="main" class="main p-3">
            <div class="pagetitle">
              <h1>Booking Dashboard</h1>
              {/* <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav> */}
            </div>

            <section class="section dashboard">
              <label className="fw-bold fs-4" style={{color:"#008080"}}>Select Cabin</label>
            <select class="form-select"  style={{color:"#fff", backgroundColor:"#008080"}} aria-label="All Booking"  onChange={handleSelectChange}>
              <option value="allBookings" selected>All Bookings</option>
             {cabinData.map((item) => {
              return(<option value={item._id} onSelectSlot={() => alert()}>{item.name}</option>   )
             })}
          </select>
            </section>
        </main>
        <div className='pt-2'>
             <Calendar
                selectable 
                // eventPropGetter={eventStyleGetter}
                min={
                  new Date(
                    today.getFullYear(), 
                    today.getMonth(), 
                    today.getDate(), 
                    9
                  )
                }
                max={
                  new Date(
                    today.getFullYear(), 
                    today.getMonth(), 
                    today.getDate(), 
                    18
                  )}
                eventPropGetter={eventStyleGetter}
                // date={minDate}
                localizer={localizer}
                events={eventData}
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
                               <h6>
                                 Create New Event
                                </h6>
                            
                            <Typography id="modal-modal-title" variant="h6">
                                {/* <form className='m-0 p-0'>
                                <label className='col-form-label fs-6'>Title</label>
                               <input className='form-control' type="text" onChange={handleInput} value={title} />
                               <input />
                               <div class="form-check mt-3">
                                    <input  checked={isChecked} onChange ={handleAllDay} class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label class="form-check-label fs-6" for="flexRadioDefault2">
                                        All day
                                </label>
                                </div>
                               <button className='btn btn-primary mt-3 w-100' onClick={(e) => {
                                return(
                                e.preventDefault(),
                                PostBooking()
                                )

                               }}>Create</button>

                                </form> */}


<form className='m-0 p-0'>
                                    <label className='col-form-label'>Title</label>
                                    
                                    <input
                                    //  value={editEven.title} 
                                     onChange={handleInput} name="title" className='form-control' type="text"  />
                                   <div className='row mt-3'>
                                    <div className='col-12 col-lg-4'>
                                        
                                    <label for="startDate">Date</label>
                                    <input  onChange={handleInput} name="date" id="startDate" class="form-control" type="date" />
                                    </div>
                                    <div className='col-12 col-lg-4'>

                                    <label for="startDate">Start Time</label>
                                    <input 
                                    // value={new Date(editEven.start).toLocaleTimeString("en-US", {hour12: false})} 
                                    onChange={handleInput} name="start" id="startDate" class="form-control" type="time" />
                                    </div>
                                    <div className='col-12 col-lg-4'>

                                    <label for="startDate">End Time</label>
                                    <input 
                                    // value={new Date(editEven.end).toLocaleTimeString("en-US", {hour12: false})} 
                                    onChange={handleInput}  name="end" id="startDate" class="form-control" type="time" />
                                    </div>


                                   </div>
                               <div className='d-flex align-items-center'>
                                <button onClick={async (e) => {
                                          e.preventDefault()
                                          const eventFinal = {
                                            start: new Date(`${postEvent.date}T${postEvent.start}:00`),
                                            end: new Date(`${postEvent.date}T${postEvent.end}:00`),
                                            title: postEvent.title
                                          }

                                          
                                          {
                                            const res =axios.post(`/booking/${user_id}`, {...eventFinal, resource:userInfo[0]._id, allDay:isChecked, cabin_info:cabinId})

                                            console.log("red", eventFinal[0])
                                            if(res.message = "created Successfully"){
                                                alert("Booking Done")
                                                handleClose()
                                                window.location.reload()
                                            }
                                            
                                            }
                                          }
                                          } 
                                    className='btn btn-primary mt-3 mx-2' >Submit</button>
                                    
                                    
                               </div>

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
                                          const res = await axios.put(`/booking/${auto_id}`, eventFinal)
                                          if(res.data.message = "update successfully"){
                                            alert(res.data.message)
                                            setOpenEdit(false)
                                          }
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
    </div>
  )
}

export default Dashboard