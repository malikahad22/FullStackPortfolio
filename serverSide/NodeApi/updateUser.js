const requestBodyparser = require("../Utils/bodyParser");
const writeToFile = require("../Utils/write-to-file");
const users = require('../db.json');
const sessionData =  require('../session.json');
const { tokenExpiry } = require("../Utils/sessionExp");
module.exports =async (req,resp) => {

  let token = req.headers.authorization;
  console.log(token)

  let id = req.url.split('/')[2];


    try {
      let body = await requestBodyparser(req);

      const index = users.findIndex((user) => {
        return user.id == id;
      });

      if (index === -1) {
        resp.statusCode = 404;
        resp.write(
          JSON.stringify({ title: "Not Found", message: "project not found" })
        );
        resp.end();
      } else {
        users[index] = { id, ...body };
        writeToFile(users);
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(users[index]));
      }
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