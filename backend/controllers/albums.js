/** @format */

const connection = require("../database/db");

// =================================================== // done

// This function creates new category
const createNewAlbum = (req, res) => {
  const { album } = req.body;

  const query = `INSERT INTO albums (album) VALUE (?)`;
  const data = [album];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `Album Created`,
      result: result,
    });
  });
};
// =================================================== // done

// This function creates new category
const updateAlbum = (req, res) => {
  const id = req.params.id;
  const { album } = req.body;
  const query = `UPDATE albums SET album =?  WHERE id = ?`;
  const data = [album, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Album with id ${id} updated `,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns the categories
const getAllAlbums = (req, res) => {
  const query = `SELECT * FROM albums WHERE is_deleted = 0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result) {
      return res.status(200).json({
        success: false,
        message: `No Albums Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All the Albums`,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns Category By Id
const getAlbumById = (req, res) => {
  let id = req.params.id;
  const query = `SELECT * FROM albums WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The Album ${id}`,
      result: result,
    });
  });
};
// =================================================== // done

// This function delete Category By Id
const deleteAlbumById = (req, res) => {
  let id = req.params.id;
  const query = `UPDATE albums SET is_deleted = 1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The album with ${id} deleted`,
      result: result,
    });
  });
};
module.exports = {
  createNewAlbum,
  updateAlbum,
  getAllAlbums,
  getAlbumById,
  deleteAlbumById,
};
