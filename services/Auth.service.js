const jwt = require("jsonwebtoken");
const User = require("../model/user");

class AuthService {
  async register(fullName, username, password) {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      throw new Error("Username already exists");
    }
    const newuser = { fullName, username, password };
    const user = new User(newuser);
    await user.save();

    return {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
    };
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
      },
    };
  }
}

module.exports = new AuthService();
