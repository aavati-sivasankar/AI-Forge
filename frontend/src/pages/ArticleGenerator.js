import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  generateArticle,
} from "../api/articleApi";
import ReactMarkdown from "react-markdown";

function ArticleGenerator() {

  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [length, setLength] = useState("");

  const [article, setArticle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async () => {
    try {

      setLoading(true);

      const token =
        await getToken();

      const response =
        await generateArticle(
          title,
          length,
          token
        );

      setArticle(
        response.article
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

      <h1>Article Generator</h1>

      <div className="card p-4">

        <input
          className="form-control mb-3"
          placeholder="Article Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Length"
          value={length}
          onChange={(e) =>
            setLength(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {
            loading
              ? "Generating..."
              : "Generate"
          }
        </button>

      </div>

      {article && 
        <div className="card shadow-sm p-4 mt-4">

        <h2 className="mb-4">
          Generated Article
        </h2>

        <hr />

        <div className="article-content">

          <ReactMarkdown>
            {article}
          </ReactMarkdown>

        </div>

      </div>}

    </DashboardLayout>
  );
}

export default ArticleGenerator;