const fs = require("fs");
const path = require("path");

function tokenExpiry(data, token) {
  const tokenIndex = data.findIndex((user) => {
    try {
      return user.token === token;
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  if (tokenIndex !== -1) {
    data.splice(tokenIndex, 1);
    fs.writeFileSync(path.join(__dirname, "../session.json"), JSON.stringify(data, null, 2));
  } else {
    console.log('Index Not Found');
  }

  return {
    statusCode: 401,
    message: "Token is Expired",
  };
}

module.exports = { tokenExpiry };