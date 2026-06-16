import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/db.js';
import { env } from '../../config/env.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, active: u.active });
const signToken = (user) => jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  ok(res, { token: signToken(user), user: publicUser(user) }, 'Login successful');
});

export const me = asyncHandler(async (req, res) => ok(res, req.user));

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role = 'EMPLOYEE' } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { name, email, phone, role, passwordHash } });
  created(res, publicUser(user), 'User created');
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  ok(res, users.map(publicUser));
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = crypto.randomBytes(24).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const resetTokenExpires = new Date(Date.now() + env.passwordResetTokenMinutes * 60 * 1000);
    await prisma.user.update({ where: { id: user.id }, data: { resetTokenHash, resetTokenExpires } });
    return ok(res, { resetToken: token, expiresAt: resetTokenExpires }, 'Reset token generated. In production send this by SMS/email.');
  }
  ok(res, null, 'If the email exists, reset instructions will be sent.');
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await prisma.user.findFirst({ where: { resetTokenHash, resetTokenExpires: { gt: new Date() } } });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(password, 12), resetTokenHash: null, resetTokenExpires: null } });
  ok(res, null, 'Password reset successful');
});
