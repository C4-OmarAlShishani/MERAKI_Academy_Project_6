/** @format */

const connection = require("../database/db");

// This function create new item
const createNewVideo = (req, res) => {
  const {
    title,
    descriptions,
    album_id,
    video,
    user_id,
    starterImage,
    dateToday,
  } = req.body;

  const query = `INSERT INTO videos (title, descriptions,album_id, video, user_id ,starterImage ,dateToday) VALUE (?,?,?,?,?,?,?)`;
  const data = [
    title,
    descriptions,
    album_id,
    video,
    user_id,
    starterImage,
    dateToday,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `new video created`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get all items from items
const getAllVideos = (req, res) => {
  // SELECT * videos LEFT JOIN users ON videos.user_id = users.id WHERE is_deleted = 0
  // SELECT * FROM videos WHERE is_deleted = 0
  // , title, descriptions, album_id, video
  const query = `SELECT users.*, videos.id, videos.*  FROM videos LEFT JOIN users ON videos.user_id = users.id `;
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
        message: `No Videos Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the Videos`,
      result: result,
    });
  });
};
// // =================================================== // done

// This function delete Item By Id
const deleteVideoById = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE videos SET is_deleted = 1 WHERE id=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No video with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to delete video with id ${id}`,
      result: result,
    });
  });
};

// =================================================== // done
// This function get Item By Id
const getVideoById = (req, res) => {
  let { id } = req.query;

  const query = `SELECT users.*, videos.id, videos.*  FROM videos inner JOIN users ON videos.id = ?  AND videos.user_id = users.id`;

  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No video with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get video with id ${id}`,
      result: result,
    });
  });
};

// // =================================================== // done
// This function to update item by id.
const updateVideoById = (req, res) => {
  const { title, descriptions, album_id, video, user_id, starterImage } =
    req.body;
  const id = req.params.id;
  const query = `UPDATE videos SET video= IF(${
    video != ""
  }, ?, video), title= IF(${title != ""}, ?, title), descriptions=IF(${
    descriptions != ""
  }, ?, descriptions) , album_id = IF(${
    album_id != ""
  }, ?, album_id) , user_id= IF(${
    user_id != ""
  }, ?, user_id), starterImage= IF(${
    starterImage != ""
  }, ?, starterImage) WHERE id=?;`;

  const data = [
    title,
    descriptions,
    album_id,
    video,
    user_id,
    starterImage,
    id,
  ];

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
        massage: `The video : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the video updated`,
      result: results,
    });
  });
};
// // =================================================== // done

const videoViews = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE videos SET showVideo =showVideo+ 1 WHERE id=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No video with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to show video with id ${id}`,
      result: result,
    });
  });
};

// // =================================================== // done

const addLike = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE videos SET likes =likes + 1 WHERE id=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No video with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to show video with id ${id}`,
      result: result,
    });
  });
};
// // =================================================== // done
const addDisLike = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE videos SET dislike = dislike + 1 WHERE id=?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No video with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to show video with id ${id}`,
      result: result,
    });
  });
};
// // =================================================== // done
// This function get all items like value
const getFilteredItems = (req, res) => {
  const { value } = req.body;
  const query = `SELECT * FROM videos WHERE videos.title LIKE ?;`;
  const data = [value];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result) {
      return res.status(200).json({
        success: false,
        message: `No items Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the items`,
      result: result,
    });
  });
};
// // =================================================== // done

module.exports = {
  createNewVideo,
  getAllVideos,
  deleteVideoById,
  getVideoById,
  updateVideoById,
  videoViews,
  getFilteredItems,
  addLike,
  addDisLike,
};
