import { NextApiRequest, NextApiResponse } from 'next';

import { sql } from '@vercel/postgres';
const TABLE_NAME = 'events';

const queryEvents = async () => {
  try {
    const res = await sql`SELECT * FROM ${TABLE_NAME}`;

    return res.rows;
  } catch (error) {
    console.error('Error querying events:', error);
    throw new Error('Database query failed');
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const events = await queryEvents(); // Call the query function
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
