import sharp from 'sharp';

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

export const convertToWebp = (data: Buffer) => sharp(data).webp().toBuffer();

export const generateFavicon = async (data: Buffer) => {
  const icons = await Promise.all(
    sizes.map(async size => {
      return {
        fileName: `favicon-${size}x${size}.png`,
        size: size,
        buffer: await sharp(data).resize(size, size).toBuffer(),
      };
    }),
  );

  return {
    manifest: {
      name: 'Wellness with Jana',
      short_name: 'WJ',
      description: 'Holistic health coaching website',
      icons: icons.map(icon => ({ src: icon.fileName, sizes: `${icon.size}x${icon.size}`, type: 'image/png' })),
      theme_color: '#32CD32',
      background_color: '#ffffff',
      display: 'standalone',
    },
    icons: icons,
  };
};
