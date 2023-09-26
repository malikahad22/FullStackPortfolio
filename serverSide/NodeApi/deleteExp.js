const jwt = require("jsonwebtoken");
const writeToFile = require("../Utils/write-to-file");

const JWT_SECRET = "my-secret-id";
module.exports = (req, resp) => {

  const index = req.url.split('/')[2];
  console.log('Index:', index);


  const token = req.headers.authorization;

  if(!token){
    resp.writeHead(401,{message:"Token Expired"});
  }
  
  if (req.url === `/exp/${index}`) {
    try {
      let decode = jwt.verify(token,JWT_SECRET);

      let user = req.users.find((user)=>{
        return user.id === decode.userId;
      })

     if(user){

      user.exp.splice(index,1);
      writeToFile(req.users);
      resp.writeHead(200, { 'Content-Type': 'application/json' });

      resp.end(JSON.stringify({ message: 'Request successful',user }));
     }

      
    } catch (err) {
      console.error('Error:', err);

      resp.writeHead(500, { 'Content-Type': 'application/json' });
      resp.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    resp.writeHead(404, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ error: 'Not Found' }));
  }
};
