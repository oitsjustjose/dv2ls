import axios from 'axios';

export default (state) => {
  const { paste, syntax, expiresAt } = state;
  const path = '/a/paste';

  return axios.put(path, {
    paste, syntax, expiresAt,
  }).then((resp) => {
    const id = resp.data;
    window.history.pushState(null, `Text Upload ${id}`, `/api/paste/${id}`);
  });
};
