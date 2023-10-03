const { tokenExpiry } = require('../Utils/sessionExp');

const {con} = require('../config');

module.exports = (req,resp)=>{

  let peram = req.url.split('/')[3];

  console.log("first")
  let token = req.headers.authorization;
  let decodedToken = tokenExpiry(token);

  try{

    if(!decodedToken){

     
      console.log("Token is Expire");
       // Token is invalid or expired
      resp.writeHead(401, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "Token is invalid or expired" }));
      let sql = `DELETE FROM sessionrecord where token = '${token}'`;
      con.query(sql,(err,result)=>{
        if(err){
          console.log(err);
        }
        else 
        {
          console.log("Record deleted successfully"+result);
        }
      });
    }
    else 
    {
      
      let filterProjects;
      let sql = "SELECT * from projects";
      con.query(sql, (err, result) => {

        if (err) {
          console.error(err);
          resp.writeHead(500, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ title: "Internal Server Error", message: "Error adding user to the database" }));
        }
        else {
          if(peram == ""){
          filterProjects  = result;
            console.log(filterProjects)
          }
          else{
            filterProjects = result.filter((p) => {
              if ((p.title.toLowerCase().includes(peram.toLowerCase()) || p.frame.toLowerCase().includes(peram.toLowerCase()) || p.lang.toLowerCase().includes(peram.toLowerCase()))) {
                return p;
              }
            });

          }
        }
        console.log("Filters",filterProjects);

        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify(filterProjects));
        resp.end();
      });
    }   
  }
  catch (err) {
  
      console.error(err);
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ title: "Bad Request", message: "Request Body is not Valid!" }));

  }
}