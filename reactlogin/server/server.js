import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret", // a secret key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 24 * 60 * 60,
    }, // set the session cookie properties
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.get("/", (req, res) => {
  if (req.session.name) {
    return res.json({ valid: true, name: req.session.name });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Inserting data Error in server" });
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ Message: "login Error in server" });
    if (result.length > 0) {
      req.session.name = result[0].name;
      // console.log(req.session.name);
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});

// app.get('/logout', (req,res) => {
//   res.clearCookie('token');
//   return res.json({Status:"Success"})
// })

app.listen(8081, () => {
  console.log("Running ...");
});
