import express = require("express");
import { UserController } from "../controller/userController";
import { verifyAccessToken } from "../services/auth";

const router = express.Router();
const userController = new UserController();

//auth token middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  const result = verifyAccessToken(token);
  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

// Define route to fetch user
router.post("/register", userController.createUser);
router.post("/login", userController.fetchUser);
router.get("/protected", authenticateToken, (req, res) => {
  try {
    res.json({ message: "Welcome to the protected route!", user: req.user });
  } catch (e) {
    console.log("error Data", e);
  }
});

export default router;
