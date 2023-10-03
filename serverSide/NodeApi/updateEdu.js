const {con} = require('../config');
const { tokenExpiry } = require("../Utils/sessionExp");
const writeToSession = require('../Utils/writeToSession');
const bodyParser = require('../Utils/bodyParser');
module.exports = async (req, resp) => {

  let id = req.url.split('/')[2];
  let body = await bodyParser(req);
  body.id = id;
  const token = req.headers.authorization;
  let decode = tokenExpiry(token);
  try {

    if (!decode) {
      console.log("Token is Expire");
      writeToSession(token)
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify('Token is Expire'));
    }
    else {

    let sql = `UPDATE education 
                SET id = ${body.id}, userId = ${body.userId} , institute = '${body.institute}', complete = STR_TO_DATE('${body.complete}', '%Y-%m-%dT%H:%i:%s.000Z'), marks = '${body.marks}', degree = '${body.degree}' 
                WHERE id = ${body.id}`;
        con.query(sql,(err,result)=>{
          if(err){
            console.log(err);
            resp.writeHead(500,{"Content-Type":"application/json"});
            resp.end(JSON.stringify(({ title: "Internal Server Error", message: "Error adding user to the database" })));
          }
          else 
          {
            resp.writeHead(200, { "Content-Type": "application/json" });
            resp.end(JSON.stringify(result));
          }
        })
    }
  } catch (err) {
    resp.writeHead(500, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ error: 'Internal server error' }));
  }

}
