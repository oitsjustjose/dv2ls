import axios from 'axios';
import { routes } from '../App';

export default (url, slug) => {
  const paths = routes.map(({ path }) => path.substr(1));

  if (slug && paths.includes(slug)) {
    return Promise.resolve(null);
  }

  return axios.put('/api/url', { url, slug }).then((resp) => resp.data);
};
