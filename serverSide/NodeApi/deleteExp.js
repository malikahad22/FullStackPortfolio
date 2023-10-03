const writeToSession = require("../Utils/writeToSession");
const { tokenExpiry } = require("../Utils/sessionExp");
const { con } = require("../config");
module.exports = (req, resp) => {

  const id = req.url.split('/')[2];


  const token = req.headers.authorization;
  let decode = tokenExpiry(token);

  try {
    if (!decode) {
      console.log("Token is Expire");
      writeToSession(token)
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify('Token is Expire'));

    }
    else {
      let sql = `DELETE from experience where id = ${id}`;
      con.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          resp.writeHead(500, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error Updating user to the database" }));
        }
        else {
          resp.writeHead(200, { 'Content-Type': 'application/json' });
          resp.end(JSON.stringify({ message: 'Request successful', result }));
        }

      })
    }
  } catch (err) {
    console.error('Error:', err);

    resp.writeHead(500, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ error: 'Internal server error' }));
  }
};
