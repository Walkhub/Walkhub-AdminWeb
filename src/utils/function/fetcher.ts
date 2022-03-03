import instance from "../axios";

const fetcher = (url: string) => {
  return instance
    .get(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3anNkdWR3bnMiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjQ2Mjc0OTE1LCJleHAiOjE2NDYyODIxMTV9.bWVYcrOuxmJspGfprCgDbLpi9MJxhykXd0RqXTySSa4",
      },
    })
    .then(res => res.data)
    .catch(err => {
      return [];
    });
};

export default fetcher;
