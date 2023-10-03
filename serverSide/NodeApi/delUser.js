const { con } = require('../config');
module.exports = (req, resp) => {

  let id = req.url.split('/')[2];
 console.log(id)


  try {
    let sql = `
   DELETE FROM users WHERE id = ${id};
      `;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(({ title: "Internal Server Error", message: "Error adding user to the database" })));
      }
      else {
        console.log(result)
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end(JSON.stringify(result));
      }
    })
  }
  catch (err) {
    resp.writeHead(500, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ message: 'INTERNAL SERVER ERROR' }));
    resp.end();
  }

}
