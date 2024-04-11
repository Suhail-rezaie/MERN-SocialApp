const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require('cors')

dotenv.config();

//middleware
app.use(cors())


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", true);
  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// connect to db
mongoose.connect(process.env.URL).then(() => {
  console.log("connected to DB");
});



app.use("/images", express.static(path.join(__dirname, "public/images")));

//file uploading using multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

app.listen(3500, () => {
  console.log("server is running!");
});
