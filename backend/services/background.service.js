const axios = require("axios");
const FormData = require("form-data");

const removeBackground = async (
  imageBuffer
) => {

  const formData =
    new FormData();

  formData.append(
    "image_file",
    imageBuffer,
    "image.png"
  );

  formData.append(
    "size",
    "auto"
  );

  const response =
    await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key":
            process.env.REMOVEBG_API_KEY,
        },
        responseType:
          "arraybuffer",
        maxBodyLength:
          Infinity,
      }
    );

  return response.data;
};

module.exports = {
  removeBackground,
};