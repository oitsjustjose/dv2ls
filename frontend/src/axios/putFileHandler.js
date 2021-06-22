import axios from 'axios';

export default (file) => {
  if (file.size > 16000000) {
    return { error: true, size: file.size };
  }

  const formData = new FormData();
  formData.append('file', file);
  return axios.put('/api/file', formData)
    .then((resp) => resp.data)
    .catch((ex) => alert(ex));
};
