// Detect if running on production or local
const IS_PROD = process.env.NODE_ENV === "production";

const server = {
  dev: "http://localhost:8000",
  prod: "https://nextmeetbackend.onrender.com",
};

// Export the correct URL based on environment
const API_URL = IS_PROD ? server.prod : server.dev;

export default API_URL;
