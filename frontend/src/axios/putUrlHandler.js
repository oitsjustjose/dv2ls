import axios from 'axios';
import { routes } from '../App';

export default async (url, slug) => {
  const paths = routes.map(({ path }) => path.substr(1));
  if (slug && paths.includes(slug)) {
    return null;
  }

  const resp = await axios.put('/api/url', { url, slug });
  return resp.data;
};
