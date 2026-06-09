const Stripe =
  require("stripe");

const {
  getAuth,
} = require("@clerk/express");

const stripe =
  Stripe(
    process.env.STRIPE_SECRET_KEY
  );

const createCheckoutSession =
  async (req, res) => {

    try {

      const { userId } =
        getAuth(req);

      if (!userId) {

        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });

      }

      console.log(
        "CLERK USER ID:",
        userId
      );

      const {
        credits,
        amount,
      } = req.body;

      const session =
        await stripe.checkout.sessions.create({

          payment_method_types: [
            "card",
          ],

          mode: "payment",

          line_items: [

            {

              price_data: {

                currency: "inr",

                product_data: {

                  name:
                    `${credits} AI Forge Credits`,

                },

                unit_amount:
                  amount * 100,

              },

              quantity: 1,

            },

          ],

          success_url:
            "https://ai-forge-mu.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}",

          cancel_url:
            "https://ai-forge-mu.vercel.app/billing",
          metadata: {

            credits:
              credits.toString(),

            clerkId:
              userId,

          },

        });

      return res.json({

        success: true,

        url:
          session.url,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

};

module.exports = {
  createCheckoutSession,
};