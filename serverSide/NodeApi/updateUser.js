const requestBodyparser = require("../Utils/bodyParser");

const sessionData = require('../session.json');
const { tokenExpiry } = require("../Utils/sessionExp");
let { con } = require('../config');
module.exports = async (req, resp) => {

  let token = req.headers.authorization;

  let id = req.url.split('/')[2];


  try {
    let body = await requestBodyparser(req);

    let sql = `UPDATE users
               SET id = ${id} ,title = '${body.title}', name = '${body.name}',email ='${body.email}',address = '${body.address}',profileImage = '${body.profileImage}', about =' ${body.about}',skills = '${body.skills}', userStatus = '${body.userStatus}', linkedin = '${body.linkedin}',github = '${body.github}',twitter= '${body.twitter}'
                where id = ${id}`;
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error Updating user to the database" }));
      }
      else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(result));
      }
    });
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