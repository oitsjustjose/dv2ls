import axios from 'axios';

export default (state) => {
  const { paste, syntax, expiresAt } = state;
  return axios.put('/api/paste', {
    paste, syntax, expiresAt,
  }).then((resp) => resp.data);
};
