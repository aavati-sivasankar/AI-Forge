import API from "./axios";

export const createCheckoutSession =
  async (
    token,
    credits,
    amount
  ) => {

    const response =
      await API.post(

        "/payment/create-checkout-session",

        {
          credits,
          amount,
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

    return response.data;

  };