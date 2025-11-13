const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sigma_app",
  password: "Ani@2005",
});

// HOME ROUTE
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count FROM user";
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.send("Error in database");
    }
    let count = result[0].count;
    res.render("home.ejs", { count });
  });
});

// SHOW USERS ROUTE
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  connection.query(q, (err, users) => {
    if (err) {
      console.error(err.message);
      return res.send("Error in database");
    }
    res.render("showUsers.ejs", { users });
  });
});

// EDIT ROUTE
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.send("Error in database");
    }
    if (result.length === 0) return res.send("User not found");
    let user = result[0];
    res.render("edit.ejs", { user });
  });
});

// UPDATE USER ROUTE
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password, newUsername, newEmail } = req.body;

  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (err, result) => {
    if (err) return res.send("Error in database");
    if (result.length === 0) return res.send("User not found");

    let user = result[0];
    if (password != user.password) {
      return res.send("WRONG PASSWORD!");
    }

    let q2 = "UPDATE user SET `user` = ?, email = ? WHERE id = ?";
    connection.query(q2, [newUsername, newEmail, id], (err) => {
      if (err) return res.send("Error updating user");
      res.redirect("/user");
    });
  });
});

// DELETE ROUTE (confirm page)
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (err, result) => {
    if (err) return res.send("Error in database");
    if (result.length === 0) return res.send("User not found");
    let user = result[0];
    res.render("delete.ejs", { user });
  });
});

// DELETE USER ROUTE (DB)
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password, newEmail } = req.body;

  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (err, result) => {
    if (err) return res.send("Error in database");
    if (result.length === 0) return res.send("User not found");

    let user = result[0];
    if (password != user.password || newEmail != user.email) {
      return res.send("WRONG PASSWORD or EMAIL");
    }

    let q3 = "DELETE FROM user WHERE id = ?";
    connection.query(q3, [id], (err) => {
      if (err) return res.send("Error deleting user");
      res.redirect("/user");
    });
  });
});

// ADD USER FORM ROUTE
app.get("/user/add", (req, res) => {
  res.render("addUser.ejs", { error: null });
});

// ADD USER TO DB
app.post("/user", (req, res) => {
  let { newId, newUsername, newEmail, password } = req.body;
  let q = "INSERT INTO user (id, `user`, email, password) VALUES (?, ?, ?, ?)";

  connection.query(q, [newId, newUsername, newEmail, password], (err) => {
    if (err) {
      console.error(err.message);
      if (err.errno === 1062) {
        // Duplicate entry
        return res.render("addUser.ejs", { error: "User ID or Email already exists!" });
      }
      return res.render("addUser.ejs", { error: "Database error occurred!" });
    }
    res.redirect("/user");
  });
});

// SEARCH FORM ROUTE
app.get("/user/search", (req, res) => {
  res.render("search.ejs");
});

// SEARCH USER BY ID
app.post("/user/searched", (req, res) => {
  let { searchId } = req.body;
  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [searchId], (err, result) => {
    if (err) return res.send("Database error");
    if (result.length === 0) return res.send("No user found with that ID");
    let result1 = result[0];
    res.render("show.ejs", { result1 });
  });
});

// START SERVER
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
