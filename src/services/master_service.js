import axios from "axios";
import { BASE_URL } from "../constants/server";

export const fetchRescueTypeData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + "/rescue-type", {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error; // You can handle errors in your component
  }
};

export const fetchSpeciesTypeData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/species-type`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStatusTypeData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/animal-status`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStateListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/state`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCityListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/city`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCityAreaListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/city-area`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTolfaAreaListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/area`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTolfaBlockNumberListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/block-number`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTolfaStaffListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/user`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
