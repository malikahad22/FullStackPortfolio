const { tokenExpiry } = require('../Utils/sessionExp');
const { con } = require('../config');
module.exports = (req, resp) => {

  let token = req.headers.authorization;
  let decode = tokenExpiry(token);

  try {

    if (!decode) {
      console.log("Token is Expire");
      // Token is invalid or expired
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "Token is invalid or expired" }));
      let sql = `DELETE FROM sessionrecord where token = '${token}'`;
      con.query(sql,(err,result)=>{
        if(err){
          console.log(err);
        }
        else 
        {
          console.log("Record deleted successfully"+result);
        }
      });
    }
    else {

      let sql = "SELECT * from projects";
      con.query(sql, (err, result) => {

        if (err) {
          console.error(err);
          resp.writeHead(500, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
        }
        else {
          let filterProjects = result.filter((p) => {
            if (p.userId == decode.userId) {
              return p;
            }
          });
          resp.writeHead(200, { 'Content-Type': 'application/json' });
          resp.write(JSON.stringify(filterProjects));
          resp.end();

        }

      })

    }
  }
  catch (err) {

    resp.writeHead(404, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ message: ' Project Not Found' }));
    resp.end();
  }
}