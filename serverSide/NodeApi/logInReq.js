const bodyParser = require("../Utils/bodyParser");
const jwt = require("jsonwebtoken");
const { con } = require("../config");

module.exports = async (req, resp) => {
  try {
    const user = await bodyParser(req);
    if (!user.email || !user.password) {
      resp.writeHead(400, { "Content-Type": "application/json" });
      resp.end(JSON.stringify({ message: "All fields must be filled" }));
      return;
    }

    // Initialize USERID and token
    let USERID;
    let token;
   

    // Perform the user query
    let sql = "SELECT * FROM users";
    con.query(sql, async (err, result) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      // Find the user
     let foundUser = result.find((us)=>{
        if(us.email == user.email && us.password == user.password){
          return us;
        }
      })
      if (foundUser) {
        USERID = foundUser.id;
        token = jwt.sign(
          {
            userId: foundUser.id,
            role: foundUser.userStatus,
          },
          "my-secret-id",
          { expiresIn: "50h" }
        );

        if (foundUser.userStatus == "admin") {
          resp.writeHead(200, { "Content-Type": "application/json" });
          resp.end(JSON.stringify({ message: "Admin", token, foundUser }));
        } 
        else if(foundUser.userStatus == 'user'){
          resp.writeHead(200, { "Content-Type": "application/json" });
          resp.end(
            JSON.stringify({
              message: "user",
              token,
              foundUser,
            })
          );
        }
        else 
        {
          console.log("User not found");
        }
      } else {
        resp.writeHead(401, { "Content-Type": "application/json" });
        resp.end(
          JSON.stringify({
            message: "Login unsuccessful - Invalid credentials",
          })
        );
      }

      // Once USERID and token have been set, insert into sessionrecord
      if (USERID && token) {
        try {
          let SQL = `INSERT INTO sessionrecord (userId, token) VALUES (${USERID}, '${token}')`;
          await new Promise((resolve, reject) => {
            con.query(SQL, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          console.log("Session record inserted:", USERID, token);
        } catch (error) {
          console.error("Error inserting session record:", error);
        }
      }
    });
  } catch (err) {
    console.error(err);
    resp.writeHead(500, { "Content-Type": "application/json" });
    resp.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};
