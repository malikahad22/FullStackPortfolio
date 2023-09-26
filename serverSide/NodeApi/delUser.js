const writeToFile = require("../Utils/write-to-file");

module.exports = (req, resp) => {

  let id = req.url.split('/')[2];

  if(req.url ===`/users/${id}`){

    const filteredUser = req.users.findIndex((user) => {
      return user.id == id;
    });
  
    if (filteredUser === -1) {
      resp.statusCode = 404;
      resp.write(
        JSON.stringify({ title: "Not Found", message: "User not found" })
      );
      resp.end();
    } 
    else 
    {
      req.users.splice(filteredUser, 1);
      writeToFile(req.users);
      resp.writeHead(204, { "Content-Type": "application/json" });
      resp.end(JSON.stringify(req.users));
    }
  }

  else
  {
    resp.writeHead(404,{'Content-Type':'application/json'});
    resp.write(JSON.stringify({message:'404 Page'}));
    resp.end();
  }

  
}
