// import React, { useContext, useState } from 'react'
// import withAuth from '../utils/withAuth'
// import { useNavigate } from 'react-router-dom'
// import "../App.css";
// import { Button, IconButton, TextField } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from '../contexts/AuthContext';

// function HomeComponent() {


//     let navigate = useNavigate();
//     const [meetingCode, setMeetingCode] = useState("");


//     const {addToUserHistory} = useContext(AuthContext);
//     let handleJoinVideoCall = async () => {
//         await addToUserHistory(meetingCode)
//         navigate(`/${meetingCode}`)
//     }

//     return (
//         <>

//             <div className="navBar">

//                 <div style={{ display: "flex", alignItems: "center" }}>

//                     <h2>Next-Meet-Call</h2>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton onClick={
//                         () => {
//                             navigate("/history")
//                         }
//                     }>
//                         <RestoreIcon />
//                     </IconButton>
//                     <p>History</p>

//                     <Button onClick={() => {
//                         localStorage.removeItem("token")
//                         navigate("/auth")
//                     }}>
//                         Logout
//                     </Button>
//                 </div>


//             </div>


//             <div className="meetContainer">
//                 <div className="leftPanel">
//                     <div>
//                         <h2>Providing Quality Video Call Just Like Quality Education</h2>

//                         <div style={{ display: 'flex', gap: "10px" }}>

//                             <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
//                             <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

//                         </div>
//                     </div>
//                 </div>
//                 <div className='rightPanel'>
//                     <img srcSet='/logo3.png' alt="" />
//                 </div>
//             </div>
//         </>
//     )
// }


// export default withAuth(HomeComponent)



// import React, { useContext, useState } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import { Button, IconButton, TextField } from "@mui/material";
// import RestoreIcon from "@mui/icons-material/Restore";
// import { AuthContext } from "../contexts/AuthContext";

// function HomeComponent() {
//   const navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const { addToUserHistory } = useContext(AuthContext);

//   const handleJoinVideoCall = async () => {
//     if (!meetingCode.trim()) return;
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <div className="navBar d-flex justify-content-between align-items-center px-4 py-3">
//         <h2 className="text-warning fw-bold m-0">Next-Meet-Call</h2>

//         <div className="d-flex align-items-center gap-2">
//           <IconButton
//             color="warning"
//             onClick={() => navigate("/history")}
//             title="View History"
//           >
//             <RestoreIcon />
//           </IconButton>
//           <p className="m-0 text-light small">History</p>

//           <Button
//             variant="contained"
//             color="error"
//             size="small"
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/auth");
//             }}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="meetContainer container-fluid d-flex flex-wrap align-items-center justify-content-center px-4 py-5">
//         {/* Left Section */}
//         <div className="leftPanel text-light text-center text-md-start mb-4 mb-md-0">
//           <h2 className="fw-bold mb-4">
//             Providing Quality Video Calls <br /> Just Like Quality Education
//           </h2>

//           <div className="joinBox d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-md-start gap-3">
//             <TextField
//               onChange={(e) => setMeetingCode(e.target.value)}
//               id="outlined-basic"
//               label="Meeting Code"
//               variant="outlined"
//               color="warning"
//               size="medium"
//               className="meeting-input"
//             />
//             <Button
//               onClick={handleJoinVideoCall}
//               variant="contained"
//               color="warning"
//               className="join-btn fw-semibold"
//             >
//               Join
//             </Button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="rightPanel text-center">
//           <img
//             src="/logo3.png"
//             alt="Video Meeting Illustration"
//             className="img-fluid home-image"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default withAuth(HomeComponent);



import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#ffb300",
              letterSpacing: 1,
            }}
          >
            Next-Meet
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="warning"
              onClick={() => navigate("/history")}
              title="View History"
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
            >
              <RestoreIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: "#f5f5f5" }}>
              History
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
              sx={{ fontWeight: "bold", borderRadius: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 6, md: 10 },
          gap: { xs: 6, md: 0 },
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            maxWidth: 500,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
              background: "linear-gradient(90deg, #ffb300, #ff9100)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connect Seamlessly.  
            Learn Effortlessly.
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "#f0f0f0" }}>
            Experience smooth, secure, and high-quality video calls built for
            collaboration and education — anytime, anywhere.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              value={meetingCode}
              label="Enter Meeting Code"
              variant="outlined"
              color="warning"
              size="medium"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  color: "#333",
                  borderRadius: 10,
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#555",
                },
              }}
              sx={{
                width: { xs: "100%", sm: "250px" },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#ffb300",
                },
              }}
            />

            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              color="warning"
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Join
            </Button>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: { xs: "80%", md: "45%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo3.png"
            alt="Video Meeting Illustration"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default withAuth(HomeComponent);
