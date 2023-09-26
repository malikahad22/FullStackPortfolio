const jwt = require("jsonwebtoken");
const writeToFile = require("../Utils/write-to-file");
const bodyParser = require("../Utils/bodyParser");
const JWT_SECRET = "my-secret-id";

module.exports = async (req, resp) => {

  let index = req.url.split('/')[2];
  console.log('Index:', index);

  const token = req.headers.authorization;
  console.log(token);

  if (! token) {
    resp.writeHead(401, {message: "Token Expired"});
  }


  if (req.url === `/exp/${index}`) {


    try {
      let body = await bodyParser(req);
      const decode = jwt.verify(token, JWT_SECRET);
     

      let USER = req.users.find((user) => {
        if (user.id === decode.userId) {
          return user;
        }
      });
     
      USER.exp[index] = body;

      writeToFile(req.users);
      resp.writeHead(200, {'Content-Type': 'application/json'});
      resp.end(JSON.stringify("Experience Update Successfull"));

    } catch (err) {
      resp.writeHead(500, {'Content-Type': 'application/json'});
      resp.end(JSON.stringify({error: 'Internal server error'}));
    }


  }


}
