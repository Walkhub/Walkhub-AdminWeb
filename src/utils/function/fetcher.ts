import instance from "../axios";

const fetcher = (url: string) => {
  return instance
    .get(url)
    .then(res => res.data)
    .catch(err => err.response.status);
};

export default fetcher;
