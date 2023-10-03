const { tokenExpiry } = require("../Utils/sessionExp");
const bodyParser = require('../Utils/bodyParser');
const {con} = require('../config');
module.exports = async (req, resp) => {
  let token = req.headers.authorization;
  try {
    let body = await bodyParser(req);

    if (!body.name || !body.email || !body.mobile || !body.address || !body.password) {
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "All fields (name, email, number, address, password) are required",
        })
      );
      return; // Stop processing the request
    }

    let id = Math.random();

    // Use a parameterized query to avoid SQL injection
    let sql = `INSERT INTO users (id, name,email, mobile, address, password, profileImage, title, about, skills)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    con.query(sql, [id, body.name,body.email, body.mobile, body.address, body.password, body.profileImage, body.title, body.about, body.skills],  (err, result) => {
      if (err) {
        console.error(err);
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
      } else {
        resp.writeHead(201, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ message: "User Added Successfully" }));
      }
    });
  } catch (err) {
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
};
