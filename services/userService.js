const User = require("../model/user");

class UserService {
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
    };
  }

  async updateUserProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
    };
  }
}

module.exports = new UserService();
