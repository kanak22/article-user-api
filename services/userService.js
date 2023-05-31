const User = require('../models/userModal');

const updateUserById = async (userId, updatedUserData) => {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (user) {
      user.password = undefined;
    }  
    return user;
};

module.exports = {
  updateUserById,
};
