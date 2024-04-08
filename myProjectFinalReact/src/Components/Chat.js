import React, { useEffect, useRef, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { Avatar } from "@mui/material";
import "../Css/Chat.css";
import { useSelector } from "react-redux";
import { ZoomIn } from "@mui/icons-material";

export default function App() {
  const [send, setSend] = useState(false);
  const [question, setQuestion] = useState("");
  const inputRef = useRef(null);
  const patient = useSelector((state) => state.login.patient);

  const sendMessage = () => {
    console.log(question);
    // setQuestion("");
    setSend(true);
  };
  useEffect(() => {
    // debugger
    console.log(patient);
    // console.log(patient.appeals);
  });
  return (
    <>
      {patient &&
        patient.appeals &&
        patient.appeals.map((app, val) => {
          // return (
          //   <li className="d-flex justify-content-between mb-4">
          //     {/* <img
          //       // src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
          //       alt="avatar"
          //       className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
          //       width="60"
          //     /> */}
          //     <Avatar
          //       sx={{ bgcolor: "#f2a421", direction: "rtl" }}
          //       aria-label="recipe"
          //     >
          //       {/* <img
          //                 //  src={therapist.urlImage}
          //                 // src={therapist.pic}
          //                 alt="nn"
          //                 style={{ width: '100%', height: '100%', objectFit: 'cover', fontFamily: "-moz-initial", fontSize: '500px' }}
          //               /> */}
          //     </Avatar>
          //     <MDBCard>
          //       <MDBCardHeader className="d-flex justify-content-between p-3">
          //         <p className="fw-bold mb-0">Brad Pitt</p>
          //         <p className="text-muted small mb-0">
          //           <MDBIcon far icon="clock" /> 12 mins ago
          //         </p>
          //       </MDBCardHeader>
          //       <MDBCardBody>
          //         <p className="mb-0">
          //         app.id
          //         </p>
          //       </MDBCardBody>
          //     </MDBCard>
          //   </li>
          // );
          return(<h1>{app.id}</h1>)
        })}
      <MDBContainer fluid className="py-5">
        <MDBRow style={{ backgroundColor: "#eee" }}>
          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              <li className="d-flex justify-content-between mb-4">
                {/* <img
                // src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              /> */}
                <Avatar
                  sx={{ bgcolor: "#f2a421", direction: "rtl" }}
                  aria-label="recipe"
                >
                  {/* <img
                          //  src={therapist.urlImage}
                          // src={therapist.pic}
                          alt="nn"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', fontFamily: "-moz-initial", fontSize: '500px' }}
                        /> */}
                </Avatar>
                <MDBCard>
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li class="d-flex justify-content-between mb-4">
                <MDBCard className="w-100">
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p class="fw-bold mb-0">Lara Croft</p>
                    <p class="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    {/* <p className="mb-0">{app.question}</p> */}
                  </MDBCardBody>
                </MDBCard>
                <Avatar
                  sx={{ bgcolor: "#15a399", direction: "rtl" }}
                  aria-label="recipe"
                >
                  {/* <img
                          //  src={therapist.urlImage}
                          // src={therapist.pic}
                          alt="nn"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', fontFamily: "-moz-initial", fontSize: '500px' }}
                        /> */}
                </Avatar>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <Avatar
                  sx={{ bgcolor: "#f2a421", direction: "rtl" }}
                  aria-label="recipe"
                >
                  {/* <img
                          //  src={therapist.urlImage}
                          // src={therapist.pic}
                          alt="nn"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', fontFamily: "-moz-initial", fontSize: '500px' }}
                        /> */}
                </Avatar>
                <MDBCard>
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              {send && (
                <li class="d-flex justify-content-between mb-4">
                  <MDBCard className="w-100">
                    <MDBCardHeader className="d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Lara Croft</p>
                      <p class="text-muted small mb-0">
                        <MDBIcon far icon="clock" /> 13 mins ago
                      </p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">{question}</p>
                    </MDBCardBody>
                  </MDBCard>
                  <Avatar
                    sx={{ bgcolor: "#15a399", direction: "rtl" }}
                    aria-label="recipe"
                  >
                    {/* <img
                          //  src={therapist.urlImage}
                          // src={therapist.pic}
                          alt="nn"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', fontFamily: "-moz-initial", fontSize: '500px' }}
                        /> */}
                  </Avatar>
                </li>
              )}
              <li className="bg-white mb-3">
                <MDBTextArea
                  label="Message"
                  id="textAreaExample"
                  rows={4}
                  inputRef={inputRef}
                  onChange={() => {
                    setQuestion(inputRef.current.value);
                  }}
                />
              </li>

              <MDBBtn
                color="info"
                rounded
                className="float-end"
                onClick={() => sendMessage()}
              >
                Send
              </MDBBtn>
            </MDBTypography>
          </MDBCol>
        </MDBRow>

        {/* <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
          Member
        </h5>

        <MDBCard style={{}}>
          <MDBCardBody>
            <MDBTypography listUnStyled className="mb-0">
              <li
                className="p-2 border-bottom"
                style={{ backgroundColor: "#eee" }}
              >
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">John Doe</p>
                      <p className="small text-muted">Hello, Are you there?</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger float-end">1</span>
                  </div>
                </a>
              </li>
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Danny Smith</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">5 mins ago</p>
                  </div>
                </a>
              </li>
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Alex Steward</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Yesterday</p>
                  </div>
                </a>
              </li>
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Ashley Olsen</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Yesterday</p>
                  </div>
                </a>
              </li>
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Kate Moss</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Yesterday</p>
                  </div>
                </a>
              </li>
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Lara Croft</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Yesterday</p>
                  </div>
                </a>
              </li>
              <li className="p-2">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">5 mins ago</p>
                    <span className="text-muted float-end">
                      <MDBIcon fas icon="check" />
                    </span>
                  </div>
                </a>
              </li>
            </MDBTypography>
          </MDBCardBody>
        </MDBCard>
      </MDBCol> */}
      </MDBContainer>
    </>
  );
}
