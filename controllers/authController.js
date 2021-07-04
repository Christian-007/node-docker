const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  
  try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        username,
        password: hashedPassword
      });

      req.session.user = newUser;
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        }
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
      })
    }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "user not found"
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (isPasswordCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success"
      });

      return;
    }

    res.status(400).json({
      status: "fail",
      message: "incorrect username or password"
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    })
  }
}
