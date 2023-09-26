const bodyParser = require('../Utils/bodyParser');
const writeToFile = require('../Utils/write-to-file');
const sessionData = require('../session.json')
const { tokenExpiry } = require("../Utils/sessionExp");

module.exports = async (req, resp) => {

  let token;
  token = req.headers.authorization;

  try {

    let body = await bodyParser(req);

    if (!body.name || !body.email || !body.number || !body.address || !body.password) {
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
    body.id = id;

    req.users.push(body);
    writeToFile(req.users);
    resp.writeHead(201, { "Content-Type": "application/json" });
    resp.end(JSON.stringify({ message: "User Added Successfully" }));
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