const bodyParser = require('../Utils/bodyParser');
const writeToSession =require('../Utils/writeToSession')
const { tokenExpiry } = require("../Utils/sessionExp");
const {con} = require('../config');
module.exports =async (req,resp)=>{
  let token = req.headers.authorization;
  let decode = tokenExpiry(token);

  try {
    if(!decode){
      console.log("Token is Expire");
      writeToSession(token)
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify('Token is Expire'));
    }
    else 
    {

    let body = await bodyParser(req);

    let id = Math.random();

    body.id = id;
    body.userId = decode.userId;
    let sql = `INSERT INTO projects (id,userId,title,imageUrl,des,frame,lang,tags,live,code)
              values (${id},${body.userId},'${body.title}','${body.imageUrl}','${body.des}','${body.frame}','${body.lang}','${body.tags}','${body.live}','${body.code}')` 

    con.query(sql,(err,result)=>{
      if(err){
        console.log(err);
      }
      else 
      {
        console.log(result)
        resp.writeHead(201, { "Content-Type": "application/json" });
        resp.end();
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