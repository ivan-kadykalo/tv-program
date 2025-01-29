import {TVEvent} from "@/utils/typedefs";

export class EventsNormalizer {
  private static normalizeEvent(event: any): TVEvent {
    return {
      id: event.id,
      name: event.name,
      type: event.type,
      channel: event.channel,
      time: new Date(event.time),
    };
  }

  static normalizeEvents(events: any[]): TVEvent[] {
    return events.map(this.normalizeEvent);
  }
}
