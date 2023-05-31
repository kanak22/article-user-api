const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModal');

const signUp = async (name, age, email, password) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    savedUser.password=undefined;
    return savedUser;
};

const login = async (email, password) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        // console.log(error, 'ioio')
        throw new Error('User does not exist');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      const{_id, name} = user;
      const token = jwt.sign({ _id, name, email }, process.env.SECRET_KEY);
      console.log(token);
      return token;
  };
  

module.exports = {
  signUp,
  login,
};
