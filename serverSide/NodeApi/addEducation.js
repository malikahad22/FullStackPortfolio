const bodyParser = require("../Utils/bodyParser");
const {con} = require('../config');
const { tokenExpiry } = require("../Utils/sessionExp");

module.exports = async (req, resp) => {

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
      let body = await bodyParser(req);
      let id = Math.random();
      body.id = id;

      body.userId = decode.userId;
      let sql = `INSERT INTO education (id,userId,institute,complete,marks,degree)
      values (${id},${body.userId},'${body.school}','${body.complete}','${body.marks}','${body.Degree}')`;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(result)
          resp.writeHead(200, { 'Content-Type': 'application/json' });
          resp.end(JSON.stringify("Successfully Add"));
        }
      });
    }

  }
  catch (err) {
    resp.writeHead(401, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ message: "Unsuccessfull Hit" }))
  }
}