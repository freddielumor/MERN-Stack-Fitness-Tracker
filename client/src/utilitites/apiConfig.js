// Get environment and port from env
const { NODE_ENV } = process.env;

// Check if dev environment
export const inDevelopment = NODE_ENV === "development";

// Set base API url
export const baseURL = inDevelopment
  ? `http://localhost:5000`
  : "https://mern-fitness-tracker.herokuapp.com";
