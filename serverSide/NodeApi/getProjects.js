
module.exports = (req, resp) => {

  
const projects= req.projects;

  if (req.url === '/projects') {
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify(projects));
    resp.end();
  }

  else {
    resp.writeHead(404, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ message: ' Project Not Found' }));
    resp.end();
  }
}