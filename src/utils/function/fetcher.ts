import instance from "../axios";

const fetcher = (url: string) => {
  return instance
    .get(url)
    .then(res => res.data)
    .catch(err => {
      return [];
    });
};

export default fetcher;
