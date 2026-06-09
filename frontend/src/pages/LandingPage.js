import {
  SignInButton,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  FaRobot,
  FaPenNib,
  FaFilePdf,
  FaUserTie,
  FaImage,
} from "react-icons/fa";

import { getStats } from "../api/statsApi";

function LandingPage() {

  const [stats, setStats] =
    useState(null);

  const navigate =
    useNavigate();

  const {
    isSignedIn,
  } = useUser();

  useEffect(() => {

    if (isSignedIn) {

      navigate(
        "/dashboard"
      );

    }

  }, [
    isSignedIn,
    navigate,
  ]);

  useEffect(() => {

    const loadStats =
      async () => {

        try {

          const response =
            await getStats();

          setStats(
            response.stats
          );

        } catch (error) {

          console.log(error);

        }

      };

    loadStats();

  }, []);

  return (
    <>

      {/* HERO SECTION */}

      <section
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
        }}
        className="
          text-white
          d-flex
          align-items-center
          justify-content-center
        "
      >

        <div className="container text-center">

          <h1
            className="display-1 fw-bold"
          >
            AI Forge
          </h1>

          <p
            className="lead mt-4"
          >
            Generate Articles,
            Analyze Resumes,
            Summarize PDFs and
            Remove Backgrounds
            using AI.
          </p>

          <div
            className="mt-4"
          >

            <SignedOut>

              <SignInButton
                mode="modal"
                forceRedirectUrl="/dashboard"
              >

                <button
                  className="
                    btn
                    btn-primary
                    btn-lg
                    px-5
                  "
                >
                  Get Started
                </button>

              </SignInButton>

            </SignedOut>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        className="py-5"
      >

        <div className="container">

          <h2
            className="
              text-center
              mb-5
              fw-bold
            "
          >
            Features
          </h2>

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
                  h-100
                  shadow-sm
                  border-0
                "
              >

                <div
                  className="
                    card-body
                    text-center
                  "
                >

                  <FaPenNib
                    size={45}
                  />

                  <h4
                    className="mt-3"
                  >
                    AI Writer
                  </h4>

                  <p>
                    Generate
                    high-quality
                    articles instantly.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="
                  card
                  h-100
                  shadow-sm
                  border-0
                "
              >

                <div
                  className="
                    card-body
                    text-center
                  "
                >

                  <FaRobot
                    size={45}
                  />

                  <h4
                    className="mt-3"
                  >
                    Blog Generator
                  </h4>

                  <p>
                    Create SEO-friendly
                    blog titles in
                    seconds.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="
                  card
                  h-100
                  shadow-sm
                  border-0
                "
              >

                <div
                  className="
                    card-body
                    text-center
                  "
                >

                  <FaUserTie
                    size={45}
                  />

                  <h4
                    className="mt-3"
                  >
                    Resume Analyzer
                  </h4>

                  <p>
                    AI-powered resume
                    feedback and
                    improvement tips.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div
                className="
                  card
                  h-100
                  shadow-sm
                  border-0
                "
              >

                <div
                  className="
                    card-body
                    text-center
                  "
                >

                  <FaFilePdf
                    size={45}
                  />

                  <h4
                    className="mt-3"
                  >
                    PDF Summarizer
                  </h4>

                  <p>
                    Extract key insights
                    from long PDF
                    documents.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div
                className="
                  card
                  h-100
                  shadow-sm
                  border-0
                "
              >

                <div
                  className="
                    card-body
                    text-center
                  "
                >

                  <FaImage
                    size={45}
                  />

                  <h4
                    className="mt-3"
                  >
                    Background Remover
                  </h4>

                  <p>
                    Remove image
                    backgrounds instantly.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section
        className="
          bg-dark
          text-white
          py-5
        "
      >

        <div className="container">

          <div
            className="
              row
              text-center
              justify-content-center
            "
          >

            <div className="col-md-4">

              <h1 className="display-4 fw-bold">
                {
                  stats?.totalUsers || 0
                }
              </h1>

              <p className="fs-5">
                👥 Users
              </p>

            </div>

            <div className="col-md-4">

              <h1 className="display-4 fw-bold">
                {
                  stats?.totalFeatures || 5
                }
              </h1>

              <p className="fs-5">
                ⚡ AI Features
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        className="
          text-center
          py-5
        "
      >

        <div className="container">

          <h2
            className="fw-bold"
          >
            Ready To Start?
          </h2>

          <p>
            Unlock the power of AI
            with AI Forge.
          </p>

          <SignedOut>

            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard"
            >

              <button
                className="
                  btn
                  btn-primary
                  btn-lg
                "
              >
                Get Started
              </button>

            </SignInButton>

          </SignedOut>

        </div>

      </section>

      {/* FOOTER */}

      <footer
        className="
          bg-black
          text-white
          text-center
          py-4
        "
      >

        <p
          className="mb-0"
        >
          © 2026 AI Forge.
          All Rights Reserved.
        </p>

      </footer>

    </>
  );
}

export default LandingPage;