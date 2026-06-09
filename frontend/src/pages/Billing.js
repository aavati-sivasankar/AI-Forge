import DashboardLayout
from "../layouts/DashboardLayout";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  createCheckoutSession,
} from "../api/paymentApi";

function Billing() {

  const { getToken } =
    useAuth();

  const plans = [

    {
      credits: 10,
      amount: 9,
    },

    {
      credits: 50,
      amount: 49,
    },

    {
      credits: 100,
      amount: 99,
    },

  ];

  const handleBuy =
    async (
      credits,
      amount
    ) => {

      try {

        const token =
          await getToken();

        if (!token) {

          alert(
            "Authentication failed. Please login again."
          );

          return;

        }

        const response =
          await createCheckoutSession(
            token,
            credits,
            amount
          );

        if (
          response.success
        ) {

          window.location.href =
            response.url;

        }

      } catch (error) {

        console.log(error);

        alert(
          "Payment initialization failed"
        );

      }

    };

  return (

    <DashboardLayout>

      <div className="container">

        <div className="mb-5">

          <h1 className="fw-bold">
            Buy Credits
          </h1>

          <p className="text-muted">
            Purchase credits and use
            them across all AI Forge
            tools.
          </p>

        </div>

        <div className="row g-4">

          {
            plans.map(
              plan => (

                <div
                  className="col-md-4"
                  key={plan.credits}
                >

                  <div
                    className="
                      card
                      shadow-sm
                      border-0
                      h-100
                      p-4
                      text-center
                    "
                  >

                    <h2
                      className="
                        fw-bold
                        text-primary
                      "
                    >
                      {plan.credits}
                    </h2>

                    <p
                      className="
                        text-muted
                      "
                    >
                      Credits
                    </p>

                    <hr />

                    <h3
                      className="
                        fw-bold
                        mb-4
                      "
                    >
                      ₹{plan.amount}
                    </h3>

                    <button
                      className="
                        btn
                        btn-primary
                        w-100
                      "
                      onClick={() =>
                        handleBuy(
                          plan.credits,
                          plan.amount
                        )
                      }
                    >
                      Buy Now
                    </button>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Billing;