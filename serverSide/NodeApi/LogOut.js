const {con} = require('../config');
module.exports = (req, resp) => {

  const token = req.headers.authorization;

  try {

    let sql = `DELETE from sessionrecord where token = '${token}'`;
    con.query(sql, (err , result)=>{

      if(err){
        throw err
      }
      else 
      {
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({ message: 'successful Logout',result}));
      }
    });
  }
  catch (err) {
    resp.writeHead(500, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ error: 'Internal server error' }));
  }
}