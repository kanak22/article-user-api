const jwt = require('jsonwebtoken');
const User = require('../models/userModal');

const authenticateJWT = async (req, res, next) => {
    const authToken = req.headers['authorization'] || req.cookies?.accesstoken;
    console.log(authToken)
    if (!authToken) {
      return res.send({
        statusCode: 401,
        data: {
          data: {},
        },
        error: "Unauthorised request",
        message: "No authorisation token is provided",
      });
    }
  
    const token = authToken.split(' ').pop();
  
    if (token) {
  
      try {
        jwt.verify(token, process.env.SECRET_KEY)
      } catch (error) {
        return res.send({
          statusCode: 401,
          data: {
            data: {},
          },
          error: "Invalid Token",
          message: "Unauthorised",
        });
      }
  
      let user = jwt.decode(token);
      user = await User.findById({ _id: user._id },{password:0})
      if (user) {
        user = user.toJSON();
        req.user = user;
        next();
      } else {
        return res.send({
          statusCode: 401,
          data: {
            data: {},
          },
          error: "Token and user are not matching",
          message: "Unauthorised",
        });
      }
    }
  };

  module.exports = {
    authenticateJWT
  };