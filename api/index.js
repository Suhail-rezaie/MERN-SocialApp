// const express = require("express");
// const { mongoose } = require("mongoose");
// const app = express();
// const dotenv = require("dotenv");
// const authRoute = require("./routes/auth");
// const usersRoute = require("./routes/users");
// const postRoute = require("./routes/posts");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const multer = require("multer");
// const path = require("path");
// const cors = require('cors')

// dotenv.config();

// //middleware
// app.use(cors())


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", true);
//   next();
// });

// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));
// // connect to db
// mongoose.connect(process.env.URL).then(() => {
//   console.log("connected to DB");
// });



// app.use("/images", express.static(path.join(__dirname, "public/images")));

// //file uploading using multer

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
// app.use("/api/posts", postRoute);

// app.listen(3500, () => {
//   console.log("server is running!");
// });


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
const cors = require('cors');

dotenv.config();

// Enable CORS
app.use(cors());

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)


// Other middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Connect to MongoDB
mongoose.connect(process.env.URL).then(() => {
  console.log("Connected to DB");
});

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// File uploading using multer
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
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
