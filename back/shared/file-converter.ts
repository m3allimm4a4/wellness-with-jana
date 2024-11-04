import sharp from 'sharp';

export const convertToWebp = (data: Buffer) => sharp(data).webp().toBuffer();
