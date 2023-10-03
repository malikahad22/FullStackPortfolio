const bodyParser = require('../Utils/bodyParser');
const { con } = require('../config');

module.exports = async (req, resp) => {
  try {
    let body = await bodyParser(req);

    if (!body.name || !body.email || !body.mobile || !body.address || !body.password) {
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "All fields (name, email, number, address, password) are required",
        })
      );
      return; // Stop processing the request
    }

    let id = Math.random();

    let SQL = 'SELECT * from users';
    con.query(SQL, (err, result) => {
      if (err) {
        console.error(err);
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error querying the database" }));
        return;
      }

      let exist = result.find((userExist) => body.email == userExist.email);

      if (exist) {
        console.log(exist);
        resp.writeHead(400, { "Content-Type": "application/json" });
        resp.end(
          JSON.stringify({
            title: "Validation Failed",
            message: "EMAIL ALREADY IN USE",
          })
        );
      } else {
        let sql = `INSERT INTO users (id, name, mobile, address, password, profileImage, title, about, skills,email,userStatus,linkedin,github,twitter)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;

        con.query(sql, [id, body.name, body.mobile, body.address, body.password, body.profileImage, body.title, body.about, body.skills, body.email,body.role , body.linkedin , body.github , body.twitter], async (err, result) => {
          if (err) {
            console.error(err);
            resp.writeHead(500, { "Content-Type": "application/json" });
            resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
          } else {
            resp.writeHead(201, { "Content-Type": "application/json" });
            resp.end(JSON.stringify({ message: "User Added Successfully" }));
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    resp.writeHead(400, { "Content-Type": "application/json" });
    resp.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not valid",
      })
    );
  }
}
