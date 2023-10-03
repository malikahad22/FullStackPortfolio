const sessionData = require('../Utils/sessionExp');
const { con } = require('../config');
module.exports = (req, resp) => {

  let token = req.headers.authorization;

  let id = req.url.split('/')[2];



  try {
    let sql = `DELETE FROM projects where id = ${id}`;
    con.query(sql, (err, result) => {

      if (err) {
        console.error(err);
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error Updating user to the database" }));
      }
      else {
        resp.writeHead(204, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(result));
      }

    })
  }
  catch (err) {
    if (err.name === 'TokenExpiredError') {
      const errorResponse = tokenExpiry(sessionData, token);
      resp.writeHead(errorResponse.statusCode, { "Content-Type": "application/json" });
      resp.end(JSON.stringify(errorResponse));
    } else {
      console.error(err);
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ title: "Bad Request", message: "Request Body is not Valid!" }));
    }

  }
}
