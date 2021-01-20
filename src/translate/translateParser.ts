import { BaseComponent } from '../component';
import { IParser } from '../parser';
import { ITranslateComponent } from './translateComponent';

export class TranslateParser implements IParser {
  public parse(json: any): BaseComponent {
    let comp = new BaseComponent({});
    (comp as ITranslateComponent).translate = '';

    if (json instanceof Object) {
      comp = new BaseComponent(json);
      (comp as ITranslateComponent).translate = json.translate;
      if ('with' in json) {
        (comp as ITranslateComponent).with = json.with;
      }
    }
    return comp;
  }
}
