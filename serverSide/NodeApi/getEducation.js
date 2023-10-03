const { tokenExpiry } = require('../Utils/sessionExp');
const { con } = require('../config');
module.exports = (req, resp) => {
  let token = req.headers.authorization;
  let decode = tokenExpiry(token);
  try {
    if (!decode) {
      console.log("Token is Expire");
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify('Token is Expire'));

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

      let sql = "select * from education";
      con.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          resp.writeHead(500, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
        }
        else {
          let foundEdu = result.filter((ed) => {
            if (ed.userId == decode.userId) {
              return ed
            }
          });
          resp.writeHead(200, { "Content-Type": "application/json" });
          resp.end(JSON.stringify(foundEdu));

        }
      });
    }
  }
  catch (err) {
    resp.writeHead(404, { "Content-Type": "application/json" });
    resp.end(JSON.stringify("NOT FOUND"));
  }
}