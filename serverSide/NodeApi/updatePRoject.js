const requestBodyparser = require("../Utils/bodyParser");
const writeProject = require("../Utils/writeProject");
const sessionData =  require('../session.json');
const { tokenExpiry } = require("../Utils/sessionExp");

module.exports =async (req,resp) => {

  let token = req.headers.authorization;
console.log(token);
  let id = req.url.split('/')[2];


    try {
      let body = await requestBodyparser(req);
      const index = req.projects.findIndex((project) => {
        return project.id == id;
      });

      if (index === -1) {
        resp.statusCode = 404;
        resp.write(
          JSON.stringify({ title: "Not Found", message: "Project not found" })
        );

        resp.end();
      }
       else {
        req.projects[index] = { id, ...body };
        writeProject(req.projects);
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(req.projects[index]));
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