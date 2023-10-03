const { tokenExpiry } = require('../Utils/sessionExp');
const writeToSession = require('../Utils/writeToSession');

const {con} = require('../config');

module.exports = (req,resp)=>{

  let token = req.headers.authorization;
  let decodedToken = tokenExpiry(token);

  try{

    if(!decodedToken){

     
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
    else 
    {
      let sql = "select * from projects";
      con.query(sql,(err,result)=>{
        if(err){
          console.log(err);
        }
        else 
        {
          resp.writeHead(200,{"Content-Type":"application/json"});
      resp.end(JSON.stringify(result));
        }
      })
    }   
  }
  catch (err) {
  
      console.error(err);
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ title: "Bad Request", message: "Request Body is not Valid!" }));

  }
}