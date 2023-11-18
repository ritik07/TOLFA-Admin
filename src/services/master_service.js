import axios from "axios";
import { BASE_URL } from "../constants/server";

export const fetchAdmissionListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + "/admission", {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error; // You can handle errors in your component
  }
};

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

export const fetchBreedListData = async (AUTH_TOKEN) => {
  try {
    const response = await axios.get(BASE_URL + `/breed`, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCareUser = async (AUTH_TOKEN, number) => {
  try {
    const response = await axios.get(
      BASE_URL + `/care-people/?mob_no=${number}`,
      {
        headers: { auth_token: AUTH_TOKEN },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCareUser = async (AUTH_TOKEN, payload) => {
  try {
    const response = await axios.post(
      BASE_URL + `/care-people/create`,
      payload,
      {
        headers: { auth_token: AUTH_TOKEN },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAdmission = async (AUTH_TOKEN, payload) => {
  try {
    const response = await axios.post(BASE_URL + `/admission/create`, payload, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBreed = async (AUTH_TOKEN, payload) => {
  try {
    const response = await axios.post(BASE_URL + `/breed/create`, payload, {
      headers: { auth_token: AUTH_TOKEN },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAnimalStatus = async (AUTH_TOKEN, payload) => {
  try {
    const response = await axios.post(
      BASE_URL + `/animal-status/create`,
      payload,
      {
        headers: { auth_token: AUTH_TOKEN },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTolfaLocation = async (AUTH_TOKEN, payload) => {
  try {
    const response = await axios.post(
      BASE_URL + `/admission/update/rescue-location`,
      payload,
      {
        headers: { auth_token: AUTH_TOKEN },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTolfaLocationHistoryLogsData = async (
  AUTH_TOKEN,
  rescue_id
) => {
  try {
    const response = await axios.get(
      BASE_URL + `/admission/history-logs/rescue-location/${rescue_id}`,
      {
        headers: { auth_token: AUTH_TOKEN },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
