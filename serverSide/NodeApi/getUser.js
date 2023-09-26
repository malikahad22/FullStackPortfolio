
const users = require('../db.json');
module.exports = (req, resp) => {
    try{
      resp.writeHead(200, { 'Content-Type': 'application/json' });
      resp.write(JSON.stringify(users));
      resp.end();
    }
    catch(err){
      resp.writeHead(400,{'Content-Type':'application/json'});
      resp.end(JSON.stringify({message:"Users Not Exist"}));
    }
  


}