// Get environment and port from env
const { NODE_ENV } = process.env;

// Check if dev or prod
export const inDevelopment = NODE_ENV === "development";
export const inProduction = NODE_ENV === "production";

// Set base API url
export const baseURL = inDevelopment
  ? `http://localhost:5000`
  : "https://mern-fitness-tracker.herokuapp.com";
