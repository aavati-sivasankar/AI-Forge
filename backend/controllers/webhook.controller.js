const Stripe =
  require("stripe");

const stripe =
  Stripe(
    process.env.STRIPE_SECRET_KEY
  );

const prisma =
  require("../services/prisma");

const handleWebhook =
  async (req, res) => {

    console.log(
      "WEBHOOK HIT"
    );

    const sig =
      req.headers[
        "stripe-signature"
      ];

    let event;

    try {

      event =
        stripe.webhooks.constructEvent(

          req.body,

          sig,

          process.env
            .STRIPE_WEBHOOK_SECRET

        );

    } catch (err) {

      console.log(
        "WEBHOOK ERROR:",
        err.message
      );

      return res
        .status(400)
        .send(
          `Webhook Error: ${err.message}`
        );

    }

    if (
  event.type ===
  "checkout.session.completed"
) {

  try {

    const session =
      event.data.object;

    console.log(
      "SESSION:",
      session.metadata
    );

    const clerkId =
      session.metadata?.clerkId;

    const credits =
      Number(
        session.metadata?.credits
      );

    const amount =
      session.amount_total / 100;

    console.log(
      "CLERK ID:",
      clerkId
    );

    console.log(
      "CREDITS:",
      credits
    );

    const user =
      await prisma.user.findUnique({

        where: {
          clerkId,
        },

      });

    console.log(
      "FOUND USER:",
      user
    );

    if (!user) {

      console.log(
        "USER NOT FOUND"
      );

      return res.status(404).json({
        message:
          "User not found",
      });

    }

    const updatedUser =
      await prisma.user.update({

        where: {
          id:
            user.id,
        },

        data: {

          credits: {

            increment:
              credits,

          },
          plan: "PRo",

        },

      });

    console.log(
      "UPDATED USER:",
      updatedUser
    );

    const purchase =
      await prisma.creditPurchase.create({

        data: {

          credits,

          amount,

          userId:
            user.id,

        },

      });

    console.log(
      "PURCHASE CREATED:",
      purchase
    );

    console.log(
      "CREDITS ADDED SUCCESSFULLY"
    );

  } catch (error) {

    console.log(
      "CHECKOUT ERROR:",
      error
    );

  }

}

    res.json({
      received: true,
    });

};

module.exports = {
  handleWebhook,
};