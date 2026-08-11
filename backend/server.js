require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db-connect");
const petReportRoutes = require("./routes/petReportRoutes");
const claimRoutes = require("./routes/claimRoutes");
const rescueCaseRoutes = require("./routes/rescueCaseRoutes");
const foundPetReportRoutes = require("./routes/foundPetReportRoutes");
const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/rescueCases", rescueCaseRoutes);
app.use("/api/v1/claims", claimRoutes);
app.use("/api/v1/petReports", petReportRoutes);
app.use("/api/v1/foundPetReports", foundPetReportRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.json({
    message: "PawFinder API is running"
  });
});
