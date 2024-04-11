// src/services/index.js
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
