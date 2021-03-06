/** @format */

const connection = require("../database/db");

// This function create new item
const createNewComment = (req, res) => {
  const { comment, video_id, commentr_id } = req.body;

  const query = `INSERT INTO comments (comment, video_id, commentr_id) VALUE (?,?,?)`;
  const data = [comment, video_id, commentr_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `new Comment created`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get all items from items
const getAllComments = (req, res) => {
  const query = `SELECT * FROM comments `;
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
        message: `No Comments Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the Comments`,
      result: result,
    });
  });
};
// // =================================================== // done

// This function delete Item By Id
const deleteCommentById = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE comments SET is_deleted = 1 WHERE id=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No Comment with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to delete Comment with id ${id}`,
      result: result,
    });
  });
};

// =================================================== // done
// This function get Item By Id
const getCommentById = (req, res) => {
  let { id } = req.query;

  const query = `SELECT * FROM Comments WHERE id=? AND is_deleted=0`;

  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No Comment with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get Comment with id ${id}`,
      result: result,
    });
  });
};

// =================================================== // done
// This function get Item By Id
const getCommentByVideoId = (req, res) => {
  let { id } = req.query;

  // const query = `SELECT * FROM Comments WHERE video_id=?`;
  const query = `SELECT *  FROM Comments inner JOIN users ON Comments.video_id = ?  AND Comments.commentr_id = users.id`;

  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No Comment with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get Comment with id ${id}`,
      result: result,
    });
  });
};
// // =================================================== // done
// This function to update item by id.
const updateCommentById = (req, res) => {
  const { comment} =
    req.body;
  const id = req.params.id;
  const query = `UPDATE comments SET comment= IF(${comment != ""}, ?, title)) WHERE id=?;`;

  const data = [ title];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      return res.status(500).json({
        success: false,
        massage: `The Comment : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the Comment updated`,
      result: results,
    });
  });
};

// // =================================================== // done

module.exports = {
  createNewComment,
  getAllComments,
  deleteCommentById,
  getCommentById,
  getCommentByVideoId,
  updateCommentById,
};
