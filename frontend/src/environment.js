// let IS_PROD = false;
// const server = IS_PROD ?
//     "https://nextmeetbackend.onrender.com" :         // if production then these server will work 

//     "http://localhost:8000"                     // if not then local server will work 

// export default server;

// // These file is responsible to connect the live track of the user on the render.com(Deploying work)

// // environment.js
// const IS_PROD = process.env.NODE_ENV === 'production';

// const server = IS_PROD
//   ? "https://nextmeetbackend.onrender.com/api/v1/users"  // deployed backend
//   : "http://localhost:10000/api/v1/users";               // local backend

// export default server;


const IS_PROD = process.env.NODE_ENV === 'production';

const server = IS_PROD
  ? "https://nextmeetbackend.onrender.com/api/v1/users" // correct
  : "http://localhost:8000/api/v1/users";              // correct
  
 export default server;