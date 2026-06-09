import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import ReactMarkdown from "react-markdown";

import { summarizePDF } from "../api/pdfApi";

function PDFSummarizer() {

  const { getToken } =
    useAuth();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
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
          await summarizePDF(
            file,
            token
          );

        setSummary(
          response.summary
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to summarize PDF"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <DashboardLayout>

      <h1>
        PDF Summarizer
      </h1>

      <div className="card p-4 mt-3">

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="mb-3">

            <label
              className="form-label"
            >
              Upload PDF
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
            className="btn btn-primary"
          >
            Summarize PDF
          </button>

        </form>

      </div>

      {
        loading &&
        <LoadingSpinner />
      }

      {summary && 
                    <div className="card shadow-sm p-4 mt-4">
            
                    <h2 className="mb-4">
                      Generated Summary
                    </h2>
            
                    <hr />
            
                    <div className="article-content">
            
                      <ReactMarkdown>
                        {summary}
                      </ReactMarkdown>
            
                    </div>
            
                  </div>
                  
        }

    </DashboardLayout>
  );
}

export default PDFSummarizer;