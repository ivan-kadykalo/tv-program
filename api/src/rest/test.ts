import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const good = 'GOOD RESPONSE'

  res.status(200).json(good);
};

export default handler;
