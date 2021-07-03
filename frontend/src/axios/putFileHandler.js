import axios from 'axios';

export default async (file) => {
  if (file.size > 16000000) {
    return { error: true, size: file.size };
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const resp = await axios.put('/api/file', formData);
    return resp.data;
  } catch (ex) {
    alert(ex);
    return null;
  }
};
