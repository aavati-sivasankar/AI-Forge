import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        }}
    >
      <h3>AI Forge</h3>

      <hr />

      <ul className="list-unstyled">

        <li className="mb-3">
          <Link
            to="/dashboard"
            className="text-white text-decoration-none"
          >
            Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/article-generator"
            className="text-white text-decoration-none"
          >
            Article Generator
          </Link>
        </li>

        <li className="mb-3">
            <Link
                to="/blog-generator"
                className="
                text-white
                text-decoration-none
                "
            >
                Blog Generator
            </Link>
        </li>

        <li className="mb-3">
            <Link
                to="/resume-analyzer"
                className="
                text-white
                text-decoration-none
                "
            >
                Resume Analyzer
            </Link>
        </li>
        <li className="mb-3">
            <Link
                to="/background-remover"
                className="
                text-white
                text-decoration-none
                "
            >
                Background Remover
            </Link>
        </li>
        <li className="mb-3">
            <Link
                to="/pdf-summarizer"
                className="
                text-white
                text-decoration-none
                "
            >
                PDF Summarizer
            </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/billing"
            className="text-white text-decoration-none"
          >
            Billing and Credits
          </Link>
        </li>
        
        <li className="mb-3">
          <Link
            to="/history"
            className="text-white text-decoration-none"
          >
            History
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;