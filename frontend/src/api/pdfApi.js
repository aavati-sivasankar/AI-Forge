import API from "./axios";

export const summarizePDF =
  async (file, token) => {

    const formData =
      new FormData();

    formData.append(
      "pdf",
      file
    );

    const response =
      await API.post(
        "/pdf/summarize",
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