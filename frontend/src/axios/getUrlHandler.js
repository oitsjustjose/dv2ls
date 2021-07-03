import axios from 'axios';

export default async (slug) => {
  try {
    const resp = await axios.get(`/api/${slug}`);
    return resp.data;
  } catch {
    return null;
  }
};
