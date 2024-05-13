import {
  MENU_URL,
  SEND_FEEDBACK_URL,
  GET_FEEDBACK_URL,
  RECOMMENDATIONS_URL,
  SUGGESTIONS_URL,
  REGISTER_URL,
  LOGIN_URL,
  BAD_REQUEST,
  GET_USER_URL,
} from "@/constants";

async function handleResponse(response) {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errMssg = await response.text();
    throw new Error(errMssg);
  }
}

export const getMenu = async () => {
  try {
    const response = await fetch(MENU_URL);
    const menuData = await handleResponse(response);
    return menuData;
  } catch (error) {
    // Handle network errors or other fetch errors
    throw new Error(`Network error: ${error.message}`);
  }
};

export const postFeedback = async (feedback) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("feedback", feedback);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(SEND_FEEDBACK_URL, requestOptions);

    const result = await handleResponse(response);
    return result.message;
  } catch (error) {
    console.error("Error sending feedback:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const getReservation = async (day, hour) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${SUGGESTIONS_URL}/?day=${day}&hour=${hour}`,
      requestOptions
    );

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

export const getRecommendation = async (meal, drink, dessert) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let url = RECOMMENDATIONS_URL;

  if (!!meal) url += `/?meal=${meal}&`;
  if (!!drink) url += `/?drink=${drink}&`;
  if (!!dessert) url += `/?dessert=${dessert}&`;

  url = url.slice(0, -1);

  try {
    const response = await fetch(url, requestOptions);

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const postRegister = async (name, email, password, role) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    Id: email,
    Fullname: name,
    Rol: role,
    Password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(REGISTER_URL, requestOptions);

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const postLogin = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    Id: email,
    Password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(LOGIN_URL, requestOptions);
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const getUser = async (email) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(`${GET_USER_URL}?Id=${email}`, requestOptions);

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};
