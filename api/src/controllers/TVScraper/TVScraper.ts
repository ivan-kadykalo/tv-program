import axios from 'axios';
import * as fs from 'fs';
const cheerio = require('cheerio');

import {ERRORS, ProgramType, ScrapedData} from "./TVScraper.typedefs";
import { BASE_URL, PERIOD } from "./TVScraper.constants";

export class TVScraper {
  public async scrapeTvScheduleForToday(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    await this.scrapeTvScheduleByDate(today);
  }

  public async scrapeTvScheduleByDate(date: string): Promise<void> {
    try {
      const scrapeLink = `${BASE_URL}${date}${PERIOD}`;
      const html = await this.fetchHtml(scrapeLink);

      const $ = cheerio.load(html);

      const scrapedDataMap: Map<string, ScrapedData> = new Map();

      $('.tv-channel').each((index: number, element: cheerio.Element) => {
        const channelName = $(element)
          .find('.tv-channel__title a')
          .text()
          .trim();

        $(element)
          .find('.tv-channel-events__item')
          .each((i: number, event: cheerio.Element) => {
            const time = this.extractTime($(event));
            const programName = this.cleanName($(event).find('.tv-event__title').text());

            const type = this.determineType(programName);

            if (!type) return;

            const key = `${programName}-${time}`;

            scrapedDataMap.set(key, {
              id: key,
              name: programName,
              type: type,
              tvInfo: {
                channelName: channelName,
                time: time,
                date: date,
              }
            });
          });
      });

      const scrapedDataArray: ScrapedData[] = Array.from(scrapedDataMap.values());

      console.log('🚀', 'Page successfully scraped');

      fs.writeFileSync('./src/tv_schedule.json', JSON.stringify(scrapedDataArray, null, 2));
    } catch (error) {
      console.error('Error scraping data:', error);
    }
  }

  private async fetchHtml(url: string): Promise<string> {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error({
        message: ERRORS.FAILED_TO_FETCH_HTML,
        url: url,
        error: error,
      });

      throw new Error(ERRORS.FAILED_TO_FETCH_HTML);
    }
  }

  private extractTime(eventElement: cheerio.Cheerio): string {
    return eventElement
      .find('.tv-event__time')
      .text()
      .trim()
      .replace(/\s+/g, ' '); // Remove extra spaces
  }

  private cleanName(name: string): string {
    return name
      .replace(/\u00A0/g, ' ') // Replace &nbsp; with a regular space
      .replace(/"/g, '') // Remove double quotes
      .trim();
  }

  private determineType(name: string): ProgramType | null {
    if (name.startsWith('Т/с')) return ProgramType.SERIES;
    if (name.startsWith('Х/ф')) return ProgramType.MOVIE;
    if (name.startsWith('М/ф')) return ProgramType.CARTOON;
    if (name.startsWith('М/с')) return ProgramType.CARTOON_SERIES;
    return null;
  }
}
