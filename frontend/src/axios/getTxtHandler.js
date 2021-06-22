import axios from 'axios';

export default (slug) => axios.get(`/c/${slug}`).then((resp) => resp.data);
