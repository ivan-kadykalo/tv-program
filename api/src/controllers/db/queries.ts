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

export const createTableInDb = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      time TIMESTAMP,
      channel VARCHAR(255),
      type VARCHAR(255)
    )
  `;

  try {
    await queryDB(query);
    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error);
    throw new Error("Failed to create table.");
  }
}

export const addEventsToDB = async (events: Event[]) => {
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
    SELECT * FROM (
      SELECT DISTINCT ON (name) *
      FROM ${TABLE_NAME}
      WHERE DATE_TRUNC('day', time) BETWEEN DATE_TRUNC('day', NOW()) - INTERVAL '10 days' 
        AND DATE_TRUNC('day', NOW())
      ORDER BY name, time DESC
    ) subquery
    ORDER BY time DESC;
  `;

  return await queryDB(query);
}

export const queryEventsByType = async (eventType: string) => {
  const query = `
    SELECT * FROM (
      SELECT DISTINCT ON (name) *
      FROM ${TABLE_NAME}
      WHERE type = '${eventType}'
        AND DATE_TRUNC('day', time) BETWEEN DATE_TRUNC('day', NOW()) - INTERVAL '10 days' 
        AND DATE_TRUNC('day', NOW())
      ORDER BY name, time DESC
    ) subquery
    ORDER BY time DESC;
  `;

  return await queryDB(query);
}


export const cleanOldRecordsFromDB = async () => {
  const query = `
    DELETE FROM ${TABLE_NAME}
    WHERE time < NOW() - INTERVAL '11 days'
  `;

  return await queryDB(query);
}

