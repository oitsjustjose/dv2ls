import axios from 'axios';

export default async ({ paste, syntax, expiresAt }) => {
  const resp = await axios.put('/api/paste', {
    paste, syntax, expiresAt,
  });

  return resp.data;
};
