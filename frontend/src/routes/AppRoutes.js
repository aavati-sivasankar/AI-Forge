import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  ToastContainer,
} from "react-toastify";

import
"react-toastify/dist/ReactToastify.css";

import Dashboard from "../pages/Dashboard";
import ArticleGenerator from "../pages/ArticleGenerator";
import History from "../pages/History";
import BlogGenerator from "../pages/BlogGenerator";
import LandingPage from "../pages/LandingPage";
import ResumeAnalyzer from "../pages/resumeAnalyser";
import BackgroundRemover from "../pages/BackgroundRemover";
import PDFSummarizer from "../pages/PDFSummarizer";
import Billing from "../pages/Billing";
import PaymentSuccess from "../pages/paymentSuccess";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            element={<LandingPage />}
        />
        <Route
          path="/payment-success"
          element={
            <PaymentSuccess />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/pdf-summarizer"
          element={
            <PDFSummarizer />
          }
        />
        
        <Route
          path="/background-remover"
          element={
            <BackgroundRemover />
          }
        />
        <Route
          path="/billing"
          element={
            <Billing />
          }
        />
        <Route
          path="/article-generator"
          element={<ArticleGenerator />}
        />

        <Route
          path="/history"
          element={<History />}
        />
        <Route
            path="/blog-generator"
            element={<BlogGenerator />}
        />
        <Route
          path="/resume-analyzer"
          element={
            <ResumeAnalyzer />
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default AppRoutes;