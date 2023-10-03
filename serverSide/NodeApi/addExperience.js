const bodyParser = require("../Utils/bodyParser");
const { tokenExpiry } = require("../Utils/sessionExp");
let {con} = require('../config');
module.exports = async (req, resp) => {

  const token = req.headers.authorization;
  let decode = tokenExpiry(token);

  try {
    if (!decode) {
      console.log("Token is Expire");
      writeToSession(token)
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify('Token is Expire'));
    }
    else {
      let body = await bodyParser(req);
      let id = Math.random();
      body.id = id;
      body.userId = decode.userId;

      let sql =`INSERT INTO experience (id,userId,company,start,end)
                values (${id},${body.userId},'${body.company}','${body.start}','${body.end}')`;
        con.query(sql,(err,result)=>{
          if(err){
            console.log(err);
          }
          else 
          {
            console.log(result)
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify("Successfully Add"));
          }
        });
    }

  }
  catch (err) {
    resp.writeHead(401, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ message: "Unsuccessfull Hit" }))
  }
}