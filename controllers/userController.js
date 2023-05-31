const userService = require('../services/userService');

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, age, ...rest } = req.body;

    if (Object.keys(rest).length > 0) {
      return res.send({
        statusCode: 400,
        data: {
          data: {},
        },
        error: "Only name and age fields are editable",
        message: "Bad request",
      })
    }

    const updatedUserData = {};
    if (name) {
      updatedUserData.name = name;
    }
    if (age) {
      updatedUserData.age = age;
    }

    const updatedUser = await userService.updateUserById(userId, updatedUserData);

    if (!updatedUser) {
      return res.send({
        statusCode: 404,
        data: {
          data: {},
        },
        error: "User not found",
        message: "Not found",
      })
    }

    return res.send({
      statusCode: 201,
      data: {
        data: updatedUser
      },
      error: "NA",
      message: "NA",
    })
  } catch (error) {
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

module.exports = {
  updateUser,
};
