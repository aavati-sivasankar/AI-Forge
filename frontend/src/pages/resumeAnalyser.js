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
import ReactMarkdown from "react-markdown";

import {
  analyzeResume,
} from "../api/resumeApi";

function ResumeAnalyzer() {

  const { getToken } =
    useAuth();

  const [file, setFile] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [result,
    setResult] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!file) {
        alert(
          "Please select a PDF"
        );
        return;
      }

      try {

        setLoading(true);

        const token =
          await getToken();

        const response =
          await analyzeResume(
            file,
            token
          );
        setResult(
          response.analysis
        );

        console.log("Analysis resume: ", result);

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
        Resume Analyzer
      </h1>

      <div
        className="card p-4 mt-3"
      >

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div
            className="mb-3"
          >

            <label
              className="form-label"
            >
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf"
              className="form-control"
              onChange={
                (e) =>
                  setFile(
                    e.target.files[0]
                  )
              }
            />

          </div>

          <button
            type="submit"
            className=
              "btn btn-primary"
          >
            Analyze Resume
          </button>

        </form>

      </div>

      {
        loading &&
        <LoadingSpinner />
      }

      {result && 
                    <div className="card shadow-sm p-4 mt-4">
            
                    <h2 className="mb-4">
                      Analysis Result
                    </h2>
            
                    <hr />
            
                    <div className="article-content">
            
                      <ReactMarkdown>
                        {result}
                      </ReactMarkdown>
            
                    </div>
            
                  </div>}

    </DashboardLayout>
  );
}

export default ResumeAnalyzer;