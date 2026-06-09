require("dotenv").config();

const express = require("express");
const cors = require("cors");

const articleRoute = require("./routes/article.route");
const testRoute = require("./routes/test.route");
const userRoute = require("./routes/user.route");
const dashboardRoute = require("./routes/dashboard.route");
const blogRoute = require("./routes/blog.route");
const historyRoute = require("./routes/history.route");
const resumeRoute = require("./routes/resume.route");
const backgroundRoute = require("./routes/background.route");
const pdfRoute = require("./routes/pdf.route");
const statsRoute = require("./routes/stats.route");
const paymentRoute = require("./routes/payment.route");
const webhookRoute = require("./routes/webhook.route");


const app = express();
app.use((req, res, next) => {

  console.log(
    req.method,
    req.originalUrl
  );

  next();

});
app.use(
  "/api/webhook",
  express.raw({
    type: "application/json",
  }),
  webhookRoute
);
app.use(express.json());
const { clerkMiddleware } = require("@clerk/express");

app.use(clerkMiddleware());


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  "/api/pdf",
  pdfRoute
);
app.use(
  "/api/stats",
  statsRoute
);
app.use(
  "/api/dashboard",
  dashboardRoute
);
app.use(
  "/api/background",
  backgroundRoute
);
app.use(
  "/api/blog",
  blogRoute
);
app.use(
  "/api/payment",
  paymentRoute
);
app.use(
  "/api/resume",
  resumeRoute
);

app.use(
  "/api/history",
  historyRoute
);






app.use("/api/user", userRoute);

app.use("/api/test", testRoute);

app.use("/api/article", articleRoute);

app.get("/api/test-gemini", async (req, res) => {
  res.json({
    keyExists: !!process.env.GEMINI_API_KEY,
    keyStart: process.env.GEMINI_API_KEY?.slice(0, 10),
  });
});

// Clerk Middleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});