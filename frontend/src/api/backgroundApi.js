import API from "./axios";

export const removeBackground =
  async (file, token) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const response =
      await API.post(
        "/background/remove",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
          responseType:
            "blob",
        }
      );

    return response.data;
};