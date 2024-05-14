export const getMenu = async () => {
  try {
    const response = await fetch(
      "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/menu"
    );
    if (response.ok) {
      const menuData = await response.json();
      return menuData;
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
    const response = await fetch(
      "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/sendFeedback",
      requestOptions
    );

    const result = await response.json();

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
      `https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/suggestions/?day=${day}&hour=${hour}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const getRecommendation = async (meal, drink, dessert) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let url =
    "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/recommendations/?";

  if (!!meal) url += `meal=${meal}&`;
  if (!!drink) url += `drink=${drink}&`;
  if (!!dessert) url += `dessert=${dessert}&`;

  url = url.slice(0, -1);

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};


export const getAllSchedule = async () => {
  try {
    const response = await fetch(
      "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/allScheduleSlots"
    );
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

export const getAvailableSchedules = async () => {
  try {
    const response = await fetch(
      "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/availableScheduleSlots"
    );
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
}


export const getUserSchedules = async (userId) => {
  const requestOptions = {
  method: "GET",
  redirect: "follow",
};

let url =
  "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/userScheduleSlots?";

if (!!userId) url += `userId=${userId}`;

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

export const getBookedSchedules = async () => {
  try {
    const response = await fetch(
      "https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/bookedScheduleSlots"
    );
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
}

export const deleteScheduleSlot = async (scheduleSlotId) => {
  const url = `https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/deleteScheduleSlot?scheduleSlotId=${scheduleSlotId}`;
  console.log("URL:", url)

  const requestOptions = {
    method: "DELETE",
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
    console.error("Error deleting schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};


export const cancelScheduleSlot = async (scheduleSlotId, userId) => {
  const url = `https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/cancelScheduleSlot?scheduleSlotId=${scheduleSlotId}&userId=${userId}`;

  const requestOptions = {
    method: "PUT",
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
    console.error("Error cancelling schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const bookScheduleSlot = async (userId, scheduleSlotId, peopleQuantity) => {
  const url = `https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/bookScheduleSlot?userId=${userId}&scheduleSlotId=${scheduleSlotId}&peopleQuantity=${peopleQuantity}`;

  const requestOptions = {
    method: "PUT",
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
    console.error("Error booking schedule slot:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const updateScheduleSlotQuantity = async (scheduleSlotId, peopleQuantity, userId) => {
  const url = `https://us-central1-soa-gr6-p3.cloudfunctions.net/backend/updateScheduleSlotQuantity?scheduleSlotId=${scheduleSlotId}&peopleQuantity=${peopleQuantity}&userId=${userId}`;

  const requestOptions = {
    method: "PUT",
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
    console.error("Error updating schedule slot quantity:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const createScheduleSlot = async (datetime) => {
  const url = `http://us-central1-soa-gr6-p3.cloudfunctions.net/backend/createScheduleSlot`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "datetime": datetime
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
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

