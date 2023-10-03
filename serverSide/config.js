var mysql = require('mysql');

  var con = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"@MalikAhad226",
    database:"portfolio",
    port:3307
  });
  
  con.connect((err)=>{
  if(err){
    console.log("Connection Failed" +err.message);
  }
  else {
    console.log("Connected !")
  }
  });


module.exports = {con};