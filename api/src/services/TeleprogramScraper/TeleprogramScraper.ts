import axios from 'axios';

const cheerio = require('cheerio');

import { ERRORS, ProgramType, Event } from "../../controllers/PageScraper/PageScraper.typedefs";
import { BASE_URL, PERIOD } from "./TeleprogramScraper.constants";
import { BasePageScraper } from "../../controllers/PageScraper/PageScraper";

export class TeleprogramScraper implements BasePageScraper{
  public async scrapeTvScheduleByDate(date: string): Promise<Event[]> {
    try {
      const scrapeLink = `${BASE_URL}${date}${PERIOD}`;

      const html = await this.fetchHtml(scrapeLink);
      return this.normalizeData(html, date);
    } catch (error) {
      console.error({
        message: ERRORS.SCRAPING_FAILED,
        error: error,
      });

      throw new Error(ERRORS.SCRAPING_FAILED)
    }
  }

  private normalizeData(html: string, date: string): Event[] {
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
              time: new Date(`${date}T${time}+02:00`),
            });
        });
    });

    return Array.from(scrapedDataMap.values());
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
