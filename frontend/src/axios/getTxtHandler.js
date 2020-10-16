import axios from 'axios';

export default (slug) => axios.get(`/p/${slug}`).then((resp) => resp.data);
