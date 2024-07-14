// Router for contact methods
import express from 'express';
const authRouter = express.Router();
import { login, logout } from '../controllers/auth.js';

// Log in with email and password
authRouter.post('/login', async (req, res) => {
  try {
    const data = await login(req, res); // this returns user and a JWT token
    res.status(200).json({ success: true, message: 'login successful', data });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Log out
authRouter.post('/logout', async (req, res) => {
  try {
    await logout(res);
    res
      .status(200)
      .json({ success: true, message: 'You have been logged out' });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default authRouter;
