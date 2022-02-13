import instance from "@src/utils/axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.scope;
  const { data } = await instance.get(
    `/notices/list?scope=${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );

  res.json({ data });
};

export default handler;
