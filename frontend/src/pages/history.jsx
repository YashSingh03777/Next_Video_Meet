// import React, { useEffect, useState, useContext } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { IconButton } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// export default function History() {
//   const { getHistoryOfUser } = useContext(AuthContext);
//   const [meetings, setMeetings] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await getHistoryOfUser();

//         console.log("Raw history from backend:", history);

//         // If backend returned an error object
//         if (history && typeof history === "object" && history.message) {
//           setError(history.message);
//           return;
//         }

//         // Make sure history is always an array
//         let historyArray = [];
//         if (Array.isArray(history)) {
//           historyArray = history;
//         } else if (typeof history === "string") {
//           historyArray = [history];
//         }

//         // Parse each string
//         const formatted = historyArray
//           .filter(item => typeof item === "string")
//           .map(item => {
//             const parts = item.split(" ");
//             return {
//               url: parts[0] || "#",
//               username: parts[2] || "Unknown",
//               meetingCode: parts[3] || "N/A",
//             };
//           });

//         setMeetings(formatted);
//       } catch (err) {
//         console.error("Failed to fetch history:", err);
//         setError("Failed to fetch history. Please try again later.");
//       }
//     };

//     fetchHistory();
//   }, [getHistoryOfUser]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <IconButton onClick={() => navigate("/home")}>
//         <HomeIcon />
//       </IconButton>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {meetings.length > 0 ? (
//         meetings.map((meeting, index) => (
//           <Card
//             key={index}
//             variant="outlined"
//             sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}
//           >
//             <CardContent>
//               <Typography variant="subtitle1" gutterBottom>
//                 Username: {meeting.username}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Meeting Code: {meeting.meetingCode}
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="small"
//                 onClick={() => window.open(meeting.url, "_blank")}
//               >
//                 Open Meeting
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       ) : !error ? (
//         <Typography>No meetings found.</Typography>
//       ) : null}
//     </div>
//   );
// }




// import React, { useEffect, useState, useContext } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { IconButton } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// export default function History() {
//   const { getHistoryOfUser } = useContext(AuthContext);
//   const [meetings, setMeetings] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await getHistoryOfUser();
//         console.log("Raw history from backend:", history);

//         if (history && typeof history === "object" && history.message) {
//           setError(history.message);
//           return;
//         }

//         const historyArray = Array.isArray(history) ? history : [];

//         const formatted = historyArray.map((item) => {
//           if (typeof item === "string") {
//             const parts = item.split(" ");
//             return {
//               url: parts[0] || "#",
//               username: parts[2] || "Unknown",
//               meetingCode: parts[3] || "N/A",
//               timestamp: null,
//             };
//           } else {
//             return {
//               url: item.url || "#",
//               username: item.username || "Unknown",
//               meetingCode: item.meetingCode || "N/A",
//               timestamp: item.timestamp || null,
//             };
//           }
//         });

//         setMeetings(formatted);
//       } catch (err) {
//         console.error("Failed to fetch history:", err);
//         setError("Failed to fetch history. Please try again later.");
//       }
//     };

//     fetchHistory();
//   }, [getHistoryOfUser]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <IconButton onClick={() => navigate("/home")}>
//         <HomeIcon />
//       </IconButton>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {meetings.length > 0 ? (
//         meetings.map((meeting, index) => {
//           const date = meeting.timestamp
//             ? new Date(meeting.timestamp).toLocaleString()
//             : "Unknown time";

//           return (
//             <Card
//               key={index}
//               variant="outlined"
//               sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}
//             >
//               <CardContent>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Username: {meeting.username}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Meeting Code: {meeting.meetingCode}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Date & Time: {date}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() => window.open(meeting.url, "_blank")}
//                 >
//                   Open Meeting
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })
//       ) : !error ? (
//         <Typography>No meetings found.</Typography>
//       ) : null}
//     </div>
//   );
// }



import React, { useEffect, useState, useContext } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        const historyArray = Array.isArray(history) ? history : [];
        const formatted = historyArray.map(item => ({
          url: item.url || "#",
          username: item.username || "Unknown",
          meetingCode: item.meetingCode || "N/A",
          timestamp: item.timestamp || null,
        }));
        setMeetings(formatted);
      } catch (err) {
        setError("Failed to fetch history. Please try again later.");
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  return (
    <Box
      sx={{
        width: '100vw',                // full viewport width
        minHeight: '100vh',            // full screen height
        backgroundColor: '#121212',    // dark background
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: 'border-box',       // ensure padding doesn't shrink width
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate("/home")} sx={{ color: '#4a90e2' }}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 2, fontWeight: 600, color: '#ffffff' }}>
          Meeting History
        </Typography>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Meeting Cards */}
      {meetings.length > 0 ? (
        meetings.map((meeting, index) => {
          const date = meeting.timestamp
            ? new Date(meeting.timestamp).toLocaleString()
            : "Unknown time";

          return (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                backgroundColor: '#1e1e1e',
                width: '100%', // make cards full width
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#ffffff' }}>
                  {meeting.username}
                </Typography>
                <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 0.5 }}>
                  <strong>Meeting Code:</strong> {meeting.meetingCode}
                </Typography>
                <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 1 }}>
                  <strong>Date & Time:</strong> {date}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #4a90e2, #28527a)',
                    '&:hover': { background: 'linear-gradient(135deg, #28527a, #4a90e2)' },
                  }}
                  onClick={() => window.open(meeting.url, "_blank")}
                >
                  Open Meeting
                </Button>
              </CardContent>
            </Card>
          );
        })
      ) : !error ? (
        <Typography sx={{ mt: 2, color: '#b0b0b0', textAlign: 'center' }}>
          No meetings found.
        </Typography>
      ) : null}
    </Box>
  );
}
