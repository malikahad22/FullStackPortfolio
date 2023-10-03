const { tokenExpiry } = require('../Utils/sessionExp');
const { con } = require('../config');
module.exports = (req, resp) => {
  let token = req.headers.authorization;
  let searchValue = req.url.split('/')[3];
  console.log(searchValue)


  try {
    let decode = tokenExpiry(token);
    if (!decode) {
      console.log("Token is Expire");
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "Token is invalid or expired" }));

      let sql = `DELETE FROM sessionrecord where token = '${token}'`;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Record deleted successfully" + result);
        }
      });


    }
    else {
      let filterUsers;
      let sql = "SELECT * from users";
      con.query(sql, (err, result) => {

        if (err) {
          console.error(err);
          resp.writeHead(500, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
        }
        else {
          if (searchValue == "") {
            filterUsers = result;
          }
          else {
            filterUsers = result.filter((p) => {
              if (p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                p.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                p.mobile.includes(searchValue)) {

                return p;

              }
            });
          }
          resp.writeHead(200, { 'Content-Type': 'application/json' });
          resp.write(JSON.stringify(filterUsers));
          resp.end();
        }
     });

    }
 
  }
  catch (err) {
    console.error(err);
    resp.writeHead(400, { "Content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Bad Request", message: "Request Body is not Valid!" }));
  }
}