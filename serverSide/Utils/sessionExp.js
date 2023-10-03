const JWT_SECRET = "my-secret-id";
const jwt = require('jsonwebtoken');
function tokenExpiry(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null; // Token is invalid or expired
  }
}

module.exports = { tokenExpiry };