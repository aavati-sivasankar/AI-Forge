import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";

import {
  generateBlogTitles,
} from "../api/blogApi";

function BlogGenerator() {

  const { getToken } = useAuth();

  const [keyword, setKeyword] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [titles, setTitles] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleGenerate =
    async () => {

      try {

        setLoading(true);

        const token =
          await getToken();

        const response =
          await generateBlogTitles(
            keyword,
            category,
            token
          );

        setTitles(
          response.titles
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <DashboardLayout>

      <h1>
        Blog Title Generator
      </h1>

      <div className="card p-4 mt-3">

        <input
          className="form-control mb-3"
          placeholder="Keyword"

          value={keyword}

          onChange={(e) =>
            setKeyword(
              e.target.value
            )
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Category"

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-primary"
          onClick={
            handleGenerate
          }
          disabled={loading}
        >
          {
            loading
              ? "Generating..."
              : "Generate Titles"
          }
        </button>

      </div>

      {titles && 
              <div className="card shadow-sm p-4 mt-4">
      
              <h2 className="mb-4">
                Generated Titles
              </h2>
      
              <hr />
      
              <div className="article-content">
      
                <ReactMarkdown>
                  {titles}
                </ReactMarkdown>
      
              </div>
      
            </div>}

    </DashboardLayout>
  );
}

export default BlogGenerator;