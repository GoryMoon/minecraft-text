import { BaseComponent } from './component';

export interface IParser {
  /**
   * Parses a json object to a BaseComponent or any custom component based on it.
   * @param json The json object to parse.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse(json: any): BaseComponent;
}
