import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "export_import",
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.post("/products", (req, res) => {
  const sql =
    "INSERT INTO products (`productName`,`productBrand`,`productModel`) VALUES(?)";
  const values = [
    req.body.productName,
    req.body.productBrand,
    req.body.productModel,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/office_accounts", (req, res) => {
  const sql =
    "INSERT INTO office_accounts (`productName`,`date`, `productBrand`,`productModel`, `productQuantity`) VALUES(?)";
  const values = [
    req.body.productName,
    req.body.date,
    req.body.productBrand,
    req.body.productModel,
    req.body.productQuantity,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.listen(5001, () => {
  console.log("Listen from server");
});
