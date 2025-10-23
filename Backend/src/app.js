// // import express from 'express';
// // import { createServer } from 'node:http';
// // import mongoose from 'mongoose';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import path from 'path';
// // import {  initializeSocket } from './controllers/socketManager.js';
// // import userRoutes from './routes/userRoutes.js';
// // // import { Activity } from 'react';
// // // import { User } from './models/userModel.js';


// // dotenv.config({ path: path.resolve('./src/.env') });

// // const app = express();
// // const server = createServer(app);

// // // Middlewares
// // app.use(cors());
// // app.use(express.json({ limit: '40kb' }));
// // app.use(express.urlencoded({ limit: '40kb', extended: true }));

// // // Routes
// // app.use("/api/v1/users", userRoutes);


// // app.get("/home", (req, res) => {
// //   res.send("Hello World");
// // });

// // const PORT = process.env.PORT || 8000;

// // // Initialize socket
// // initializeSocket(server);

// // // Start function
// // const start = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URL);   // Database connection with atlas ok 
// //     console.log("MongoDB connected successfully");

// //     server.listen(PORT, () => {
// //       console.log(` Server running on port ${PORT}`);
// //     });

// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error.message);
// //   }
// // };

// // start();



// import express from 'express';
// import { createServer } from 'node:http';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { initializeSocket } from './controllers/socketManager.js';
// import userRoutes from './routes/userRoutes.js';

// dotenv.config({ path: path.resolve('./src/.env') });

// const app = express();
// const server = createServer(app);

// app.use(cors());
// app.use(express.json({ limit: '40kb' }));
// app.use(express.urlencoded({ limit: '40kb', extended: true }));

// app.use("/api/v1/users", userRoutes);

// const PORT = process.env.PORT || 8000;

// initializeSocket(server);

// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("MongoDB connected successfully");

//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

// start();




// src/index.js or src/server.js

import express from 'express';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeSocket } from './controllers/socketManager.js';
import userRoutes from './routes/userRoutes.js';

// Needed for ES Modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const server = createServer(app);

// Middlewares
app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb', extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// Socket.IO
initializeSocket(server);

// Mongo + Server init
const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

start();
