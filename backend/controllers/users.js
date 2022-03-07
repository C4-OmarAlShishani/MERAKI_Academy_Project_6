/** @format */

const bcrypt = require("bcrypt");
const connection = require("../database/db");

// const secretSalt = process.env.SALT;
// require("dotenv").config();

// This function to sign up new user .
const createNewUser = async (req, res) => {
  const { user_name, email, password, role_id } = req.body;

  const hashingPass = await bcrypt.hash(password, 5);

  const query = `INSERT INTO users (user_name, email, password, role_id) VALUES (?,?,?,?)`;
  const data = [user_name, email, hashingPass, role_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: "server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: "Success user Added",
      results: results,
    });
  });
};

// This function to get user by id.
const getUserById = (req, res) => {
  const id = req.query.id;

  const query = `SELECT * FROM users  WHERE id=?`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (results.length == 0) {
      return res.status(404).json({
        success: false,
        massage: "The user Not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The user ${id}`,
      results: results,
    });
  });
};

// This function to update user by id.
const updateUserById = (req, res) => {
  const { user_name, email, password, role_id } = req.body;
  const id = req.query.id;

  const query = `UPDATE users SET user_name=?, email=?, password=? , role_id = ? WHERE id=?;`;

  const data = [user_name, email, password, role_id, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      return res.status(404).json({
        success: false,
        massage: `The user : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the user updated`,
      results: results,
    });
  });
};

// This function to delete user by id.
const deleteUserById = (req, res) => {
  const id = req.params.id;

  const query = `DELETE from users WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The user: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete user with id: ${id}`,
      results: results,
    });
  });
};
// // =================================================== // done

// This function get all items from items
const getAllIUses = (req, res) => {
  const query = `SELECT * FROM users`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the users`,
      result: result,
    });
  });
};
module.exports = {
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllIUses,
};
