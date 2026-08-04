import notices from '../mocks/notices';

export const STORAGE_KEY = 'notices';

export const getNoticeList = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) return JSON.parse(data);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));

  return notices;
};
