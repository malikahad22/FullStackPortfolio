const {con} = require('../config');
const { tokenExpiry } = require('../Utils/sessionExp');
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

        let sql = "SELECT * from experience";
        con.query(sql,(err,result)=>{
          if(err){
            console.error(err);
            resp.writeHead(500, { "Content-Type": "application/json" });
            resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
          }
          else
          {

            let foundExp = result.filter((ex) => {
              if (ex.userId == decode.userId) {
                return ex;
              }
            });
      
            resp.writeHead(200, { "Content-Type": "application/json" });
            resp.end(JSON.stringify(foundExp));
          }
        });
    }
  }
  catch (err) {
    resp.writeHead(404, { "Content-Type": "application/json" });
    resp.end(JSON.stringify("NOT FOUND"));
  }
}