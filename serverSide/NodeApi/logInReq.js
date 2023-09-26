const bodyParser = require('../Utils/bodyParser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const users = require('../db.json');
const userSessions = require('../session.json');
module.exports = async (req, resp) => {
  if (req.url === '/login') {
    try {
      const user = await bodyParser(req);
      const data = req.users;
      if (! user.email || ! user.password) {
        resp.writeHead(400, {'Content-Type': 'application/json'});
        resp.end(JSON.stringify({message: 'All fields must be filled'}));
        return;
      }
    
      const foundUser = users.find((u) => {

        if (u.email == user.email && u.password == user.password) {
          return u;
        }


      });
      if (foundUser) {
        let user_id = foundUser.id;

        const token = jwt.sign({
          userId: foundUser.id,
          role: foundUser.role
        }, "my-secret-id",{expiresIn:'30s'} );

        let sessionInfo = {user_id,token};

        if(sessionInfo)
        {
        userSessions.push(sessionInfo);

        fs.writeFileSync(
          path.join(__dirname, "../session.json"),
          JSON.stringify(userSessions),
          "utf-8"
        );
       
        }

        resp.writeHead(200, {'Content-Type': 'application/json'});

        if (foundUser.role === 'admin') {
          resp.end(JSON.stringify({message: 'Admin', token,foundUser}));
        } else {
          resp.end(JSON.stringify({message: 'User Login Successful', token,foundUser}));
        }
      } else {
        resp.writeHead(401, {'Content-Type': 'application/json'});
        resp.end(JSON.stringify({message: 'Login unsuccessful - Invalid credentials'}));
      }
    } catch (err) {
      console.error(err);
      resp.writeHead(500, {'Content-Type': 'application/json'});
      resp.end(JSON.stringify({message: 'Internal Server Error'}));
    }
  }
};
