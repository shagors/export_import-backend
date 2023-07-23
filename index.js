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

// server connection test
db.connect((err) => {
  if (err) throw err.message("Something wrong in DB connection");
  console.log("Connected with DB!");
});

// product name post from frontend to server - api
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

// product get from server to frontend - api
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// oofice accounts data entry from accounts to server - api
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

// office accounts data get from server to frontend
app.get("/office_accounts", (req, res) => {
  const sql = "SELECT * FROM office_accounts";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// transport route post to server from frontend - api
app.post("/transport", (req, res) => {
  const sql =
    "INSERT INTO transport (`transportWay`,`transportCost`) VALUES(?)";
  const values = [req.body.transportWay, req.body.transportCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport data get api from server to frontend show
app.get("/transport", (req, res) => {
  const sql = "SELECT * FROM transport";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

//transport country api data collet from frontend sent to server
app.post("/transport_country", (req, res) => {
  const sql =
    "INSERT INTO transport_country (`countryName`,`countryPort`) VALUES(?)";
  const values = [req.body.countryName, req.body.countryPort];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport country api data collect from server sent to frontend
app.get("/transport_country", (req, res) => {
  const sql = "SELECT * FROM transport_country";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// transport service api for data collect frontend to server
app.post("/transport_service", (req, res) => {
  const sql =
    "INSERT INTO transport_service (`transportVehical`,`transportVehicalCost`) VALUES(?)";
  const values = [req.body.transportVehical, req.body.transportVehicalCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport service api for data sent server to frontend
app.get("/transport_service", (req, res) => {
  const sql = "SELECT * FROM transport_service";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// Charges type api for data get from frontend
app.post("/addcharges", (req, res) => {
  const sql = "INSERT INTO addcharges (`particularExpencessName`) VALUES(?)";
  const values = [req.body.particularExpencessName];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// charges type api call from frontend and data send from server
app.get("/addcharges", (req, res) => {
  const sql = "SELECT * FROM addcharges";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.listen(5001, () => {
  console.log("Listen from server");
});
