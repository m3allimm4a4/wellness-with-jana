import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { IUser, User, UserRole } from '../models/user.model';
import { generateVerificationToken, hashPassword, isValidPassword } from '../shared/hashing-manager';
import { BadRequestError } from '../errors/bad-request.error';
import { getStaticTemplate } from '../shared/template-manager';
import { ContactInfo } from '../models/contact-info.model';
import { sendEmail } from '../shared/mail-sender';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { generateAuthToken } from '../shared/jwt-manager';
import { NotFoundError } from '../errors/not-found.error';

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
  const verificationUrl = `${process.env.FRONT_BASE_URL}/email-verification/${verificationHash}`;
  const html = await getStaticTemplate('email-verification', {
    name: user.name,
    verificationUrl,
    contactEmail: contactInfo?.email || '',
    contactInsta: contactInfo?.ig || '',
  });
  await sendEmail('Email verification', [user.email], html);
  res.status(200).send();
});

export const verifyEmail: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { hash } = req.body;
  const user = await User.findOne({ verificationHash: hash });
  if (!user) {
    throw new NotFoundError();
  }

  user.emailVerified = true;
  user.verificationHash = '';
  await user.save();

  res.status(200).send();
});

export const login: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, verified: true });
  if (!user) {
    throw new UnauthorizedError();
  }
  const validPassword = await isValidPassword(password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError();
  }
  const userObject = user.toObject();
  const token = generateAuthToken(userObject);
  res.status(200).json({
    accessToken: token,
    expiresIn: process.env.JWT_EXPIRY || '',
    user: {
      ...userObject,
      password: '',
    },
  });
});