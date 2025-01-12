import { RefreshToken } from '../models/refresh-token.model';

export const cleanTokensJob = async (now: Date | 'manual' | 'init') => {
  try {
    await RefreshToken.deleteMany({ expiresAt: { $lte: new Date() } });
  } catch (e) {
    console.error('cleanTokensJob', e);
  }
};
