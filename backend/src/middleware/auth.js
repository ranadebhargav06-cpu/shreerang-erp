import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/db.js';

export async function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.active) return res.status(401).json({ success: false, message: 'Invalid user' });
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Authentication required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Access denied' });
  next();
};
