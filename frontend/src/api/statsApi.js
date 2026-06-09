import API from "./axios";

export const getStats =
  async () => {

    const response =
      await API.get(
        "/stats"
      );

    return response.data;
};