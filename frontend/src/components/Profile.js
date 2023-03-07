import React, { useState , useEffect} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { memo } from "react";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

const Profile = () => {
    const navigate = useNavigate()
    const callDashboardPage =async () => {
        try {
          const res =  axios.get('http://localhost:5500/profile',{ withCredentials: true })
    
          // const data = await res.json()
          if(res.statusCode ===200){
            alert("success")
          }
        } catch (error) {
          console.log(error);
          navigate('/login')
        }
      }
      useEffect(() => {
        callDashboardPage()
      },[])
  return (

    <>
    <Navbar />
  <section style={{ backgroundColor: '#eee'}}>
  <MDBContainer className="py-3">
    <MDBRow>
      <MDBCol lg="3">
        <MDBCard className="mb-4">
          <MDBCardBody className="text-center">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
              className="rounded-circle"
              style={{ width: '150px' }}
              fluid />
            <p className="text-muted mb-1">Full Stack Developer</p>
            {/* <p className="text-muted mb-4">{candidateInfo[0].address}</p> */}
            <div className="d-flex justify-content-center mb-2">
              <MDBBtn>Follow</MDBBtn>
              <MDBBtn outline className="ms-1">Message</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mb-4 mb-lg-0">
          <MDBCardBody className="p-0">
            <MDBListGroup flush className="rounded-3">
              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <MDBIcon fas icon="globe fa-lg text-warning" />
                <MDBCardText>https://mdbootstrap.com</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                <MDBCardText>mdbootstrap</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                <MDBCardText>@mdbootstrap</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                <MDBCardText>mdbootstrap</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                <MDBCardText>mdbootstrap</MDBCardText>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol lg="9">
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Full Name</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                {/* <MDBCardText className="text-muted">{candidateInfo[0].name}</MDBCardText> */}
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Email</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                {/* <MDBCardText className="text-muted" >{candidateInfo[0].email}</MDBCardText> */}
              </MDBCol>
            </MDBRow>
            <hr />

            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Education</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
              {/* {candidateInfo[0].education.map((item) => {return (
           <span>
             <MDBCardText className="text-muted" >{item.degree}</MDBCardText>

           </span>
              )})} */}
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Phone</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                {/* <MDBCardText className="text-muted">{candidateInfo[0].phone}</MDBCardText> */}
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Address</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                {/* <MDBCardText className="text-muted">{candidateInfo[0].address}</MDBCardText> */}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                </MDBProgress>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                </MDBProgress>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
</>)
  
};

export default memo(Profile);
