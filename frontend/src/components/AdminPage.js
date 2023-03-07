import React,{useMemo, useState, useEffect} from 'react'
import Navbar from '../Navbar'
import "./Adminpage.css"
import {SlCalender} from "react-icons/sl"
import {FaUserCheck} from "react-icons/fa"
import { useSelector } from 'react-redux'
import MaterialReactTable from "material-react-table";
import axios from "axios"
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
  } from '@mui/material';
import {AiTwotoneEdit,AiFillDelete} from "react-icons/ai"
import {useNavigate} from "react-router-dom"

const AdminPage = () => {
  const navigate =useNavigate()
    const totalBookings = useSelector(state => state.booking.data)
    const totalUsers = useSelector(state => state.user.data)
    const [validationErrors, setValidationErrors] = useState({});
    let admin = localStorage.getItem("role")

    const callAboutPage = async () => {
      try {
        const res = await axios.get('/admin', {
          withCredentials:true
        })
        const data = await res.status
        if(!data.status===200){
          alert(res.error)
        }
      } 
      catch (error) {
        console.log(error);
        navigate('/')
      }
    }
    useEffect(() => {
      callAboutPage()
      
    },[])
    const columnData = useMemo(
        () => [
          
          {
            accessorKey: "_id",
            header: "ID",
            size: 40,
          },
          {
            accessorFn: (row) => `${row?.name}`,
            header: "Name",
            size: 150,
            columnFilterModeOptions:[
              'fuzzy',          
            ]
          },
          {
            accessorKey: "email",
            header: "email",
            size: 120,
            columnFilterModeOptions:[
              'fuzzy'
            ]
          },
         
          {
            accessorKey: "phone",
            header: "Phone",
            size: 220,
            columnFilterModeOptions:[
              'fuzzy',          
            ]
          },
          
          {
            accessorFn: (row) => {
                return(row.role === 1 ? "Not Admin" :"Admin")
            }
          ,
            header: "Role",
            size: 220,
            columnFilterModeOptions:[
              'fuzzy',          
            ]
          },
        ],
        []
      );


  return (<>
    <Navbar />
    <div className='m-4'>
        <div className='row'>
        <div class="col-xxl-4 col-md-6">
              <div class="card info-card revenue-card">

                <div class="card-body">
                  <h5 class="card-title">Bookings <span>| Total</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle fs-1 d-flex align-items-center justify-content-center">
                      <SlCalender  style={{ color: '#008080', size: '50px' }}/>
                    </div>
                    <div class="ps-3 fs-2 fw-bold">
                      {totalBookings.length}
                      {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                    </div>
                  </div>
                </div>

              </div>
        </div>
        <div class="col-xxl-4 col-md-6">
              <div class="card info-card revenue-card">

                <div class="card-body">
                  <h5 class="card-title">Users <span>| Total</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle fs-1 d-flex align-items-center justify-content-center">
                      <FaUserCheck style={{ color: '#008080', size: '50px' }} />
                    </div>
                    <div class="ps-3 fs-2 fw-bold">
                      {totalUsers.length}
                      {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                    </div>
                  </div>
                </div>

              </div>
        </div>

        </div> 

        <MaterialReactTable
        columns={columnData}
        data={totalUsers}
        // enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableClickToCopy
        enableStickyHeader
        enablePinning
        enableRowSelection={true}
        enableRowActions 

        renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <AiTwotoneEdit 
                onClick={() => table.setEditingRow(row)}
                >
                    
                  {/* <Edit /> */}
                </AiTwotoneEdit>
              </Tooltip>
              {/* <Tooltip arrow placement="right" title="Delete">
                <AiFillDelete color="error" 
                // onClick={() => handleDeleteRow(row)}
                >
                  {/* <Delete />
                </AiFillDelete>
              </Tooltip> */}
            </Box>
          )}
        // globalFilterFn="fuzzy"
        // initialState={{ showColumnFilters: false}}
     
      />    
    </div>
  </>
  )
}

export default AdminPage