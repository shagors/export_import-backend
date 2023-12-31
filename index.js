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

// server connection test is it connected or not
db.connect((err) => {
  if (err) throw err.message("Something wrong in DB connection");
  console.log("Connected with DB!");
});

// User create API - request comming from front-end to backend
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

// user check API for login test from frontend to server request
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

// product name post from frontend to server - API --- 1
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

// product get API from server to frontend - API --- 2
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// oofice accounts data entry from accounts to server - API --- 3
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

// oofice accounts data entry from accounts to server - API --- 3
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

// this is my patch code for product quantity update
app.patch("/office_accounts/:productModel", (req, res) => {
  const productModel = req.params.productModel;
  const productQuantity = req.body.productQuantity;

  const sql =
    "UPDATE office_accounts SET productQuantity = productQuantity - ? WHERE productModel = ?";
  const values = [productQuantity, productModel];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// office accounts data get from server to frontend --- API--- 4
app.get("/office_accounts", (req, res) => {
  const sql = "SELECT * FROM office_accounts";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// oofice accounts match test data entry from accounts to server - API --- 3
app.post("/modelcalc", (req, res) => {
  const sql =
    "INSERT INTO modelcalc (`productModel`, `productQuantity`) VALUES(?)";
  const values = [req.body.productModel, req.body.productQuantity];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// oofice accounts clone data entry from accounts to server - API --- 3
app.post("/office_accounts_clone", (req, res) => {
  const sql =
    "INSERT INTO office_accounts_clone (`productName`,`date`, `productBrand`,`productModel`, `productQuantity`) VALUES(?)";
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

// office accounts data get from server to frontend --- API --- 4
app.get("/office_accounts_clone", (req, res) => {
  const sql = "SELECT * FROM office_accounts_clone";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for delete data office_accounts_clone API and also frontend can delete data by id --- 14
app.delete("/office_accounts_clone/:id", (req, res) => {
  const sql = "DELETE FROM office_accounts_clone WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ Message: "Error inside server" });
    return res.status(200).json(result);
  });
});

// transport route post to server from frontend - API --- 5
app.post("/transport", (req, res) => {
  const sql =
    "INSERT INTO transport (`transportWay`,`transportCost`) VALUES(?)";
  const values = [req.body.transportWay, req.body.transportCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport data get API from server to frontend show --- API -- 6
app.get("/transport", (req, res) => {
  const sql = "SELECT * FROM transport";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

//transport country API data collet from frontend sent to server --- API --- 7
app.post("/transport_country", (req, res) => {
  const sql =
    "INSERT INTO transport_country (`countryName`,`countryPort`) VALUES(?)";
  const values = [req.body.countryName, req.body.countryPort];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport country API data collect from server sent to frontend ---API--- 8
app.get("/transport_country", (req, res) => {
  const sql = "SELECT * FROM transport_country";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// transport service API for data collect frontend to server ---API--- 9
app.post("/transport_service", (req, res) => {
  const sql =
    "INSERT INTO transport_service (`transportVehical`,`transportVehicalCost`) VALUES(?)";
  const values = [req.body.transportVehical, req.body.transportVehicalCost];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// transport service API for data sent server to frontend ---API--- 10
app.get("/transport_service", (req, res) => {
  const sql = "SELECT * FROM transport_service";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// Charges type API for data get from frontend ---API--- 11
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

// charges type API call from frontend and data send from server ---API--- 12
app.get("/addcharges", (req, res) => {
  const sql = "SELECT * FROM addcharges";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// call id by charges data and show data show in update page  ---API--- 13
app.get("/addcharges/:id", (req, res) => {
  const sql = "SELECT * FROM addcharges WHERE id =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for delete data charges api and also frontend ---API-- 14
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM addcharges WHERE id = ?";
  const id = req.params.id;
  console.log(id);
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ Message: "Error inside server" });
    return res.status(200).json(result);
  });
});

// update methods add for charges api ---API--- 15
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

// purchase data post to server from frontend ---API--- 16
app.post("/purchase", (req, res) => {
  const sql =
    "INSERT INTO purchase (`transportWay`,`transportCountryName`, `particularExpenseName`, `product`) VALUES(?)";
  const values = [
    req.body.transportWay,
    req.body.transportCountryName,
    req.body.particularExpenseName,
    req.body.product,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting Data:", err);
      res.status(500).send("Error inserting Data:");
      return;
    }
    return res.status(200).send("Data inserted successfully", result);
  });
});

// purchase data get api for sent server to frontend ---- API --- 17
app.get("/purchase", (req, res) => {
  const sql = "SELECT * FROM purchase";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// Boxes List
app.post("/palletbox", (req, res) => {
  const sql =
    "INSERT INTO palletbox (`productName`,`productModel`, `quantity`, `splitProductsBox`,`splitQuantitySingleProduct`,`productPerBox`,`totalBox`,`totalPallet`,`truckNumber`) VALUES(?)";
  const values = [
    req.body.productName,
    req.body.productModel,
    req.body.quantity,
    req.body.splitProductsBox,
    req.body.splitQuantitySingleProduct,
    req.body.productPerBox,
    req.body.totalBox,
    req.body.totalPallet,
    req.body.truckNumber,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting Data:", err);
      res.status(500).send("Error inserting Data:");
      return;
    }
    return res.status(200).send("Data inserted successfully", result);
  });
});

app.listen(5001, () => {
  console.log("Listen from server");
});
