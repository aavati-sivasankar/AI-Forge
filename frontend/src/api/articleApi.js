import API from "./axios";

export const generateArticle = async (
  title,
  length,
  token
) => {
  const response = await API.post(
    "/article/generate",
    {
      title,
      length,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};