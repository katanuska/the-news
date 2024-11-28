import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './model/user';
import { UserDTO } from './model/UserDTO';
import { setndEmail } from '../common/emailSender';

// TODO: store users to database
const users = new Map<string, User>([
  [
    'test@gmail.com',
    {
      email: 'test@gmail.com',
      verified: true,
      firstName: 'Test User',
      lastName: 'Test User',
      password: '$2a$10$uVIY9XPZ.IGp.3aAEJQuvelAm8w9jvql1GkaS/EAU/nhE/nC4bBPW',
    },
  ],
]);

//TODO: implement refresh token
export const signup = async (user: User): Promise<UserDTO> => {
  if (users.get(user.email)) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  users.set(user.email, { ...user, password: hashedPassword, verified: false });
  sendVerificationMail(user.email, user.firstName);

  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const signin = async (
  email: string,
  password: string
): Promise<{ user: UserDTO; token: string }> => {
  const user = users.get(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.verified) {
    throw new Error('Unverified user');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return {
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token: generateToken(email),
  };
};

export const verifyUser = async (token: string): Promise<void> => {
  const user = validateToken(token);

  if (!user) {
    throw new Error('User not found.');
  }

  user.verified = true;
};

export const validateToken = (token: string): User | undefined => {
  if (process.env.JWT_SECRET === undefined)
    throw new Error('JWT secret is not set.');

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
    email: string;
  };
  const user = users.get(decoded.email);

  return user;
};

const generateToken = (email: string): string => {
  if (process.env.JWT_SECRET === undefined)
    throw new Error('JWT secret is not set.');

  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const sendVerificationMail = (email: string, firstName: string) => {
  const token = generateToken(email);

  const verificationUrl = `${process.env.APP_URL}/auth/verify?token=${token}`;
  const mailContent = `<p>Hello ${firstName},</p><p>Welcome to News Portal! Please verify your email address by following this <a href="${verificationUrl}">link</a>.</p>`;
  const mailSubject = 'Verify Your Email to Stay Updated with News Portal';

  setndEmail(email, mailSubject, mailContent);
};
