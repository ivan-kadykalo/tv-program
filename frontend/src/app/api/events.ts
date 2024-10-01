import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString: "postgres://default:BSc1IVYWPMb9@ep-little-block-a2fbpc7j-pooler.eu-central-1.aws.neon.tech/verceldb?sslmode=require",
});

const queryEvents = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM your_table_name'); // Replace with your actual table name
    return res.rows;
  } catch (error) {
    console.error('Error querying events:', error);
    throw new Error('Database query failed');
  } finally {
    client.release();
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
