const bodyParser = require('../Utils/bodyParser');
const writeToProject = require('../Utils/writeProject');
const project  = require('../projects.json');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "my-secret-id";
const sessionData =  require('../session.json');
const { tokenExpiry } = require("../Utils/sessionExp");

module.exports =async (req,resp)=>{
  let token = req.headers.authorization;

if(req.url === '/projects'){


  try {
    const decode = jwt.verify(token,JWT_SECRET)

    let body = await bodyParser(req);

    let id = Math.random();

    body.id = id;
    body.UserId = decode.userId; 

    project.push(body);

    writeToProject(project);
    
    resp.writeHead(201, { "Content-Type": "application/json" });
    resp.end();
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
else{
  resp.writeHead(404,{'Content-Type':'application/json'});
      resp.write(JSON.stringify({message:'404 Page'}));
      resp.end();
}
}