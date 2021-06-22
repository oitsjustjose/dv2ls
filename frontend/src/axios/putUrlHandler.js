import axios from 'axios';

export default (url, slug) => axios.put('/api/url', { url, slug }).then((resp) => resp.data);
