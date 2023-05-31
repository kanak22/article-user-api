const authService = require('../services/authService');

const home = async(req,res) => {
  res.send("Hello there")
}

const signup = async (req, res) => {
  console.log(req.body);

  try {
    const { name, age, email, password } = req.body;

    const newUser = await authService.signUp(name, age, email, password);

    return res.status(200).send({
      statusCode: 200,
      data: {
        data: newUser,
      },
      error: "NA",
      message: "NA",
    });
  } catch (error) {
    console.log(error);
    if (error.message === 'Email already exists') {
      return res.status(400).send({
        statusCode: 400,
        data: {
          data: {},
        },
        error: error.message,
        message: "Internal Server Error",
      });
    }
    return res.status(500).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: error.message,
      message: "Internal Server Error",
    });
  }
};


const login = async (req, res) => {
  try {
    console.log(req.user);
    const { email, password } = req.body;

    const token = await authService.login(email, password);
    res.cookie("accesstoken", token, {
      expires: new Date(Date.now() + 100000),
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({
      statusCode: 200,
      data: {
        data: token,
      },
      error: "NA",
      message: "NA",
    });
  } catch (error) {
    if (error.message == "User does not exist" || error.message == "Invalid password") {
      return res.status(400).send({
        statusCode: 400,
        data: {
          data: {},
        },
        error: error.message,
        message: "Bad request",
      });
    } else {
      return res.status(500).send({
        statusCode: 500,
        data: {
          data: {},
        },
        error: error.message,
        message: "Internal Server Error",
      });
    }
  }
};

module.exports = {
  signup,
  login,
};