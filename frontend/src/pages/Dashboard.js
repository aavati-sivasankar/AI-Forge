import { useEffect, useState } from "react";

import {
  useAuth,
  useUser,
} from "@clerk/clerk-react";

import GaugeComponent
from "react-gauge-component";

import DashboardLayout
from "../layouts/DashboardLayout";

import LoadingSpinner
from "../components/LoadingSpinner";

import {
  getDashboardData,
} from "../api/dashboardApi";

function Dashboard() {

  const { getToken } =
    useAuth();

  const {
    isLoaded,
    isSignedIn,
  } = useUser();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {

      setLoading(false);
      setError(
        "Please sign in"
      );

      return;
    }

    const loadData =
      async () => {

        try {

          let token =
            await getToken();

          if (!token) {

            await new Promise(
              resolve =>
                setTimeout(
                  resolve,
                  1000
                )
            );

            token =
              await getToken();

          }

          if (!token) {

            setError(
              "Authentication failed"
            );

            return;
          }

          console.log(
            "TOKEN:",
            token
          );

          const response =
            await getDashboardData(
              token
            );

          console.log(
            "DASHBOARD RESPONSE:",
            response
          );

          if (
            !response ||
            !response.success
          ) {

            setError(
              response?.message ||
              "Failed to load dashboard"
            );

            return;
          }

          setData(response);

        } catch (error) {

          console.log(error);

          setError(
            error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard"
          );

        } finally {

          setLoading(false);

        }

      };

    loadData();

  }, [
    isLoaded,
    isSignedIn,
    getToken,
  ]);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>

        <div className="container mt-4">

          <div
            className="
              alert
              alert-danger
            "
          >
            {error}
          </div>

        </div>

      </DashboardLayout>
    );
  }

  if (
    !data ||
    !data.user
  ) {

    return (
      <DashboardLayout>

        <div className="container mt-4">

          <div
            className="
              alert
              alert-warning
            "
          >
            Dashboard data
            not available
          </div>

        </div>

      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="mb-4">

        <h2
          className="fw-bold"
        >
          Welcome,
          {" "}
          {data.user.firstName}
        </h2>

        <p
          className="
            text-muted
          "
        >
          Manage your
          AI tools and
          credits.
        </p>

      </div>

      <div
        className="
          row
          g-4
        "
      >

        <div className="col-md-4">

          <div
            className="
              card
              shadow-sm
              border-0
              p-4
            "
          >

            <h5
              className="
                text-center
                mb-4
              "
            >
              Credits Remaining
            </h5>

            <GaugeComponent
              type="semicircle"
              value={
                data.user.credits
              }
              minValue={0}
              maxValue={100}
              labels={{
                valueLabel: {
                  formatTextValue: () =>
                    `${data.user.credits}/100`,
                  style: {
                    fill: "#000000",
                    fontSize: "34px",
                    fontWeight: "bold",
                    textShadow: `
                      -1px -1px 0 #fff,
                      1px -1px 0 #fff,
                      -1px  1px 0 #fff,
                      1px  1px 0 #fff
                    `,
                  },
                },
              }}
              arc={{
                subArcs: [
                  {
                    limit: 3,
                    color:
                      "#EA4228",
                  },
                  {
                    limit: 80,
                    color:
                      "#F5CD19",
                  },
                  {
                    limit: 100,
                    color:
                      "#5BE12C",
                  },
                ],
              }}
            />

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="
              card
              shadow-sm
              border-0
              p-4
              text-center
            "
          >

            <h5>
              Plan
            </h5>

            <h2
              className="
                fw-bold
              "
            >
              {
                data.user.plan
              }
            </h2>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="
              card
              shadow-sm
              border-0
              p-4
              text-center
            "
          >

            <h5>
              Articles
            </h5>

            <h2
              className="
                fw-bold
              "
            >
              {
                data.stats
                  ?.articles || 0
              }
            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;