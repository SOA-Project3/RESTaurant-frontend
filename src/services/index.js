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

    // If you want to proceed with a non-JSON response:
    const result = await response.json();

    // If the response is expected to be JSON, you might want to use:
    // const result = await response.json();

    return result.message;
  } catch (error) {
    // It's usually not recommended to console.error here and instead let the caller handle the error
    console.error("Error sending feedback:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};
