const JWT = require("jsonwebtoken");

const secret = "arthmate@pr1";

function createTokenForUser(user) {
   // console.log(r)
  const payload = {
    _id: user[0].user_id,
    name: user[0].name
  };
  const token = JWT.sign(payload, secret);

  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
