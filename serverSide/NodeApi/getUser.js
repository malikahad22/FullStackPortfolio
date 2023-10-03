const { tokenExpiry } = require('../Utils/sessionExp');
let {con} = require('../config');
module.exports = (req, resp) => {
  let token = req.headers.authorization;
  let decode = tokenExpiry(token);



  try {
    if (!decode) {
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
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "Token is invalid or expired" }));
    }
    else {
      let sql = "SELECT * from users"
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          let foundUser = result.find((u) => {
            if (u.id == decode.userId) {
              return u;
              
            }
          });
          let  {password , ...data} = foundUser;
          resp.writeHead(200, { 'Content-Type': 'application/json' }, token);
          resp.end(JSON.stringify(data));
        }
      });
    }
  }
  catch (err) {
    resp.writeHead(400, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ message: "Users Not Exist" }));
  }


}