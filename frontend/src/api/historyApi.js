import API from "./axios";

export const getHistory =
  async (token) => {

    const response =
      await API.get(
        "/history",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const clearHistory =
  async (token) => {

    const response =
      await API.delete(
        "/history/clear",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};