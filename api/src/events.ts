import type { NextApiRequest, NextApiResponse } from 'next';
import { queryEvents } from "./controllers/db/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const events = await queryEvents();

      console.log('🚨--🚨', events );

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
