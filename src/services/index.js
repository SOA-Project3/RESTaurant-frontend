import {
  MENU_URL,
  SEND_FEEDBACK_URL,
  GET_FEEDBACK_URL,
  RECOMMENDATIONS_URL,
  SUGGESTIONS_URL,
  REGISTER_URL,
  LOGIN_URL,
  GET_USER_URL,
  RESET_PWD_URL,
  UPDATE_PWD_URL,
  DELETE_ACCOUNT_URL,
  GET_ALL_SCHEDULED_URL,
  GET_AVAILABLE_SLOTS_URL,
  GET_USER_SCHEDULED_URL,
  GET_BOOKED_SCHEDULES_URL,
  DELETE_SCHEDULE_URL,
  CANCEL_SCHEDULE_URL,
  BOOK_SCHEDULE_URL,
  UPDATE_QUANTITY_URL,
  CREATE_SCHEDULE_URL,
} from "@/constants";

/**
 * Parse response data to handle success or error
 * @param {*} response
 * @returns
 */
async function handleResponse(response) {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errMssg = await response.text();
    throw new Error(errMssg);
  }
}

/**
 * Fetch whole menu data
 * @returns
 */
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

/**
 * Post user feedback to chatbot service
 * @param {*} feedback
 * @returns
 */
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

export const getAllSchedule = async (jwt) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: headers,
    };
    const response = await fetch(GET_ALL_SCHEDULED_URL, requestOptions);

    if (response.ok) {
      const allSchedule = await response.json();
      return allSchedule;
    } else {
      // Handle errors if response not ok
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  } catch (error) {
    // Handle network errors or other fetch errors
    throw new Error(`Network error: ${error.message}`);
  }
};

export const getAvailableSchedules = async (jwt) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: headers,
    };
    console.log("request");
    const response = await fetch(GET_AVAILABLE_SLOTS_URL, requestOptions);
    if (response.ok) {
      const availableSchedule = await response.json();
      return availableSchedule;
    } else {
      // Handle errors if response not ok
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  } catch (error) {
    // Handle network errors or other fetch errors
    throw new Error(`Network error: ${error.message}`);
  }
};

export const getUserSchedules = async (userId, jwt) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: headers,
  };

  let url = GET_USER_SCHEDULED_URL;

  if (!!userId) url += `?userId=${userId}`;

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user schedule:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const getBookedSchedules = async (jwt) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: headers,
    };
    const response = await fetch(GET_BOOKED_SCHEDULES_URL, requestOptions);
    if (response.ok) {
      const bookedSchedule = await response.json();
      return bookedSchedule;
    } else {
      // Handle errors if response not ok
      const error = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  } catch (error) {
    // Handle network errors or other fetch errors
    throw new Error(`Network error: ${error.message}`);
  }
};

export const deleteScheduleSlot = async (scheduleSlotId, jwt) => {
  const url = `${DELETE_SCHEDULE_URL}?scheduleSlotId=${scheduleSlotId}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
    headers: headers,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const cancelScheduleSlot = async (scheduleSlotId, userId, jwt) => {
  const url = `${CANCEL_SCHEDULE_URL}?scheduleSlotId=${scheduleSlotId}&userId=${userId}`;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: headers,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error cancelling schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const bookScheduleSlot = async (
  userId,
  scheduleSlotId,
  peopleQuantity,
  jwt
) => {
  const url = `${BOOK_SCHEDULE_URL}?userId=${userId}&scheduleSlotId=${scheduleSlotId}&peopleQuantity=${peopleQuantity}`;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: headers,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error booking schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const updateScheduleSlotQuantity = async (
  scheduleSlotId,
  peopleQuantity,
  userId,
  jwt
) => {
  const url = `${UPDATE_QUANTITY_URL}?scheduleSlotId=${scheduleSlotId}&peopleQuantity=${peopleQuantity}&userId=${userId}`;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
    headers: headers,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating schedule slot quantity:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const createScheduleSlot = async (datetime, branch, jwt) => {
  const url = CREATE_SCHEDULE_URL;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwt}`);

  const raw = JSON.stringify({
    datetime: datetime,
    branch: branch,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

/**
 * Register new user to DB
 */
export const postRegister = async (name, email, password, role) => {
  const credentials = btoa(`${email}:${password}`); // Base64 encode the credentials

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Basic ${credentials}`);

  const raw = JSON.stringify({
    Fullname: name,
    Rol: role,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
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

/**
 * Handle user login
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const postLogin = async (email, password) => {
  const credentials = btoa(`${email}:${password}`); // Base64 encode the credentials

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Basic ${credentials}`);

  const requestOptions = {
    method: "POST",
    headers: headers,
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

/**
 * Fetch user data by email
 * @param {string} email
 * @returns
 */
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

/**
 * Resets password in DB. Assigns new password and sends it via email
 * @param {*} email
 * @returns
 */
export const resetPassword = async (email) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${RESET_PWD_URL}?Id=${email}`,
      requestOptions
    );
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

/**
 * Set a new password
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const setPassword = async (email, password) => {
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
    const response = await fetch(UPDATE_PWD_URL, requestOptions);
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};

/**
 * Remove user from DB
 * @param {*} email
 * @returns
 */
export const deleteUser = async (email, jwt) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
    headers: headers,
  };
  try {
    const response = await fetch(
      `${DELETE_ACCOUNT_URL}?Id=${email}`,
      requestOptions
    );
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
