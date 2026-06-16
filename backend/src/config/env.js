import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  passwordResetTokenMinutes: Number(process.env.PASSWORD_RESET_TOKEN_MINUTES || 30),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  businessName: process.env.BUSINESS_NAME || 'Shreerang Papad',
  businessLocation: process.env.BUSINESS_LOCATION || 'Mahagaon, Yavatmal, Maharashtra, India',
  gstRate: Number(process.env.GST_RATE || 5)
};
