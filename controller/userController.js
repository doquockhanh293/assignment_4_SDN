const UserService = require("../services/userService");

class UserController {
  async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      if (!userId) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
      const user = await UserService.getUserProfile(userId);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const { fullName } = req.body;
      if (!userId || !fullName) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
      const user = await UserService.updateUserProfile(userId, { fullName });

      res.json({
        success: true,
        message: "User information updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new UserController();
