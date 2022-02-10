import axios from 'axios'

const fetcher = (url: any) => axios.get(url).then(res => res.data);

export default fetcher;