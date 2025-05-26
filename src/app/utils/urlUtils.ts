// utils/urlUtils.ts
export const getUrlType = (url: string) => {
  if (!url) return 'text';
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  if (youtubeRegex.test(url)) return 'youtube';
  const urlRegex = /^https?:\/\/.+/;
  if (urlRegex.test(url)) return 'url';
  return 'text';
};

export const getYouTubeId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
