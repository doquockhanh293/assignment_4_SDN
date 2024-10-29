const AuthService = require("../services/Auth.service");

class AuthController {
  async register(req, res) {
    try {
      const { fullName, username, password } = req.body;
      if (!fullName || !username || !password) {
        return res.status(401).json({
          success: false,
          message: "fullName, username, password is required",
        });
      }
      const user = await AuthService.register(fullName, username, password);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      if (error.message === "Username already exists") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);

      res.json({
        success: true,
        message: "Login successful",
        token: result.token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  }
}

module.exports = new AuthController();
