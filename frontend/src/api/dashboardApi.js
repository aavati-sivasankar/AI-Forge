import API from "./axios";

export const getDashboardData =
  async (token) => {

    const response =
      await API.get(
        "/dashboard",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};