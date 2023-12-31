require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require('./userinformation')
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors(
  {
      origin: ["https://nasa-apodapi-webapp-1.vercel.app"],
      methods: ["POST", "GET"],
  }
));

app.get("/",(req,res) =>{
  res.json("Hello");
  }
)
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

