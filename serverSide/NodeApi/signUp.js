const bodyParser = require('../Utils/bodyParser');
const writeToFile = require('../Utils/write-to-file');
module.exports =async (req,resp)=>{
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
    resp.end();
  } catch (err) {
    console.log(err);
    resp.writeHead(400, { "Content-Type": "application/json" });
    resp.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not valid",
      })
    );
  }
}