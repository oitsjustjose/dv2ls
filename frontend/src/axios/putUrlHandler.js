import axios from 'axios';

export default (url) => axios.put('/api/url', { url }).then((resp) => resp.data);
