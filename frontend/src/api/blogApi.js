import API from "./axios";

export const generateBlogTitles = async (
  keyword,
  category,
  token
) => {

    

  const response = await API.post(
    "/blog/generate",
    {
      keyword,
      category,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};