import axios from 'axios';
import * as fs from 'fs';

const cheerio = require('cheerio');

import {ERRORS, ProgramType, ScrapedData} from "./TVScraper.typedefs";
import {BASE_URL, PERIOD, WRITE_FILE_DIRECTORY} from "./TVScraper.constants";


export class TVScraper {
  public async scrapeTvScheduleForToday(): Promise<void> {
    console.log('🚨🚨🚨', 'Scrapping data' );
    // const today = new Date().toISOString().split('T')[0];
    //
    // await this.scrapeTvScheduleByDate(today);
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
            const title = $(event).find('.tv-event__title').text();

            const type = this.determineType(title);
            const programName = this.cleanName(title);

            if (!type) return;

            scrapedDataMap.set(
              programName, {
              id: programName,
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

      fs.writeFileSync(WRITE_FILE_DIRECTORY, JSON.stringify(scrapedDataArray, null, 2));
    } catch (error) {
      console.error('🚨', 'Error scraping data:', error);
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
      .replace(/\s+/g, ' ');
  }

  private cleanName(name: string): string {
    return name
      // Remove program type prefixes
      .replace(/(?:^|\s)["']?(Х\/ф|М\/ф|М\/с|Т\/с)["']?\s*/g, '')
      // Remove quotes
      .replace(/['"]/g, '')
      // Remove 'Премєра' lower or upper case
      .replace(/Прем['єЄ]ра/gi, '')
      // Remove unbreakable spaces
      .replace(/\u00A0/g, ' ')
      // Remove multiple spaces
      .replace(/\s+/g, ' ')
      // Remove leading or trailing dots and commas
      .replace(/^[.,\s]+|[.,\s]+$/g, '')
      // Final trim
      .trim();
  }

  private determineType(name: string): ProgramType | null {
    if (name.includes('Х/ф')) return ProgramType.MOVIE;
    if (name.includes('М/ф')) return ProgramType.CARTOON;
    if (name.includes('М/с')) return ProgramType.CARTOON_SERIES;
    if (name.includes('Т/с')) return ProgramType.SERIES;
    return null;
  }
}
