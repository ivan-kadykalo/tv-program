import type { NextApiRequest, NextApiResponse } from 'next';
import {queryEvents, queryEventsByType} from "../controllers/db/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_FE_HOST || '');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'GET') {
    try {
      const events = req.query.type
      ? await queryEventsByType(req.query.type as string)
      : await queryEvents();

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
