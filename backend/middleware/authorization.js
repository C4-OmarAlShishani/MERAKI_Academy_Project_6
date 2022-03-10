const connection = require("../db/db");

// This function checks if the user has a permission the passed permission
const authorization = (string) => {
  return (req, res, next) => {
    query = `SELECT permissions.permission FROM roles join role_permission ON roles.id = role_permission.role join permissions on role_permission.permission = permissions.id where roles.id = ?`;
    const data = [req.token.role];
    connection.query(query, (err, result) => {
      if (err) throw err;
      result.forEach((permission) => {
        if (permission.permission !== string) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized`,
          });
        }
      });
      next();
    });
  };
};


module.exports = authorization;
