// import httpStatus from 'http-status';
// import {User} from "../models/userModel.js";
// import bcrypt,  {hash} from 'bcrypt';
// import crypto from 'crypto';



// const login = async(req, res) => {
//     const {username, password} = req.body;

//     if(!username || !password) {
//         return res.status(404).json({message: "Please provide username and password"});
//     }
//     try {
//             const user = await User.findOne({username});
//             if(!user) {
//                 return res.status(httpStatus.NOT_FOUND).json({message: "User not found"});
//             }

//             // return res.json(user);


//             if(bcrypt.compare(password, user.password)) {
//                 let token = crypto.randomBytes(20).toString('hex');
//                 user.token = token;
//                 await user.save();
//                 return res.status(httpStatus.OK).json({token: token});
//             }

//     }   catch(e) {
//                 return res.status(500).json({message: `Something went wrong ${e}`});
//     }
// }


// const register = async (req, res) => {

//     const {name , username, password} = req.body;
    
//     try {
//             const existingUser = await User.findOne({username});
//             if(existingUser) {
//                 return res.status(httpStatus.FOUND).json({message: "Username already exists"});
//             }

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new User ({
//                 name: name,
//                 username: username,
//                 password: hashedPassword
//             });

//             await newUser.save();
//             res.status(httpStatus.CREATED).json({message: "User registered successfully"}); 

//     }  catch(e) {

//         res.json({message:  `Something went wrong ${e}`});

//     }

// } 

// const getUserHistory = async(req, res) => {
//   const {token} = req.query;

//   try{
//     const user = await User.findOne({token: token});
//     const meetings = await Meetings.find({user_id: user.username});
//     res.json(meetings);
//   }  catch(e) {
//     res.json({message: `Something went wrong ${e}`});

//   }
// }

// const addToHistory = async(req, res) => {
//   const {token, meeting_code} = req.body;

//   try{
//     const user = await User.findOne({token: token});
//     const newMeeting = new Meeting({
//       user_id: user.username,
//       meetingCode: meeting_code
//     })
//     await newMeeting.save();
//     res.status(httpStatus.CREATED).json({message: "Added code to history"});
//   }
//   catch(e) {
//     res.json({message: `Something went wrong ${e}`});
//   }
// }

// export {login, register, getUserHistory, addToHistory};



import httpStatus from 'http-status';
import { User } from "../models/userModel.js";
import { Activity } from "../models/activityModel.js"; // You need to create this model
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// ✅ Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Incorrect password" });
    }

    // Generate a simple token (or replace with JWT if needed)
    const token = crypto.randomBytes(20).toString('hex');
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

// ✅ Register
const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      token: null,
    });

    await newUser.save();
    return res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

// ✅ Get user activity history
const getUserHistory = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Token required" });
  }

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
    }

    const meetings = await Activity.find({ username: user.username }).sort({ timestamp: -1 });
    return res.status(httpStatus.OK).json(meetings);
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

// ✅ Add to activity history
const addToHistory = async (req, res) => {
  const { token, meeting_code, url = "" } = req.body;

  if (!token || !meeting_code) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Token and meeting code required" });
  }

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
    }

    const newActivity = new Activity({
      username: user.username,
      meetingCode: meeting_code,
      url,
      timestamp: new Date(),
    });

    await newActivity.save();
    return res.status(httpStatus.CREATED).json({ message: "Added to history" });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};

export { login, register, getUserHistory, addToHistory };
