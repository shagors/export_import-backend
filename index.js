import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const salt = 10;

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

// User create api front-end to backend
app.post("/register", (req, res) => {
  const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Data Inserting Failed" });
      return res.json({ Status: "Success" });
    });
  });
});

// user get from server and send to frontend
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Message: "Password error" });
          if (response) {
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Message: "No email found" });
    }
  });
});

// product name post from frontend to server - api --- 1
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

// product get from server to frontend - api --- 2
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// oofice accounts data entry from accounts to server - api --- 3
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

// office accounts data get from server to frontend --- 4
app.get("/office_accounts", (req, res) => {
  const sql = "SELECT * FROM office_accounts";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// transport route post to server from frontend - api --- 5
app.post("/transport", (req, res) => {
  const sql =
    "INSERT INTO transport (`transportWay`,`transportCost`) VALUES(?)";
  const values = [req.body.transportWay, req.body.transportCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport data get api from server to frontend show --- 6
app.get("/transport", (req, res) => {
  const sql = "SELECT * FROM transport";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

//transport country api data collet from frontend sent to server --- 7
app.post("/transport_country", (req, res) => {
  const sql =
    "INSERT INTO transport_country (`countryName`,`countryPort`) VALUES(?)";
  const values = [req.body.countryName, req.body.countryPort];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport country api data collect from server sent to frontend --- 8
app.get("/transport_country", (req, res) => {
  const sql = "SELECT * FROM transport_country";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// transport service api for data collect frontend to server --- 9
app.post("/transport_service", (req, res) => {
  const sql =
    "INSERT INTO transport_service (`transportVehical`,`transportVehicalCost`) VALUES(?)";
  const values = [req.body.transportVehical, req.body.transportVehicalCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport service api for data sent server to frontend --- 10
app.get("/transport_service", (req, res) => {
  const sql = "SELECT * FROM transport_service";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// Charges type api for data get from frontend --- 11
app.post("/addcharges", (req, res) => {
  const sql =
    "INSERT INTO addcharges (`particularExpencessName`, `particularExpencessCost`) VALUES(?)";
  const values = [
    req.body.particularExpencessName,
    req.body.particularExpencessCost,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// charges type api call from frontend and data send from server --- 12
app.get("/addcharges", (req, res) => {
  const sql = "SELECT * FROM addcharges";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// call id by charges data and show data show in update page  --- 13
app.get("/addcharges/:id", (req, res) => {
  const sql = "SELECT * FROM addcharges WHERE id =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for delete data charges api and also frontend --- 14
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM addcharges WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ Message: "Error inside server" });
    return res.status(200).json(result);
  });
});

// update methods add for charges api --- 15
app.put("/addcharges/:id", (req, res) => {
  const id = req.params.id;
  const values = [
    req.body.particularExpencessName,
    req.body.particularExpencessCost,
  ];
  const sql =
    "UPDATE addcharges SET particularExpencessName = ?, particularExpencessCost = ? WHERE id = ?";
  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error updating user" });
    } else {
      res.status(200).json(result);
    }
  });
});

// purchase data post to server from frontend --- 16
app.post("/purchase", (req, res) => {
  const sql =
    "INSERT INTO purchase (`transportWay`,`transportCountryName`, `particularExpencessName`, `product`) VALUES(?)";
  const values = [
    req.body.transportWay,
    req.body.transportCountryName,
    req.body.particularExpencessName,
    req.body.product,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting Data:", err);
      res.send("Error inserting Data:");
      return;
    }
    return res.send("Data inserted successfully", result);
  });
});

app.listen(5001, () => {
  console.log("Listen from server");
});
