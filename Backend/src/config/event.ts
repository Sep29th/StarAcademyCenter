import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces/event-emitter-options.interface';

export class EventConfig implements EventEmitterModuleOptions {
  global?: boolean = true;
  delimiter?: string = '.';
  ignoreErrors?: boolean = false;
  maxListeners?: number = 10;
  newListener?: boolean = false;
  removeListener?: boolean = false;
  verboseMemoryLeak?: boolean = false;
  wildcard?: boolean = false;

  private static instance: EventConfig;

  static getInstance(): EventConfig {
    return this.instance ?? (this.instance = new EventConfig());
  }
}
