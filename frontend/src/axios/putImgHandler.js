import axios from 'axios';

export default (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.put('/api/img', formData).then((resp) => resp.data);
};
