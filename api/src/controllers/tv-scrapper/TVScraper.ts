import axios from 'axios';

const cheerio = require('cheerio');

import { ERRORS, ProgramType, Event } from "./TVScraper.typedefs";
import { BASE_URL, PERIOD } from "./TVScraper.constants";
import { addEventsToDB } from "../db/queries";


export class TVScraper {
  public async processScrapping(date?: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    try {
      const events = await this.scrapeTvScheduleByDate(date || today);

      if (events?.length) {
        await addEventsToDB(events);
      }
    } catch (error) {
      console.error(ERRORS.SCRAPING_FAILED, error);
    }
  }

  public async scrapeTvScheduleByDate(date: string): Promise<Event[] | undefined> {
    try {
      const scrapeLink = `${BASE_URL}${date}${PERIOD}`;
      const html = await this.fetchHtml(scrapeLink);

      const $ = cheerio.load(html);

      const scrapedDataMap: Map<string, Event> = new Map();

      $('.tv-channel').each((_: number, element: cheerio.Element) => {
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
              name: programName,
              type: type,
              channel: channelName,
              time: new Date(`${date}T${time}+03:00`),
            });
          });
      });

      const scrapedDataArray: Event[] = Array.from(scrapedDataMap.values());

      console.log('🚀', 'Page successfully scraped');

      return scrapedDataArray;
    } catch (error) {
      console.error(ERRORS.SCRAPING_FAILED, error);
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
    return null;
  }
}
