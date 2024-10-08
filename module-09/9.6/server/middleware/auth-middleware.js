// Middleware for authentication and authorization

import { isAuthenticated } from '../controllers/auth.js';

// Validate the user is logged in with a valid auth token
export function isLoggedIn(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(403).json({ error: 'login validation failed' });
  } else {
    console.log('login validation successful');
    next();
  }
}

// TODO: validate the logged in user has an admin role
export function isAdmin(req, res, next) {
  next();
}
