import axios from 'axios';

export default (slug) => axios.get(`/api/${slug}`)
  .then((resp) => resp.data);
