import { BaseComponent } from './component';

export interface IParser {
  /**
   * Parses a json object to a BaseComponent or any custom component based on it.
   * @param json The json object to parse.
   */
  parse(json: any): BaseComponent;
}
