export const getMenu = async () => {
  try {
    const response = await fetch(
      "https://us-central1-soa-g6-p2.cloudfunctions.net/backend/menu"
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
      "https://us-central1-soa-g6-p2.cloudfunctions.net/backend/sendFeedback",
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
      `https://us-central1-soa-g6-p2.cloudfunctions.net/backend/suggestions/?day=${day}&hour=${hour}`,
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
