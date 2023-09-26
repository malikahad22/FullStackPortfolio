const bodyParser = require("../Utils/bodyParser");
const writeToFile = require('../Utils/write-to-file');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "my-secret-id";

module.exports =async (req,resp)=>{

  const token = req.headers.authorization;
  console.log(token);

  if(!token){
    resp.writeHead(401,{message:"Token Expired"});
  }

  try{

    let decode = jwt.verify(token,JWT_SECRET);

    let foundUser = req.users.find((i)=>{
      return i.id === decode.userId;
    });
    let body =await bodyParser(req);
    foundUser.exp.push(body);
    writeToFile(req.users);
    console.log(foundUser.exp);
    resp.writeHead(200,{'Content-Type':'application/json'});
    resp.end(JSON.stringify("Successfully Add"));

  }
  catch(err){
    resp.writeHead(401,{'Content-Type':'application/json'});
    resp.end(JSON.stringify({message:"Unsuccessfull Hit"}))
  }
}