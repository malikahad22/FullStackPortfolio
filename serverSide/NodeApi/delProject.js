const writeProject = require("../Utils/writeProject");

module.exports = (req, resp) => {

  let id = req.url.split('/')[2];

  if(req.url ===`/projects/${id}`){

    const filteredProject = req.projects.findIndex((project) => {
      return project.id == id;
    });
    
    console.log(filteredProject)
  
    if (filteredProject === -1) {
      resp.statusCode = 404;
      resp.write(
        JSON.stringify({ title: "Not Found", message: "Project not found" })
      );
      resp.end();
    } 
    else 
    {
      req.projects.splice(filteredProject, 1);
      writeProject(req.projects);
      resp.writeHead(204, { "Content-Type": "application/json" });
      resp.end(JSON.stringify(req.projects));
    }
  }

  else
  {
    resp.writeHead(404,{'Content-Type':'application/json'});
    resp.write(JSON.stringify({message:'404 Page'}));
    resp.end();
  }

  
}
