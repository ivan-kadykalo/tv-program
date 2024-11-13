import { Pool } from 'pg';
import { Event } from "../scrapper/Scraper.typedefs";
import { FETCH_LATEST, REMOVE_INTERVAL } from "./DB.constants";

const TABLE_NAME = 'events';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export class DB {
  private async query(query: string) {
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
  }

  public async createTable() {
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
      await this.query(query);
      console.log("Table created or already exists.");
    } catch (error) {
      console.error("Error creating table:", error);
      throw new Error("Failed to create table.");
    }
  }

  public async addEvents(events: Event[]) {
    try {
      const values = events.map(({ name, type, channel, time}) => {
        return `('${name}', '${type}', '${time.toISOString()}', '${channel}')`;
      });


      const query = `
        INSERT INTO ${TABLE_NAME} (name, type, time, channel)
        VALUES ${values.join(', ')}
      `;

      await this.query(query);

      console.log('✅', 'Rows inserted');
    } catch (error) {
      console.error('🚨', 'Error inserting rows:', error);
    }
  }

  public async queryEvents() {
    const query = `
      SELECT * FROM (
        SELECT DISTINCT ON (name) *
        FROM ${TABLE_NAME}
        WHERE DATE_TRUNC('day', time) BETWEEN DATE_TRUNC('day', NOW()) - INTERVAL '${FETCH_LATEST} days' 
          AND DATE_TRUNC('day', NOW())
        ORDER BY name, time DESC
      ) subquery
      ORDER BY time DESC;
    `;

    return await this.query(query);
  }

  public async cleanOldRecords()  {
    const query = `
      DELETE FROM ${TABLE_NAME}
      WHERE time < NOW() - INTERVAL '${REMOVE_INTERVAL} days'
    `;

    return await this.query(query);
  }
}
