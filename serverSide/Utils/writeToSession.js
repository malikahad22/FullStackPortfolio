const fs = require("fs");
const path = require("path");
const data = require('../session.json');
module.exports = (token) => {
  try {
    const tokenIndex = data.findIndex((user) => {
      if(user.token == token){
        return user
      }
  
    });
    if (tokenIndex !== -1) {
      data.splice(tokenIndex, 1);
      fs.writeFileSync(path.join(__dirname, "../session.json"), JSON.stringify(data, null, 2));
    } else {
      console.log('Index Not Found');
    }
  } catch (err) {
    console.log(err);
  }
};
