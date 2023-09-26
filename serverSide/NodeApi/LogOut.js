const session = require('../session.json');
const fs = require('fs');
const path = require('path')
module.exports = (req, resp) => {

  const token = req.headers.authorization;
  try {

    let user = session.findIndex((i) => {
      console.log(i.token)
      return i.token === token;
    });

    if (user === -1) {
      resp.statusCode = 404;
      resp.write(
        JSON.stringify({ title: "Not Found", message: "not found" })
      );
    }
    else {
      session.splice(user, 1);

      fs.writeFileSync(
        path.join(__dirname, "../session.json"),
        JSON.stringify(session),
        "utf-8"
      );

      resp.writeHead(200, { 'Content-Type': 'application/json' });
      resp.end(JSON.stringify({ message: 'successful Logout' }));
    }

  }
  catch (err) {
    resp.writeHead(500, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ error: 'Internal server error' }));
  }
}