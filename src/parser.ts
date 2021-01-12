import { BaseComponent } from './component';

export interface IParser {
  parse(json: any): BaseComponent;
}
