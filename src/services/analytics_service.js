import axios from "axios";
import { BASE_URL } from "../constants/server";

export const fetchTotalRescuesBySpecies = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/analytics/total-rescues-by-species`,
      { headers: { auth_token: AUTH_TOKEN } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTotalRescuesByCity = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/analytics/total-rescues-by-city`,
      { headers: { auth_token: AUTH_TOKEN } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMostFrequentProblems = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/analytics/most-frequent-problems`,
      { headers: { auth_token: AUTH_TOKEN } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMostFrequentProblemTypes = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/analytics/most-frequent-problems-types`,
      { headers: { auth_token: AUTH_TOKEN } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
