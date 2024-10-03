import { Pool } from 'pg';
import { Event } from "../tv-scrapper/TVScraper.typedefs";

const TABLE_NAME = 'events';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const queryDB = async (query: string) => {
  const client = await pool.connect();

  try {
    const res = await client.query(query);

    return res.rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const insertMultipleEventsToDB = async (events: Event[]) => {
  try {
    const values = events.map(({ name, type, channel, time}) => {
      return `('${name}', '${type}', '${time.toISOString()}', '${channel}')`;
    });


    const query = `
      INSERT INTO ${TABLE_NAME} (name, type, time, channel)
      VALUES ${values.join(', ')}
    `;

    await queryDB(query);

    console.log('✅', 'Rows inserted');
  } catch (error) {
    console.error('🚨', 'Error inserting rows:', error);
  }
}

export const queryEvents = async () => {
  const query = `
    SELECT DISTINCT ON (name) *
    FROM ${TABLE_NAME}
    WHERE time >= NOW() - INTERVAL '7 days'
    ORDER BY time DESC
`;

  return await queryDB(query);
}
