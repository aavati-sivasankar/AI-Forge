import {
  useState,
} from "react";

import {
  useAuth,
} from "@clerk/clerk-react";

import DashboardLayout
from "../layouts/DashboardLayout";

import LoadingSpinner
from "../components/LoadingSpinner";

import {
  removeBackground,
} from "../api/backgroundApi";

function BackgroundRemover() {

  const { getToken } =
    useAuth();

  const [file,
    setFile] =
    useState(null);

  const [preview,
    setPreview] =
    useState("");

  const [result,
    setResult] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleFile =
    (e) => {

      const selected =
        e.target.files[0];

      if (!selected) return;

      setFile(selected);

      setPreview(
        URL.createObjectURL(
          selected
        )
      );
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!file) {
        alert(
          "Please select an image"
        );
        return;
      }

      try {

        setLoading(true);

        const token =
          await getToken();

        const blob =
          await removeBackground(
            file,
            token
          );

        if (blob.message === "Not enough credits") {

          alert(
            "You don't have enough credits. Please buy more credits to use this feature."
          );
          return;
        }

        const imageUrl =
          URL.createObjectURL(
            blob
          );

        setResult(
          imageUrl
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <DashboardLayout>

      <h1>
        Background Remover
      </h1>

      <div
        className="card p-4 mt-3"
      >

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={
              handleFile
            }
          />

          <button
            className=
              "btn btn-primary mt-3"
          >
            Remove Background
          </button>

        </form>

      </div>

      {
        loading &&
        <LoadingSpinner />
      }

      {
        preview && (

          <div
            className=
              "card p-4 mt-4"
          >

            <h4>
              Original Image
            </h4>

            <img
              src={preview}
              alt=""
              style={{
                maxWidth:
                  "400px",
              }}
            />

          </div>

        )
      }

      {
        result && (

          <div
            className=
              "card p-4 mt-4"
          >

            <h4>
              Result
            </h4>

            <img
              src={result}
              alt=""
              style={{
                maxWidth:
                  "400px",
              }}
            />

            <br />

            <a
              href={result}
              download=
                "background_removed.png"
              className=
                "btn btn-success mt-3"
            >
              Download
            </a>

          </div>

        )
      }

    </DashboardLayout>
  );
}

export default BackgroundRemover;