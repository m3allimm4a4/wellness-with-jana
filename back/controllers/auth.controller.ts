import ms from 'ms';
import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { IUser, User, UserRole } from '../models/user.model';
import { generateVerificationToken, hashPassword, isValidPassword } from '../shared/hashing-manager';
import { BadRequestError } from '../errors/bad-request.error';
import { getStaticTemplate } from '../shared/template-manager';
import { ContactInfo } from '../models/contact-info.model';
import { sendEmail } from '../shared/mail-sender';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../shared/jwt-manager';
import { NotFoundError } from '../errors/not-found.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { RefreshToken } from '../models/refresh-token.model';

export const signUp: RequestHandler = catchAsync(async (req, res) => {
  const user: Partial<IUser> = req.body;
  if (!user.email || !user.password || !user.name || !user.lastname || !user.country || !user.phone) {
    throw new BadRequestError();
  }
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    if (existingUser.emailVerified) {
      throw new BadRequestError();
    }
    await User.findByIdAndDelete(existingUser._id);
  }

  const password = await hashPassword(user.password);
  const verificationHash = await generateVerificationToken();

  await User.create({
    name: user.name,
    lastname: user.lastname,
    country: user.country,
    phone: user.phone,
    email: user.email,
    password: password,
    verificationHash: verificationHash,
    roles: [UserRole.NORMAL],
  });

  const contactInfo = await ContactInfo.findOne();
  const verificationUrl = `${process.env.FRONT_BASE_URL}?email-verification=${verificationHash}`;
  const html = await getStaticTemplate('email-verification', {
    name: user.name,
    verificationUrl,
    contactEmail: contactInfo?.email || '',
    contactInsta: contactInfo?.ig || '',
  });
  await sendEmail('Email verification', [user.email], html);
  res.status(204).send();
});

export const verifyEmail: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { hash } = req.body;
  const user = await User.findOne({ verificationHash: hash });
  if (!user) {
    throw new NotFoundError();
  }

  user.emailVerified = true;
  user.verificationHash = undefined;
  await user.save();

  res.status(200).send();
});

export const login: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, emailVerified: true });
  if (!user?.password) {
    throw new UnauthorizedError();
  }
  const validPassword = await isValidPassword(password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError();
  }

  const userObject = user.toObject();
  const refreshToken = await generateRefreshToken(userObject.id, req.useragent);
  const accessToken = await generateAccessToken(userObject);

  res.cookie('refreshToken', refreshToken.token, {
    httpOnly: true,
    secure: process.env.PROD === 'true',
    sameSite: 'none', // todo add config to prevent CSRF
    maxAge: ms(process.env.JWT_REFRESH_EXPIRY || ''),
  });
  res.status(200).json({
    accessToken: accessToken,
    expiresAt: new Date(Date.now() + ms(process.env.JWT_EXPIRY || '')),
    user: userObject,
  });
});

export const refresh: RequestHandler = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ForbiddenError();
  }

  const userId = await verifyRefreshToken(refreshToken);
  if (!userId) {
    res.clearCookie('refreshToken', { httpOnly: true });
    throw new ForbiddenError();
  }
  const user = await User.findById(userId);
  if (!user) {
    res.clearCookie('refreshToken', { httpOnly: true });
    throw new ForbiddenError();
  }
  const userObject = user.toObject();
  const accessToken = await generateAccessToken(userObject);
  res.status(200).json({
    accessToken: accessToken,
    expiresAt: new Date(Date.now() + ms(process.env.JWT_EXPIRY || '')),
    user: userObject,
  });
});

export const logout: RequestHandler = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await RefreshToken.findOneAndDelete({ token: refreshToken });
  }

  res.clearCookie('refreshToken', { httpOnly: true });
  res.status(204).send();
});

export const forgotPassword: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email, emailVerified: true });
  if (user) {
    const verificationHash = await generateVerificationToken();
    user.verificationHash = verificationHash;
    await user.save();
    const contactInfo = await ContactInfo.findOne();
    const verificationUrl = `${process.env.FRONT_BASE_URL}?password-reset=${verificationHash}`;
    const html = await getStaticTemplate('password-reset', {
      name: user.name,
      verificationUrl,
      contactEmail: contactInfo?.email || '',
      contactInsta: contactInfo?.ig || '',
    });
    await sendEmail('Email verification', [user.email], html);
  }
  res.status(204).send();
});

export const passwordReset: RequestHandler = catchAsync(async (req, res) => {
  const { verificationHash, newPassword } = req.body;
  const user = await User.findOne({ verificationHash: verificationHash, emailVerified: true });
  if (!user) {
    throw new UnauthorizedError();
  }

  user.password = await hashPassword(newPassword);
  user.verificationHash = undefined;
  await user.save();
  await RefreshToken.deleteMany({ user: user.id });
  res.status(204).send();
});
