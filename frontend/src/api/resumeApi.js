import API from "./axios";

export const analyzeResume =
  async (file, token) => {

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    const response =
      await API.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};