import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../environment";


// Create context
export const AuthContext = createContext({});

// Axios client instance
// const client = axios.create({
//   baseURL: "http://localhost:8000/api/v1/users",   these is the backend connection on the local system 
// });                                                 


// now we are going to connect with render.com to get live...  Method-1
// const client = axios.create({
//   baseURL: `${server}/api/v1/users`
// })


// Method-2

const client = axios.create({
  baseURL: `${API_URL}/api/v1/users`,
  headers: {
    "Content-Type": "application/json",
  },
});



export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  // Register function
  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  // Login function
  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      console.log(username, password);
      console.log(request.data);

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
    } catch (err) {
      throw err;
    }
  };

  // Get user history
  const getHistoryOfUser = async () => {
    try {
      const request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
    } catch (err) {
      console.log("Error fetching history", err);
      throw err;
    }
  };

  // Add activity to user history
  const addToUserHistory = async (meetingCode) => {
    try {
      const request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
        timestamp: new Date().toISOString(), // Include timestamp in request
      });

      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  );
};
