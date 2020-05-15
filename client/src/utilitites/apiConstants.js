import { baseURL } from "./apiConfig";

console.log("baseURL", baseURL);

export const GET_USERS_ENDPOINT = `${baseURL}/users`;
export const CREATE_USER_ENDPOINT = `${baseURL}/users/add`;

export const GET_EXERCISES_ENDPOINT = `${baseURL}/exercises`;
export const CREATE_EXERCISE_ENDPOINT = `${baseURL}/exercises/add`;
export const DELETE_EXERCISE_ENDPOINT = `${baseURL}/exercises`;
export const UPDATE_EXERCISE_ENDPOINT = `${baseURL}/exercises/update`;
